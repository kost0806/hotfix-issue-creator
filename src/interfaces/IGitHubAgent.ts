import PullRequest from '../types/PullRequest';
import BranchInformation from '../types/BranchInformation';

interface IGitHubAgent {
  getPullRequest(): Promise<PullRequest>;
  setPullRequestDescription(pullRequest: PullRequest): Promise<any>;
  getInputValue(key: string): string;
  getBranchInformation(): BranchInformation;
}

export default IGitHubAgent;
