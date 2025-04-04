
import database from "../../database/config";
import { CreateFilmeDto } from "../../dtos/createFilmeDto.dtos";

export const gravarFilmeService = async (filme: CreateFilmeDto) => {
  const result = await database.insert(filme).into('filmes')

  return result
};

