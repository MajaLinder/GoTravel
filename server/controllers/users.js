
var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Create user
router.post('/api/users', function(req, res, next) {
    var user = new User (req.body);
    user.save(function(err, user) {
        if (err) {
            return next(err);
        }
        res.status(201).json(user);
    });
});

// Retrieve list of users
router.get('/api/users', function(req, res, next) {
    const filter = req.query;
    User.find(filter, function(err, users) {
        if (err) { return next(err); }
        res.json({"users": users});
    });
});

// Retrieve one specific user
router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(req.params.id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        res.json(user);
    });
});

router.put('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        user.username = req.body.username
        user.point = req.body.point
        user.save();
        res.json(user);
    });
});

router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message": "User not found"});
        }
        user.point = req.body.point
        user.save();
        res.json(user);
    });
});

// Delete one specific user
router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id:id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json(
                {"message":"User not found"});
        }
        res.json(user);
    });
});

module.exports = router;