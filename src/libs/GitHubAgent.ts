import PullRequest from '../types/PullRequest';
import NotImplementedError from '../errors/NotImplementedError';

class GitHubAgent {
  constructor() {}

  getPullRequest(pullRequestNumber: number): PullRequest {
    throw new NotImplementedError();
  }

  setPullRequestDescription(pullRequest: PullRequest) {
    throw new NotImplementedError();
  }
}

export default GitHubAgent;
