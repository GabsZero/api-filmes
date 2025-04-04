
import database from "../../database/config";

export const marcarFilmeAssistidoAction = async (filmeId: number): Promise<void> => {
  await database.table('filmes').where('id', filmeId).update({ assistido: true })
};

