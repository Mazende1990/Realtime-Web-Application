import { WebSocketServer } from 'ws'
import { logger } from './winston.js'

export const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (webSocketConnection, connectionRequest) => {
  logger.silly('ws: a user connected')
  webSocketConnection.addEventListener('close', () => logger.silly('ws: a user disconnected'))
  webSocketConnection.addEventListener('error', (error) => logger.error('WebSocket error', { error }))
  webSocketConnection.addEventListener('message', (message) => logger.silly(`ws: ${message}`))
})
