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
  if (type === 'issues/update-state') {
    updateOpenCloseState(data)
  } else if ((type === 'issues/create')) {
    issueCreated(data)
  } else if ((type === 'issues/update')) {
    updateIssue(data)
  }
})

/**
 * Docs.
 *
 * @param {object} issue - The received payload
 */
function updateOpenCloseState (issue) {
  const issueRow = document.querySelector(`tr[data-id="${issue.iid}"]`)
  const button = issueRow.querySelector('#submit-button')
  button.classList.remove('button-close', 'button-open')
  if (issue.state === 'closed') {
    button.classList.add('button-open')
    button.textContent = 'Open'
  } else if (issue.state === 'opened') {
    button.classList.add('button-close')
    button.textContent = 'Close'
  }
}

/**
 * Docs.
 *
 * @param {object} issue - The received payload
 */
function issueCreated (issue) {
  const issueList = document.querySelector('#issue-list')
  const issueNode = issueTamplate.content.cloneNode(true)
  const avatar = issueNode.querySelector('.issue-avatar')
  const title = issueNode.querySelector('.issue-title')
  const state = issueNode.querySelector('.issue-state')
  const description = issueNode.querySelector('.issue-description pre')
  const issueRow = issueNode.querySelector('.issue-form')
  const button = issueRow.querySelector('#submit-button')

  avatar.src = issue.avatar
  title.textContent = issue.title
  state.textContent = issue.state
  description.textContent = issue.description || 'No description provided.'

  if (issue.state === 'closed') {
    button.textContent = 'Open'
    button.form.action = `/issues/${issue.iid}/open`
  } else if (issue.state === 'opened') {
    button.textContent = 'Close'
    button.form.action = `/issues/${issue.iid}/close`
  }

  issueList.appendChild(issueNode)
}

/**
 * Docs.
 *
 * @param {object} issue - The received payload
 */
function updateIssue (issue) {
  const issueRow = document.querySelector(`tr[data-id="${issue.iid}"]`)

  if (issue.title !== undefined) {
    const titleElement = issueRow.querySelector('.issue-title')
    if (titleElement) {
      titleElement.textContent = issue.title
    }
  }

  if (issue.description !== undefined) {
    const descriptionElement = issueRow.querySelector('.issue-description pre')
    if (descriptionElement) {
      descriptionElement.textContent = issue.description || 'No description provided.'
    }
  }
}
