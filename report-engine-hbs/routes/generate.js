const express = require('express');
const router = express.Router();
const {generatePdf} = require('../middleware/hbs.service');

router.post('/:id', async (req, res) => {
    const templateId = req.params.id;
    const data = req.body;
    const pdf = await generatePdf(templateId, data);
    res.contentType("application/pdf");
    res.status(200).send(pdf);
});

module.exports = router;

