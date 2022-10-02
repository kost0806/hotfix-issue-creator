import { describe, expect, it } from '@jest/globals';
import GitHubAgent from '../../src/libs/GitHubAgent';
import PullRequest from '../../src/types/PullRequest';
import gitHubAgent from '../../src/libs/GitHubAgent';

jest.mock('@actions/core', () => ({
  getInput: () => '',
}));
jest.mock('@actions/github', () => ({
  getOctokit: () => ({}),
}));

describe('GitHubAgent Test', () => {
  it('creating test', () => {
    expect(() => new GitHubAgent()).not.toThrow();
  });

  it('retrieving pull request', () => {
    const agent = new GitHubAgent();

    const givenPrNumber: number = 1;
    const pr: PullRequest = agent.getPullRequest(givenPrNumber);

    expect(pr.number).toEqual(givenPrNumber);
  });

  it('setting pull request description', () => {
    const agent = new gitHubAgent();

    const givenPr: PullRequest = {
      number: 1,
      description: 'test description',
      self: '',
    };

    expect(() => agent.setPullRequestDescription(givenPr)).not.toThrow();
  });
});
