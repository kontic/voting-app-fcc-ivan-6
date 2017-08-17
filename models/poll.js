const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    user_name: String,
    poll_name: String,
    options: [{
      option_name: String,
      option_value: { type: Number, default: 0 }
    }],
    link_code: String
});



const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;