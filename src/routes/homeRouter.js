/**
 * @file Defines the home router.
 * @module routes/homeRouter
 * @author Mats Loock
 * @version 3.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/HomeController.js'
import { IssuesController } from '../controllers/IssuesController.js'

export const router = express.Router()

const controller = new IssuesController()

router.get('/', (req, res, next) => controller.fetchissues(req, res, next))
