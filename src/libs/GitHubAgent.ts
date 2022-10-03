import PullRequest from '../types/PullRequest';
import PullRequestLoadFailedError from '../errors/PullRequestLoadFailedError';
import PullRequestUpdateFailedError from '../errors/PullRequestUpdateFailedError';
import * as GitHub from '@actions/github';
import Core from '@actions/core';
import IGitHubAgent from '../interfaces/IGitHubAgent';

type OctokitType = ReturnType<typeof GitHub.getOctokit>;
class GitHubAgent implements IGitHubAgent {
  github: OctokitType;

  constructor() {
    const token = this.getInputValue('repo-token');
    this.github = GitHub.getOctokit(token);
  }

  getInputValue(key: string): string {
    return Core.getInput(key, { required: true });
  }

  async getPullRequest(): Promise<PullRequest> {
    const prNumber: number | undefined = this.getPullRequestNumber();
    if (prNumber === undefined) {
      throw new PullRequestLoadFailedError(-1);
    }
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
        title: pullRequest.title,
      };
    } catch (e) {
      throw new PullRequestLoadFailedError(prNumber);
    }
  }

  private getPullRequestNumber(): number | undefined {
    const pullRequest = GitHub.context.payload.pull_request;
    if (!pullRequest) {
      return undefined;
    }

    return pullRequest.number;
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
