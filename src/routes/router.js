import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as issuesRouter } from './issueRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/issues', issuesRouter)

/*
// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
*/
