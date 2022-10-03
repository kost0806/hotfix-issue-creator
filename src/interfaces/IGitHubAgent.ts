import PullRequest from '../types/PullRequest';

interface IGitHubAgent {
  getPullRequest(): Promise<PullRequest>;
  setPullRequestDescription(pullRequest: PullRequest): Promise<any>;
  getInputValue(key: string): string;
}

export default IGitHubAgent;
