import { Genero } from "./genero"

export type Filme = {
  nome: string
  genero_id: number
  genero: string
  created_at?: Date
  updated_at?: Date
}