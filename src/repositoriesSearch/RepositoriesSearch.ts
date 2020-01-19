const GITHUB_API = 'https://api.github.com';
const SEARCH_API = `${GITHUB_API}/search`;

// 1. by repo name
// 2. by user (get collaboration network)
// 3. search within users (by user)
class GithubService {
  searchByQuery(query: string) {
    // return `${SEARCH_API}/repositories?q=topic:android+user:${user}+${query} in `
    return `${SEARCH_API}/repositories?q=topic:android+${query} in:name,description,readme`
  }
  searchByUser(user: string) {
    return `${SEARCH_API}/repositories?q=topic:android+user:${user}`;
  }
}

export default GithubService;
