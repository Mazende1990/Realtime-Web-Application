import express from 'express'
import { IssuesController } from '../controllers/IssuesController.js'

export const router = express.Router()

const controller = new IssuesController()

router.get('/', (req, res, next) => controller.fetchissues(req, res, next))

router.post('/:id/close', (req, res, next) => controller.closeIssue(req, res, next))

router.post('/:id/open', (req, res, next) => controller.openIssue(req, res, next))
