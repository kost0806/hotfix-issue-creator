import JiraIssue from '../types/JiraIssue';
import JiraApi from 'jira-client';
import NotImplementedError from '../errors/NotImplementedError';
import IJiraAgent from '../interfaces/IJiraAgent';

class JiraAgent implements IJiraAgent {
  jiraApi: any;
  constructor(username: string, password: string) {
    this.jiraApi = new JiraApi({
      protocol: 'https',
      host: 'https://networkrndhub.sec.samsung.net',
      username: username,
      password: password,
      apiVersion: '2',
      strictSSL: true,
    });
  }

  createIssue(summary: string, description: string): JiraIssue {
    throw new NotImplementedError();
  }
}

export default JiraAgent;
