import express from 'express'
import { WebhookController } from '../controllers/WebhookController.js'

export const router = express.Router()

const controller = new WebhookController()

// Map HTTP verbs and route paths to controller actions.
router.post('/',
  (req, res, next) => controller.verifyToken(req, res, next),
  (req, res, next) => controller.indexPost(req, res, next)
)
