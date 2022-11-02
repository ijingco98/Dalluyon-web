const { request, response } = require('express');
const Student = require('../models/students');
const mongoose = require('mongoose');
const students = require('../models/students');

///get all students
const getStudents = async (request, response) => {
    const user_id = request.user._id
    const students = await Student.find({user_id}).sort({createdAt: -1})

    response.status(200).json(students)
}

///get a specific students
const getStudent = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({error: 'Student does not exist'})
    }
    const student = await Student.findById(id)

    if(!student) {
        return response.status(404).json({error: 'No Such Student'})
    }
response.status(200).json(student)
}


///add a new student
const addStudent = async (request, response) => {
    const {name, number, surfLevel, payment, duration, instructor, image} = request.body;
    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!number){
        emptyFields.push('number')
    }
    if(!surfLevel){
        emptyFields.push('surfLevel')
    }
    if(!payment){
        emptyFields.push('payment')
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!instructor){
        emptyFields.push('instructor')
    }
    if(emptyFields.length > 0){
        return response.status(400).json({error: 'Please fill in the needed fields!', emptyFields})
    }



    try {
        const user_id = request.user._id
        const student = await Student.create({name, number, surfLevel, payment, duration, instructor, image, user_id})
        response.status(200).json(student)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}


///delete a student

const deleteStudent = async (request, response) => {
  const {id} = request.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return response.status(404).json({error: 'Student does not exist'})
}
const student = await Student.findOneAndDelete({_id: id})

if(!student) {
    return response.status(404).json({error: 'No Such Student'})
}
response.status(200).json(student);
}

///update student
const updateStudentDetails = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
      return response.status(404).json({error: 'Student does not exist'})
  }
  const student = await Student.findOneAndUpdate({_id: id}, {
    ...request.body
  })
 
 if(!student) {
    return response.status(404).json({error: 'No Such Student'})
}
response.status(200).json(student)
}

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    deleteStudent,
    updateStudentDetails
}