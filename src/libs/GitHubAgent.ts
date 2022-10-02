import PullRequest from '../types/PullRequest';
import PullRequestLoadFailedError from '../errors/PullRequestLoadFailedError';
import PullRequestUpdateFailedError from '../errors/PullRequestUpdateFailedError';
import * as GitHub from '@actions/github';
import Core from '@actions/core';

type OctokitType = ReturnType<typeof GitHub.getOctokit>;
class GitHubAgent {
  github: OctokitType;

  constructor() {
    const token = Core.getInput('repo-token', { required: true });
    this.github = GitHub.getOctokit(token);
  }

  async getPullRequest(prNumber: number): Promise<PullRequest> {
    try {
      const { data: pullRequest } = await this.github.rest.pulls.get({
        owner: GitHub.context.repo.owner,
        repo: GitHub.context.repo.repo,
        pull_number: prNumber,
      });

      return {
        number: pullRequest.number,
        self: pullRequest.html_url,
        description: pullRequest.body || '',
      };
    } catch (e) {
      throw new PullRequestLoadFailedError(prNumber);
    }
  }

  async setPullRequestDescription(pullRequest: PullRequest): Promise<any> {
    try {
      await this.github.rest.pulls.get({
        owner: GitHub.context.repo.owner,
        repo: GitHub.context.repo.repo,
        pull_number: pullRequest.number,
        body: pullRequest.description,
      });
    } catch (e) {
      throw new PullRequestUpdateFailedError(pullRequest.number);
    }
  }
}

export default GitHubAgent;
