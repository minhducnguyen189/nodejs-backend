const express = require("express");
const router = express.Router();
const {getEmailTemplate,getTemplateById} = require('../middleware/pug.service');

router.get('/', (req, res) => {
    res.status(200).send(getEmailTemplate());
});

router.get('/:id', (req, res) => {
    const templateId = req.params.id;
    res.status(200).send(getTemplateById(templateId));
});


module.exports = router;