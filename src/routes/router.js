import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as issuesRouter } from './issueRouter.js'
import { router as webhooksRouter } from './webhooksRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/issues', issuesRouter)

router.use('/webhooks', webhooksRouter)
