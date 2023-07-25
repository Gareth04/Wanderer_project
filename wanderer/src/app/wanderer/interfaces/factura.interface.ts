import { User } from './user.interface';
export interface Factura {
    id_factura: number,
    id_usuario: number,
    correo: string,
    metodo: string,
    lugar: string,
    fecha: Date,
    precio: number,
    Usuario: User
}