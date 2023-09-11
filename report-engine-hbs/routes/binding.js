const express = require('express');
const router = express.Router();
const {bindingTemplate} = require('../middleware/hbs.service');

router.post('/:id', async (req, res) => {
    const templateId = req.params.id;
    const data = req.body;
    const htmlTemplate = await bindingTemplate(templateId, data);
    res.status(200).send(htmlTemplate);
});

module.exports = router;