'use strict';

const mongoose = require("mongoose");

// Definition of new schema
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [150, "Field should be max. 150 characters."]
    },
    content: {
        type: String,
        maxLength: [10000, "Field should be max. 3000 characters."]
    },
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;