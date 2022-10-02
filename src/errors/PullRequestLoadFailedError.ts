class PullRequestLoadFailedError implements Error {
  message: string;
  name: string;

  constructor(prNumber: number) {
    this.message = `Pull Request (#${prNumber}) is not found.`;
    this.name = 'Pull Request Not Found';
  }
}

export default PullRequestLoadFailedError;
