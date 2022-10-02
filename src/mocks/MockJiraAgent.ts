import IJiraAgent from '../interfaces/IJiraAgent';
import JiraIssue from '../types/JiraIssue';

class MockJiraAgent implements IJiraAgent {
  async createIssue(summary: string, description: string): Promise<JiraIssue> {
    return new Promise((resolve) => {
      resolve({
        self: 'https://networkrndhub.sec.samsung.net/jira/browse/TEST-1234',
        key: 'TEST-1234',
      });
    });
  }
}

export default MockJiraAgent;
