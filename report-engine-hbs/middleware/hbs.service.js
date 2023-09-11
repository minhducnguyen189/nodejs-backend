
const hbs = require('hbs');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const puppeteer = require('puppeteer');
const TEMPLATE_ENUM = require('../shared/template.enum');

async function getEmailTemplate() {
    const fileContent = await readFile(TEMPLATE_ENUM.get('email'), 'utf-8');
    const template = hbs.compile(fileContent);
    return template({});
}

async function getTemplateById(templateId) {
    const templatePath = TEMPLATE_ENUM.get(templateId);
    if (templatePath) {
        const fileContent = await readFile(templatePath, 'utf-8');
        const template = hbs.compile(fileContent);
        return template({});
    }
    return `No template with id: ${templateId}`;
}

async function bindingTemplate(templateId, data) {
    const templatePath = TEMPLATE_ENUM.get(templateId);
    if (templatePath && data) {
        const fileContent = await readFile(templatePath, 'utf-8');
        const template = hbs.compile(fileContent);
        return template(data);
    }
    return `Invalid templateId and data`;
}

async function generatePdf(templateId, data) {
    const html = await bindingTemplate(templateId, data);
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