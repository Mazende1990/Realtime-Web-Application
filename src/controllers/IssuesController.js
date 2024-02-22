
/**
 *
 */

export class IssuesController {
    
  // eslint-disable-next-line jsdoc/require-returns, jsdoc/require-description
  /**
   *
   */
  async fetchissues () {
    // Assuming you want to use the method parameter `url` to make the function more flexible.
    const gitLabURL = 'https://gitlab.lnu.se/api/v4/projects/40129/issues'

    const res = await fetch(gitLabURL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.ACCESS_TOKENS
      }
    })

    const data = await res.json() // Await the parsing of the response body
    console.log(data) // Consider if you need this log here
    return data // Return the data for further processing
  }
}
