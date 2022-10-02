import PullRequest from '../types/PullRequest';

interface IGitHubAgent {
  getPullRequest(prNumber: number): Promise<PullRequest>;
  setPullRequestDescription(pullRequest: PullRequest): Promise<any>;
}

export default IGitHubAgent;
