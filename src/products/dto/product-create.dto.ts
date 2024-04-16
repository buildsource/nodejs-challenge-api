import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  factoryId: number;
}
