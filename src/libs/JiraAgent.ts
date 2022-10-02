import JiraIssue from '../types/JiraIssue';
import NotImplementedError from '../errors/NotImplementedError';

class JiraAgent {
  constructor() {}

  createIssue(summary: string, description: string): JiraIssue {
    throw new NotImplementedError();
  }
}

export default JiraAgent;
