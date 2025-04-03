import { IsNotEmpty, IsNumber, Length } from "class-validator";
const { DateTime } = require("luxon");


export class CreateFilmeDto {
  @IsNotEmpty({
    message: "Nome do filme é obrigatório"
  })
  @Length(3, 255, {
    message: "Nome do filme precisa ter entre 3 e 255 caracteres"
  })
  nome: string;

  @IsNotEmpty({
    message: "Gênero é obrigatório"
  })
  @IsNumber({}, {
    message: "Gênero inválido"
  })

  genero_id: number;

  created_at: string
  updated_at: string

  constructor(nome: string, genero_id: number) {
    this.nome = nome
    this.genero_id = genero_id
    this.created_at = DateTime.now()
    this.updated_at = DateTime.now()
  }
}

