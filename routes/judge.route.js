const express = require('express')
const judgeRoute = express.Router()

// model
let JudgeModel = require('../models/Judge')

judgeRoute.route('/create-judge').post((req, res, next) => {
  JudgeModel.create(req.body, (error, data) => {
    if (error) {
      console.log('data received is', data)
      console.log('there is an error at create-judge')
      console.log('there is an error at create-judge')
      return next(error)
    } else {
      res.json(data)
    }
  })
})

judgeRoute.route('/get-judges').get((req, res, next) => {
  JudgeModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

judgeRoute.route('/edit-judge/:id').get((req, res, next) => {
  JudgeModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('wahome')
    }
  })
})

// Update
judgeRoute.route('/update-judge/:id').put((req, res, next) => {
  JudgeModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('judge successfully updated!')
      }
    },
  )
})

// Delete
judgeRoute.route('/delete-judge/:id').delete((req, res, next) => {
  JudgeModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = judgeRoute
