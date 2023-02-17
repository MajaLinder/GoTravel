
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
    url: { type: String },
    title: { type: String },
    category: { type: String },
    post: {type: Schema.Types.ObjectId,  required: true, ref: 'Post'}
});

module.exports = mongoose.model('Link', linkSchema);