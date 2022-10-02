import NotImplementedError from './errors/NotImplementedError';
import PullRequest from './types/PullRequest';
import BranchInformation from './types/BranchInformation';
import JiraIssue from './types/JiraIssue';

class HotfixIssueCreator {
  constructor() {}

  run() {
    throw new NotImplementedError();
  }

  private hasIssue(pullRequest: PullRequest): boolean {
    throw new NotImplementedError();
  }

  private getBranchInformation(): BranchInformation {
    throw new NotImplementedError();
  }

  private isTargetHeadBranch(branchInformation: BranchInformation): boolean {
    throw new NotImplementedError();
  }

  private extractIssueSummary(pullRequest: PullRequest) {
    throw new NotImplementedError();
  }

  private getIssueSummaryKeywordInPrDescription(
    pullRequest: PullRequest
  ): string {
    throw new NotImplementedError();
  }

  private createIssue(summary: string, description: string): JiraIssue {
    throw new NotImplementedError();
  }

  private addJiraIssueInformationToPullRequest(
    pullRequest: PullRequest,
    jiraIssue: JiraIssue
  ) {
    throw new NotImplementedError();
  }
}

export default HotfixIssueCreator;
