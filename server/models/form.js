const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    creator: {type:Object},
    form : {type: Object}
});

module.exports = mongoose.model('forms', FormSchema, 'forms');
