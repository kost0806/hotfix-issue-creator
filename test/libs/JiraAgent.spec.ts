import { describe, expect, it } from '@jest/globals';
import JiraAgent from '../../src/libs/JiraAgent';

describe('GitHubAgent Test', () => {
  it('creating test', () => {
    expect(() => new JiraAgent()).not.toThrow();
  });

  it('creating issue', async () => {
    const agent = new JiraAgent();

    expect(() =>
      agent.createIssue('GIVEN SUMMARY', 'GIVEN DESCRIPTION')
    ).not.toThrow();
  });
});
