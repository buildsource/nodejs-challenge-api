import { IsNotEmpty } from 'class-validator';

export class FactoryCreateDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  description: string;
}
