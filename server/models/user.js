
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    point: { type: Number },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = mongoose.model('User', userSchema);