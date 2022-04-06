const express = require('express');
const app = express();
const studentRoute = express.Router();
let studentModel = require('../models/Student');


studentRoute.route('/').get((req, res) => {
    studentModel.find((error, student) => {
    if (error) {
      return next(error)
    } else {
      res.json(student)
      console.log('student retrieved!')
    }
  })
})


studentRoute.route('/create-student').post((req, res, next) => {
    studentModel.create(req.body, (err, student) => {
    if (err) {
      return next(err)
    } else {
      res.json(student)
      console.log('Student created!')
    }
  })
});


studentRoute.route('/fetch-student/:id').get((req, res) => {
    studentModel.findById(req.params.id, (err, student) => {
    if (err) {
      return next(err)
    } else {
      res.json(student)
      console.log('Student retrieved!')
    }
  })
})


studentRoute.route('/update-student/:id').put((req, res, next) => {
    studentModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, student) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(student)
      console.log('Student updated!')
    }
  })
})

studentRoute.route('/delete-student/:id').delete((req, res, next) => {
    studentModel.findByIdAndRemove(req.params.id, (error, student) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: student
      })
      console.log('Student deleted!')
    }
  })
})

module.exports = studentRoute;