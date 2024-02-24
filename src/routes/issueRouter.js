import express from 'express'
import { IssuesController } from '../controllers/IssuesController.js'

export const router = express.Router()

const controller = new IssuesController()

router.get('/', (req, res, next) => controller.fetchissues(req, res, next))
