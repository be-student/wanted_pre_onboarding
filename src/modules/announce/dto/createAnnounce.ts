export class CreateAnnounce {
  private position: string;
  private content: string;
  private additional?: Array<{ [key: string]: string }>;
  private companyId: number;
  constructor(
    position: string,
    content: string,
    additional: Array<{ [key: string]: string }>,
    companyId: number,
  ) {
    this.position = position;
    this.content = content;
    this.additional = additional;
    this.companyId = companyId;
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
  getCompanyId() {
    return this.companyId;
  }
}
