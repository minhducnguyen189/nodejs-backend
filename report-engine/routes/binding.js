const express = require('express');
const router = express.Router();
const {bindingTemplate} = require('../middleware/pug.service');

router.post('/:id', (req, res) => {
    const templateId = req.params.id;
    const data = req.body;
    const htmlTemplate = bindingTemplate(templateId, data);
    res.status(200).send(htmlTemplate);
});

module.exports = router;