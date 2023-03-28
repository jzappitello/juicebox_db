const express = require('express');
const tagsRouter = express.Router();

const { getAllTags } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;
    try {
        const allTags = await getAllTags(tagName);
        const tags = allTags.filter(tag => {
            return tag.name === tagName;
        });
        res.send({ tags });
    } catch ({ name, message }) {
        next({ name, message });
    }
});
