export class CreateCompanyDto {
  name: string;
  additional?: Array<{ [key: string]: string }>;
}
