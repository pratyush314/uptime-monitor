import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateMonitorDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsNotEmpty()
  url: string;
}
