import { describe, expect, it } from '@jest/globals';
import GitHubAgent from '../../src/libs/GitHubAgent';
import PullRequest from '../../src/types/PullRequest';
import gitHubAgent from '../../src/libs/GitHubAgent';

jest.mock('@actions/core', () => ({
  getInput: () => '',
}));

type OctokitRestCallType = {
  owner?: any;
  repo?: any;
  pull_number: number;
};
jest.mock('@actions/github', () => ({
  getOctokit: () => ({
    rest: {
      pulls: {
        get: (payload: OctokitRestCallType) =>
          new Promise<any>((resolve) => {
            resolve({
              data: {
                number: payload.pull_number,
                html_url: '',
                body: '',
              },
            });
          }),
      },
    },
  }),
  context: {
    repo: {
      owner: '',
      repo: '',
    },
  },
}));

describe('GitHubAgent Test', () => {
  it('creating test', () => {
    expect(() => new GitHubAgent()).not.toThrow();
  });

  it('retrieving pull request', async () => {
    const agent = new GitHubAgent();

    const givenPrNumber: number = 1;
    const pr: PullRequest = await agent.getPullRequest(givenPrNumber);

    expect(pr.number).toEqual(givenPrNumber);
  });

  it('setting pull request description', () => {
    const agent = new gitHubAgent();

    const givenPr: PullRequest = {
      number: 1,
      description: 'test description',
      self: '',
    };

    expect(
      async () => await agent.setPullRequestDescription(givenPr)
    ).not.toThrow();
  });
});