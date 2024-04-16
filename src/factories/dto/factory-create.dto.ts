import { IsNotEmpty } from 'class-validator';

export class FactoryCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
