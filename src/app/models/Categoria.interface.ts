import { SubCategoria } from "./SubCategoria.interface";

export interface Categoria {
    id? : string,
    categoria : string,
    subCategorias: SubCategoria[]
}