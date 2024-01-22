const express = require('express');

const router = express.Router();
const tutorial = require('../controllers/tutorial.controller');
const student = require('../controllers/student.controller');

router.route('/')
.get(tutorial.findAll)
.post(tutorial.create)
.delete(tutorial.deleteAll);

router.route('/published')
.get(tutorial.findAllPublished)

router.route('/single/:id')
.get(tutorial.findOne)
.put(tutorial.update)
.delete(tutorial.delete)

router.route('/students')
.get(student.findAll)



module.exports = router;