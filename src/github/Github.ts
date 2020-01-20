import { Project } from "../App";
import { GithubCache } from "./GithubCache";

// https://create-react-app.dev/docs/adding-custom-environment-variables/
const token = process.env.REACT_APP_GITHUB_TOKEN;

type GithubRepository = {
  full_name: string,
  name: string,
  owner: {
    login: string,
    avatar_url: string
  }
}

type AccumulatedProject = Project & {count: number};
// 1. by repo name
// 2. by user (get collaboration network)
// 3. search within users (by user)
class Github {
  private constructor () {}
  static getInstance() {
    return new Github();
  }
  async searchByName(name: string): Promise<Project[]> {
    const androidRepos = await this.fetchByNameAndTopic(name, 'android');
    const androidAppRepos = await this.fetchByNameAndTopic(name, 'android-app');
    return uniqueBy<Project>([...androidRepos, ...androidAppRepos], (p) => p.id);
  }
  private async fetchByNameAndTopic(name: string, topic: string): Promise<Project[]> {
    const response = await GithubCache.get<{items: GithubRepository[]}>(`search/repositories?q=${name}+topic:${topic}`);
    return response.data.items?.map(mapToProject) || [];
  }
  private async getCollaborators(fullName: string): Promise<string[]> {
    const response = await GithubCache.get(`repos/${fullName}/contributors`);
    return response.data.map((c: {login: string}) => c.login);
  }
  private async getUserRepositories(user: string): Promise<Project[]> {
    const response = await GithubCache
      .get<{items: ({repository: GithubRepository})[]}>(
        `search/commits?q=committer:${user}`, 
        {headers: {
          'Accept': 'application/vnd.github.cloak-preview',
          'Authorization': token
        }}
      );
    const repositories: Project[] = response.data?.items.map(response => mapToProject(response.repository));

    return uniqueBy<Project>(repositories || [], (r) => r.id);
  }
  async getSimilarRepositories(fullName: string) {
    const collaborators = await this.getCollaborators(fullName);
    const repositories = await Promise.all(collaborators.slice(0, 10).map(this.getUserRepositories));
  
    return repositories
      .flat()
      .reduce((acc, repository) => {
        const sameRepo = acc.find(x => x.id === repository.id);
        if (sameRepo) {
          sameRepo.count += 1;
        } else {
          acc.push({...repository, count: 1})
        }
        return acc;
      }, [] as AccumulatedProject[])
      .sort((lhs, rhs) => lhs.count - rhs.count);
  }
}

function uniqueBy<T>(array: T[], uniqueKeyAccessor: (element: T) => any) {
  return array.filter((lhs, index) => !array.slice(index + 1).some(rhs => uniqueKeyAccessor(lhs) === uniqueKeyAccessor(rhs)));
}

function mapToProject(repository: GithubRepository): Project {
  return {
    id: repository.full_name,
    title: repository.name,
    author: repository.owner?.login,
    icon: repository.owner?.avatar_url
  }
}

export default Github;
