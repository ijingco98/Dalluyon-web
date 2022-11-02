const express = require('express');
const {
    getStudents,
    getStudent,
    addStudent,
    deleteStudent,
    updateStudentDetails

} = require('../controllers/StudentController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

///get all students
router.get('/', getStudents)

///get a specific students
router.get('/:id', getStudent)

///add a new student
router.post('/', addStudent)

///delete a student
router.delete('/:id', deleteStudent)

///update student
router.patch('/:id', updateStudentDetails)

module.exports = router