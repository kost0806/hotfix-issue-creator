import JiraIssue from '../types/JiraIssue';

interface IJiraAgent {
  createIssue(summary: string, description: string): Promise<JiraIssue>;
}

export default IJiraAgent;
