export class CreateCompanyDto {
  name: string;
  additional: { [key: string]: string };
}
