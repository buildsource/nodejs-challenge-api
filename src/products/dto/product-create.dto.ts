import { IsNotEmpty, IsInt, IsNumber, Min } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatória.' })
  description: string;

  @IsNumber({}, { message: 'O preço deve ser um número válido.' })
  @Min(0.01, { message: 'O preço deve ser maior que zero.' })
  price: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade deve ser maior que zero.' })
  amount: number;

  @IsInt({ message: 'O ID da fábrica deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID da fábrica é obrigatório.' })
  factoryId: number;
}
