import { User } from './user.interface';
export interface Login {
    id: number,
    user_id: number,
    correo: string,
    contrasena: string,
    estado: string,
    User: User
}