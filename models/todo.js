const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model("Todo", TodoSchema)