class PullRequestUpdateFailedError implements Error {
  message: string;
  name: string;

  constructor(prNumber: number) {
    this.message = `Pull Request (#${prNumber}) is not updated.`;
    this.name = 'Pull Request Update Failed';
  }
}

export default PullRequestUpdateFailedError;
