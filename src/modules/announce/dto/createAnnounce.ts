export class CreateAnnounce {
  private position: string;
  private content: string;
  private additional?: Array<{ [key: string]: string }>;

  constructor(
    position: string,
    content: string,
    additional: Array<{ [key: string]: string }>,
  ) {
    this.position = position;
    this.content = content;
    this.additional = additional;
  }

  getPosition() {
    return this.position;
  }

  getContent() {
    return this.content;
  }
  getAdditional() {
    return this.additional;
  }
}
