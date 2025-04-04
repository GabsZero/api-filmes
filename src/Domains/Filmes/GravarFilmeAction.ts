
import database from "../../database/config";
import { CreateFilmeDto } from "../../dtos/createFilmeDto.dtos";

export const gravarFilmeService = async (filme: CreateFilmeDto) => {
  const result = await database.insert({}).into('filmes')

  return result
};

