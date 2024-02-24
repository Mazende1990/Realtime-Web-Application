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
        id: issue.id,
        title: issue.title,
        description: issue.description,
        avatar: issue.author.avatar_url
      }))

      res.render('issues/index', { issues: issueObject })
      console.log(issueObject)
    } catch (error) {

    }
  }
}
