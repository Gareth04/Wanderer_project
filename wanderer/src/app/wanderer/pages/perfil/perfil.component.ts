import { Component } from '@angular/core';
import { Login } from '../../interfaces/login.interface';
import { WandererService } from '../../services/wanderer.service';
import { User } from '../../interfaces/user.interface';
import { Responsive } from '../../interfaces/responsive.interface';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
    //Arreglos
    arr_login: Login[] = [];
    //Objetos
    login!: Login;
    user!: User;
    // variables
    nombre: string ="";
    correo: string ="";
    contrasena: string ="";
    ciudad: string =" ";
    direccion: string =" ";
    estado: string =" ";
    //variables de cambio de contraseña
    contr_actual: string ="";
    contr_nueva: string ="";

    constructor(private wandererServices:WandererService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private router: Router)
    {

    }
    ngOnInit() {
      //Obtener los datos de otro componente - 4
      this.login = this.wandererServices.getArrLogin();
      this.ObtenerUsuario(this.login.user_id);
    }
    ObtenerUsuario(id: number){
      this.wandererServices.obtenerUsuario(id).subscribe(
        (data: Responsive) =>{
          this.user = data.data
          this.nombre = this.user.nombres
          this.correo = this.user.correo
          this.contrasena = this.user.contrasena
          this.ciudad = this.user.ciudad
          this.direccion = this.user.direccion
          this.estado = this.user.estado
        },
        (error) => {
          console.error(error);
        });
    }
    actualizarPerfil(){
      this.user.nombres=this.nombre;
      this.user.correo=this.correo;
      this.user.contrasena=this.contrasena;
      this.user.ciudad=this.ciudad;
      this.user.direccion=this.direccion;
      this.user.estado=this.estado;
      this.user.estado="activo";
      this.wandererServices.putObjUsuario(this.user).subscribe(
        (response) => {
          if(response.code === "00"){
            this.messageService.add({
              severity: 'success', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
          }else if(response.code === "01"){
            this.messageService.add({
              severity: 'error', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
          }else if(response.code === "02"){
            this.messageService.add({
              severity: 'error', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
          }
        },
        (error) => {
          console.error('Error en la solicitud PUT:', error);
        }
      );
    }
    comments: string = "";
    Updatepsswd(){
      if(this.contr_actual === this.contrasena && this.contr_actual !== this.contr_nueva){
        this.contrasena = this.contr_nueva;
        this.closePopup();
      }else{
        this.messageService.add({
          severity: 'error', detail: "Dijite los campos correctamente" });
          console.log(this.contr_actual)
          console.log(this.contrasena)
          console.log(this.contr_nueva)
        
      }
    }
    openPopup(){
      // console.log("Entre");
      document.querySelector('.popup')?.classList.add('open-popup')
      this.contr_actual=""
      this.contr_nueva=""
      // this.popup?.classList.add("open-popup");
    }
    closePopup(){
      document.querySelector('.popup')?.classList.remove('open-popup')
      this.contr_actual=""
      this.contr_nueva=""
    }
    // limpiarFormulario(){
    //   this.nuevoForm.reset();
    // }
}
