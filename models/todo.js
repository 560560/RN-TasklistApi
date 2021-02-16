const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  profileId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('todo', TodoSchema);