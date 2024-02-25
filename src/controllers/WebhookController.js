import WebSocket, { WebSocketServer } from 'ws'
import { logger } from '../config/winston.js'

/**
 *
 */
export class WebhookController {
  /**
   * Receives a webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async indexPost (req, res) {
    try {
      // Acknowledge the webhook by responding quickly!
      res.status(200).send('Webhook received')

      const payload = req.body

      logger.silly('webhook (recived)', { payload })

      // Only process the webhook if the event type is 'issue'; ignore other event types.
      if (payload.event_type !== 'issue') {
        logger.silly('webhook (invalid event)', { event_type: payload.event_type })
        return
      }

      // Take care of the received payload.
      this.#processPayload(req.body, res.wss)
    } catch (error) {
      // Log the error but nothing more (a response has already been sent)!
      logger.error(error.message, { error })
    }
  }

  /**
   * Verifies the webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  verifyToken (req, res, next) {
    // Use the GitLab secret token to validate the received payload.
    if (req.headers['x-gitlab-token'] !== process.env.WEBHOOK_SECRET) {
      logger.info('webhook (invalid token)', {
        'x-gitlab-token': req.headers['x-gitlab-token']
      })
      res.status(401).send('Invalid token')
      return
    }

    next()
  }

  /**
   * Processes the received webhook payload.
   *
   * @param {object} req - The received payload.
   * @param {WebSocketServer} wss - The WebSocket server.
   */
  async #processPayload (req, wss) {
    if (req.event_type === 'issue') {
      const issue = {
        iid: req.object_attributes.iid,
        title: req.object_attributes.title,
        description: req.object_attributes.description,
        avatar: req.user.avatar_url,
        state: req.object_attributes.state
      }
      let messageType
      if (req.object_attributes.action === 'reopen' || req.object_attributes.action === 'close') {
        messageType = 'issues/update-state'
      } else if (req.object_attributes.action === 'open') {
        messageType = 'issues/create'
      }

      const data = JSON.stringify({
        type: messageType,
        data: issue
      })

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data)
        }
      })
    }
  }
}
