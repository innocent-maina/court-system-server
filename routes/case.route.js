const express = require('express')
const caseRoute = express.Router()

// model
let CaseModel = require('../models/Case')

caseRoute.route('/create-case').post((req, res, next) => {
  CaseModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

caseRoute.route('/get-cases').get((req, res, next) => {
  CaseModel.find((error, data) => {
    if (error) {
      console.log('random')
      return next(error)
    } else {
      res.json(data)
    }
  })
})

caseRoute.route('/edit-case/:id').get((req, res, next) => {
  CaseModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update
caseRoute.route('/update-case/:id').put((req, res, next) => {
  CaseModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Case successfully updated!')
      }
    },
  )
})

// Delete
caseRoute.route('/delete-case/:id').delete((req, res, next) => {
  CaseModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = caseRoute
