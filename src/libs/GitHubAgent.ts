import PullRequest from '../types/PullRequest';
import NotImplementedError from '../errors/NotImplementedError';
import * as GitHub from '@actions/github';
import Core from '@actions/core';

type OctokitType = ReturnType<typeof GitHub.getOctokit>;
class GitHubAgent {
  github: OctokitType;

  constructor() {
    const token = Core.getInput('repo-token', { required: true });
    this.github = GitHub.getOctokit(token);
  }

  getPullRequest(pullRequestNumber: number): PullRequest {
    throw new NotImplementedError();
  }

  setPullRequestDescription(pullRequest: PullRequest) {
    throw new NotImplementedError();
  }
}

export default GitHubAgent;
