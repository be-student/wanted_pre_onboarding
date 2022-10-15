import { IsNumber, IsString } from 'class-validator';

export class CreateAnnounce {
  @IsString()
  private position: string;

  @IsString()
  private content: string;
  private additional?: Array<{ [key: string]: string }>;

  @IsNumber()
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
