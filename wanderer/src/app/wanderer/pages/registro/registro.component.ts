import { Component } from '@angular/core';
//servicios
import { WandererService } from '../../services/wanderer.service';
import { User } from '../../interfaces/user.interface';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  //Objeto
  UserObj!: User;
  //Variables inicializadas
  reg_name: string = "";
  reg_email: string = "";
  reg_psswd: string = "";
  reg_conf_psswd: string = "";
  constructor(private wandererServices:WandererService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private router: Router){}
  registro(){
    if(this.reg_psswd === this.reg_conf_psswd){
      this.UserObj = {
        id_usuario: 0,
        nombres: this.reg_name,
        correo: this.reg_email,
        contrasena: this.reg_psswd,
        ciudad: "",
        direccion: "",
        estado: ""
      }
      this.wandererServices.registro(this.UserObj).subscribe(
        (response) => {
          if(response.code === "00"){
            this.messageService.add({
              severity: 'success', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }else if(response.code === "01"){
            this.messageService.add({
              severity: 'error', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
            setTimeout(() => {
            }, 3000);
          }else if(response.code === "02"){
            this.messageService.add({
              severity: 'error', summary: response.code , detail: response.message });
            // Utilizar setTimeout y Promise
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }
        },
        (error) => {
          console.error('Error en la solicitud POST:', error);
        });
    }else{
      alert("Las contraseñas no coinicden")
    }
  }
}