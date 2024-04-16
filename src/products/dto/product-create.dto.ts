import { IsNotEmpty, IsInt } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  factoryId: number;
}
