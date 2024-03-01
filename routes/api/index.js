const router = require('express').Router();
const ThoughtRoutes = require('./thought-routes');
const UserRoutes = require('./user-routes');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', UserRoutes);

module.exports = router;