var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');

// Create post
router.post('/api/posts', function(req, res, next) {
    var post = new Post (req.body);
    console.log(post)
    post.save(function(err, post) {
        if (err) { return next(err);}
        res.status(201).json(post);
    });
});

// Retrieve list of posts
router.get('/api/posts', function(req, res, next) {
    const filter = req.query;
    Post.find(filter, function(err, posts) {
        if (err) { return next(err); }
        if (posts == null) {
            return res.status(404).json(
                {"message": "Posts not found"});
        }
        res.json({"posts": posts});
    }).populate("photo");
});

// Retrieve one specific post
router.get('/api/posts/:id', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        res.json(post);
    }).populate('author').
	    exec(function (err, post) {
            if(err) return res.status(404).json(err);
            console.log(`Author of this post is ${post.author._id}`);
        });
});

// Retrieve list of posts of a user
router.get('/api/users/:id/posts', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if(user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        Post.find({author: req.params.id}, function(err, posts) {
            if (err) { return next(err); }
            res.json({"posts": posts});
        }).populate("photo");
    });
});

// Update post
router.put('/api/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        post.country = req.body.country
        post.city = req.body.city
        post.title = req.body.title
        post.published = req.body.published
        post.save();
        res.json(post);
    });
});

// Partially update post
router.patch('/api/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) { return next(err); }
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        post.country = (req.body.country || post.country);
        post.city = (req.body.city || post.city);
        post.title = (req.body.title || post.title);
        post.published = (req.body.published || post.published);
        post.save();
        res.json(post);
    });
});

// Delete one specific post
router.delete('/api/posts/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id:id}, function(err, post) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json(
                {"message":"Post not found"});
        }
        res.json(post);
    });
});

// Delete all posts
router.delete('/api/posts', function(req, res, next) {
    Post.deleteMany(function(err, posts) {
        res.status(200).json(posts);
        if (err) { return next(err); }
    });
});

// Delete all posts for one specific user
router.delete('/api/users/:id/posts', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if(user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        Post.deleteMany({author: req.params.id}, function(err, posts) {
            res.status(200).json(posts);
            if (err) { return next(err); }
        });
    });
});

module.exports = router;