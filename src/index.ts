import HotfixIssueCreator from './HotfixIssueCreator';
import IGitHubAgent from './interfaces/IGitHubAgent';
import GitHubAgent from './libs/GitHubAgent';
import IJiraAgent from './interfaces/IJiraAgent';
import MockJiraAgent from './mocks/MockJiraAgent';

const githubAgent: IGitHubAgent = new GitHubAgent();
const jiraAgent: IJiraAgent = new MockJiraAgent();

const hotfixIssueCreator = new HotfixIssueCreator(githubAgent, jiraAgent);
hotfixIssueCreator.run();
