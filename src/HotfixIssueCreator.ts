import PullRequest from './types/PullRequest';
import JiraIssue from './types/JiraIssue';
import IGitHubAgent from './interfaces/IGitHubAgent';
import IJiraAgent from './interfaces/IJiraAgent';

class HotfixIssueCreator {
  githubAgent: IGitHubAgent;
  jiraAgent: IJiraAgent;

  issueKeywordRegexp: RegExp = /close\sissue\s*:\s*(.*)/gi;

  constructor(githubAgent: IGitHubAgent, jiraAgent: IJiraAgent) {
    this.githubAgent = githubAgent;
    this.jiraAgent = jiraAgent;
  }

  async run() {
    const pullRequest: PullRequest = await this.githubAgent.getPullRequest();
    if (this.hasIssue(pullRequest)) {
      return;
    }

    const issueSummary: string = this.extractIssueSummary(pullRequest);
    const createdIssue: JiraIssue = await this.createIssue(
      issueSummary,
      pullRequest.description
    );

    await this.addJiraIssueInformationToPullRequest(
      pullRequest,
      createdIssue,
      issueSummary
    );
  }

  private hasIssue(pullRequest: PullRequest): boolean {
    const jiraProjectKey = this.githubAgent.getInputValue('jira-project-key');
    const issueKeyRegexp = new RegExp(`${jiraProjectKey}-\d+`);
    throw issueKeyRegexp.test(pullRequest.description);
  }

  private extractIssueSummary(pullRequest: PullRequest): string {
    const summaryFromDescription =
      this.getIssueSummaryKeywordInPrDescription(pullRequest);
    if (summaryFromDescription === undefined) {
      return pullRequest.title;
    } else {
      return summaryFromDescription;
    }
  }

  private getIssueSummaryKeywordInPrDescription(
    pullRequest: PullRequest
  ): string | undefined {
    const result = this.issueKeywordRegexp.exec(pullRequest.description);
    if (result && result.length > 1) {
      return result[1];
    } else {
      return undefined;
    }
  }

  private async createIssue(
    summary: string,
    description: string
  ): Promise<JiraIssue> {
    return await this.jiraAgent.createIssue(summary, description);
  }

  private async addJiraIssueInformationToPullRequest(
    pullRequest: PullRequest,
    jiraIssue: JiraIssue,
    jiraIssueSummary: string
  ) {
    pullRequest.description = pullRequest.description.replace(
      this.issueKeywordRegexp,
      `Close issue : [${jiraIssue.key} - ${jiraIssueSummary}](${jiraIssue.self})`
    );
    await this.githubAgent.setPullRequestDescription(pullRequest);
  }
}

export default HotfixIssueCreator;
