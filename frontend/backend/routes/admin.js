const express = require('express');
const {
    getStudents,

} = require('../controllers/StudentController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

///get all students
router.get('/', getStudents)

module.exports = router