var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    title: { type: String },
    imageURL: { type: String },
    post: {type: Schema.Types.ObjectId,  required: true, ref: 'Post'}
});

module.exports = mongoose.model('Photo', photoSchema);