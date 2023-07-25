export interface User{
    id_usuario: number,
    nombres: string,
    correo: string,
    contrasena: string,
    ciudad: string,
    direccion: string,
    estado: string
}

export interface UserResponse{
    message: string;
    token: string;
    userId: number;
}