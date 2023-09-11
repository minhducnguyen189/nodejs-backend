const express = require("express");
const router = express.Router();
const {getEmailTemplate,getTemplateById} = require('../middleware/hbs.service');

router.get('/', async (req, res) => {
    res.status(200).send(await getEmailTemplate());
});

router.get('/:id', async (req, res) => {
    const templateId = req.params.id;
    res.status(200).send(await getTemplateById(templateId));
});


module.exports = router;