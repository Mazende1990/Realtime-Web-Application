/**
 *
 */
export class IssuesController {
  // eslint-disable-next-line jsdoc/require-description
  /**
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async fetchissues (req, res) {
    try {
      const gitLabURL = 'https://gitlab.lnu.se/api/v4/projects/40129/issues'
      const response = await fetch(gitLabURL, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + process.env.ACCESS_TOKENS
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch issues from GitLab')
      }

      const data = await response.json()
      const issueObject = data.map(issue => ({
        id: issue.iid,
        title: issue.title,
        description: issue.description,
        state: issue.state,
        avatar: issue.author.avatar_url
      }))
      console.log(issueObject)
      res.render('issues/index', { issues: issueObject })
    } catch (error) {

    }
  }

  // eslint-disable-next-line jsdoc/require-description
  /**
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async closeIssue (req, res) {
    const issueId = req.params.id
    const gitLabURL = `https://gitlab.lnu.se/api/v4/projects/40129/issues/${issueId}`

    try {
      const response = await fetch(gitLabURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.ACCESS_TOKENS
        },
        body: JSON.stringify({
          state_event: 'close'
        })
      })

      const data = await response.json()
      console.log('Issue closed:', data)
      res.redirect('/issues')
    } catch (error) {
    }
  }

  // eslint-disable-next-line jsdoc/require-description
  /**
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async openIssue (req, res) {
    const issueId = req.params.id
    const gitLabURL = `https://gitlab.lnu.se/api/v4/projects/40129/issues/${issueId}`

    try {
      const response = await fetch(gitLabURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.ACCESS_TOKENS
        },
        body: JSON.stringify({
          state_event: 'reopen'
        })
      })

      const data = await response.json()
      console.log('Issue opened:', data)
      res.redirect('/issues')
    } catch (error) {
    }
  }
}
