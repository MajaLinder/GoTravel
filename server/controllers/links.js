var express = require('express');
var router = express.Router();
var Link = require('../models/link');
const Post = require('../models/post');

// Upload Link
router.post('/api/posts/:id/links', function(req, res, next) {
    // 1. check if post exists with given id by using Post.findById(id)
    // 2. If yes,
    //  create a new Link, and its post filed should have the value of post it from request(which is ':id')
    //  if not, return 404, post not found with given id
    // Same for the Photo entity
    Post.findById(req.params.id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        var link = new Link (req.body);
        link.post = post._id;
        link.save(function(err, _link) {
            if (err) {
                return next(err);
            }
            post.link.push(_link._id);
            post.save();
            res.status(201).json(link);
        });
    });
});

// Retrieve list of links 
router.get('/api/posts/:id/links', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        Link.find({post: req.params.id}, function(err, links) {
            if (err) { return next(err); }
            res.json({"links": links});
        });
    });
});

// Retrieve one specific url
router.get('/api/posts/:post_id/links/:link_id', function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        Link.findById(req.params.link_id, function(err, link) {
            if (err) { return next(err); }
            if (link == null) {
                return res.status(404).json(
                    {"message": "Link not found"});
            }
            res.json(link);
        });
    });
});

// Update links
router.put('/api/links/:id', function(req, res, next) {
    var id = req.params.id;
    Link.findById(id, function(err, link) {
        if (err) { return next(err); }
        if (link == null) {
            return res.status(404).json(
                {"message": "Link not found"});
        }
        link.title = req.body.title
        link.url = req.body.url
        link.category = req.body.category
        link.save();
        res.json(link);
    });
});

// Update a specific link attribute
router.patch('/api/links/:id', function(req, res, next) {
    var id = req.params.id;
    Link.findById(id, function(err, link) {
        if (err) { return next(err); }
        if (link == null) {
            return res.status(404).json(
                {"message": "Link not found"});
        }
        link.title = (req.body.title || link.title);
        link.url = (req.body.url || link.url);
        link.category = (req.body.category || link.category);
        link.save();
        res.json(link);
    });
});

// Delete all links
router.delete('/api/links', function(req, res, next) {
    Link.deleteMany(function(err, links) {
        res.status(200).json(links);
        if (err) { return next(err); }
    });
});

// Delete one specific link
router.delete('/api/posts/:post_id/links/:link_id', function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(post == null) {
            return res.status(404).json(
                {"message": "Post not found"});
        }
        var id = req.params.link_id;
        Link.findOneAndDelete({_id:id}, function(err, link) {
            if (err) { return next(err); }
            if (link == null) {
                return res.status(404).json(
                    {"message":"Link not found"});
            }
            res.json(link);
        });
    });
});

module.exports = router;