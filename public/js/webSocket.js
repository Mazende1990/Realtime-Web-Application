const issueTamplate = document.querySelector('#issue-template')

console.assert(issueTamplate, 'Could not find "#task-template" template element.')

const HOST = location.origin.replace(/^http/, 'ws')
const socket = new WebSocket(HOST)

socket.addEventListener('close', (event) => {
  console.info('close', event)
})

// Connection error.
socket.addEventListener('error', (event) => {
  console.error('error', event)
})

socket.addEventListener('message', (event) => {
  console.log('socket message', event.data)
  const { type, data } = JSON.parse(event.data)
  if (type === 'issues/update') {
    updateState(data)
  }
})

/**
 * Docs.
 *
 * @param {object} issue - The received payload
 */
function updateState (issue) {
  const issueRow = document.querySelector(`tr[data-id="${issue.iid}"]`)
  const button = issueRow.querySelector('.submit-button')

  if (issue.state === 'closed') {
    button.textContent = 'Open'
  } else if (issue.state === 'opened') {
    button.textContent = 'Close'
  }
}
