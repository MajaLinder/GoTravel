var express = require('express');
var router = express.Router();
var Photo = require('../models/photo');
const Post = require('../models/post');

// Upload a photo
router.post('/api/posts/:id/photos', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        var photo = new Photo (req.body);
        photo.post = post._id;
        photo.save(function(err, _photo) {
            if (err) {
                return next(err); 
            }
            post.photo.push(_photo._id);
            post.save();
            res.status(201).json(photo);
        });
    });
});

// Retrieve a list of photos
router.get('/api/posts/:id/photos', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        Photo.find({post: req.params.id}, function(err, photos) {
            if (err) { return next(err); }
            res.json({"photos": photos});
        });
    });
});

// Retrieve a specific
router.get('/api/posts/:post_id/photos/:photo_id', function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        Photo.findById(req.params.photo_id, function(err, photo) {
            if (err) { return next(err); }
            if (photo == null) {
                return res.status(404).json(
                    {"message": "Photo not found"});
            }
            res.json(photo);
        });
    });
});

// Update photos
router.put('/api/photos/:id', function(req, res, next) {
    var id = req.params.id;
    Photo.findById(id, function(err, photo) {
        if (err) { return next(err); }
        if (photo == null) {
            return res.status(404).json(
                {"message": "Photo not found"});
        }
        photo.title = req.body.title
        photo.imageURL = req.body.imageURL
        photo.save();
        res.json(photo);
    });
});

// Update a specific photo attribute
router.patch('/api/photos/:id', function(req, res, next) {
    var id = req.params.id;
    Photo.findById(id, function(err, photo) {
        if (err) { return next(err); }
        if (photo == null) {
            return res.status(404).json(
                {"message": "Photo not found"});
        }
        photo.title = (req.body.title || photo.title);
        photo.imageURL = (req.body.imageURL || photo.imageURL);
        photo.save();
        res.json(photo);
    });
});

// Delete a specific photo
router.delete('/api/posts/:post_id/photos/:photo_id', function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        var id = req.params.photo_id;
        Photo.findOneAndDelete({_id:id}, function(err, photo) {
            if (err) { return next(err); }
            if (photo == null) {
                return res.status(404).json(
                    {"message":"Photo not found"});
            }
            res.json(photo);
        });
    });
});

// Delete all photos
router.delete('/api/photos', function(req, res, next) {
    Photo.deleteMany(function(err, photos) {
        res.status(200).json(photos);
        if (err) { return next(err); }
    });
});

module.exports = router;