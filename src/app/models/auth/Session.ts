import { Categoria } from "../Categoria";
import { FormaDePago } from "../FormaDePago";
import { SubCategoria } from "../SubCategoria";
import { Usuario } from "./Usuario";


export class Session {
    usuario : Usuario;
    categorias : Categoria[] = [];
    subCategorias : SubCategoria[] = [];
    formasDePago : FormaDePago[] = [];
    currentMonth : string = "";

    constructor(usuario : Usuario) {
        this.usuario = usuario;
    }

}