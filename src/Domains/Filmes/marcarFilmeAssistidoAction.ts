
import database from "../../database/config";

export const marcarFilmeAssistidoAction = async (filmeId: number): Promise<boolean> => {
  return await database.table('filmes').where('id', filmeId).update({ assistido: true })

};

