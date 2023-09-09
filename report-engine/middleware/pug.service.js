
const pug = require('pug');
const puppeteer = require('puppeteer');
const TEMPLATE_ENUM = require('.././shared/template.enum');

function getEmailTemplate() {
    const emailHtml = pug.renderFile(TEMPLATE_ENUM.get('email'));
    return emailHtml;
}

function getTemplateById(templateId) {
    const template = TEMPLATE_ENUM.get(templateId);
    if (template) {
        const emailHtml = pug.renderFile(template);
        return emailHtml;
    }
    return `No template with id: ${templateId}`;
}

function bindingTemplate(templateId, data) {
    const template = TEMPLATE_ENUM.get(templateId);
    if (template && data) {
        const emailHtml = pug.renderFile(template, data);
        return emailHtml;
    }
    return `Invalid templateId and data`;
}

function generatePdf(templateId, data) {
    const html = bindingTemplate(templateId, data);
    return exportWebsiteAsPdf(html);
}

async function exportWebsiteAsPdf(html) {
    // Create a browser instance
    const browser = await puppeteer.launch({
      headless: 'new'
    });

    // Create a new page
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Download the PDF
    const PDF = await page.pdf({
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });

    // Close the browser instance
    await browser.close();

    return PDF;
}

module.exports = {getEmailTemplate, getTemplateById, bindingTemplate, generatePdf};