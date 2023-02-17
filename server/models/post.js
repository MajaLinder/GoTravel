
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    city: { type: String },
    country: { type: String },
    title: { type: String },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    link: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    photo: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Post', postSchema);