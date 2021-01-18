import { Persona } from "./Persona";

export class Usuario {
    persona : Persona;
    email : string;
    contraseña : string;

    constructor(email : string, contraseña : string, persona : Persona) {
        this.email = email;
        this.contraseña = contraseña;
        this.persona = persona;
    }
}