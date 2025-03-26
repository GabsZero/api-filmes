import { IsNumber, IsString, Length } from "class-validator";


export class CreateFilmeDto {
  @IsString({
    message: "Nome do filme precisa ser um texto"
  })
  @Length(3, 255, {
    message: "Nome do filme precisa ter entre 3 e 255 caracteres"
  })
  nome: string;

  @IsNumber({}, {
    message: "Gênero precisa ser um número"
  })
  genero_id: number;

  created_at: string
  updated_at: string
}