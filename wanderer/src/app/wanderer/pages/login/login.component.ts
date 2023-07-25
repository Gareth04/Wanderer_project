import { Component } from '@angular/core';
import { WandererService } from '../../services/wanderer.service';
import { Login } from '../../interfaces/login.interface';
import { User } from '../../interfaces/user.interface';
import { AuthGuard } from '../../guards/auth.guard';
import { Responsive } from '../../interfaces/responsive.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //Arreglos
  arr_login: Login[] = [];

  login_obj!: Login;

  //Variables inicializadas
  log_email: string = "";
  log_psswd: string = "";
  rec_email: string = "";
  constructor(private wandererServices:WandererService, private autGuard:AuthGuard, private messageService: MessageService, private router: Router){}

//Metodo de login
  login(){
    this.wandererServices.obtenerLogin(this.log_email.toLowerCase(), this.log_psswd).subscribe(
      (response: Responsive) => {
        if(response.code === "00"){
          this.messageService.add({
            severity: 'success', summary: response.code , detail: response.message });
            this.login_obj = response.data; // Cuerpo de la respuesta (arreglo de objetos)
            // La respuesta es OK
            this.wandererServices.setArrLogin(this.login_obj);
            this.autGuard.IsLoggued = true;
            localStorage.setItem("token", "(2u=v3kL9u2PH$936=gdgk@PZ{j6wnag5@hbHYdwn!nf!-cK-A");
          // Utilizar setTimeout y Promise
          setTimeout(() => {
            this.router.navigate(['homepage']);
          }, 3000);
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
        console.error(error);
      }
    );
  }
  //Metodo del logout
  logout(){
    localStorage.removeItem('token');
    this.autGuard.IsLoggued = false;
  }
  openPopup(){
    document.querySelector('.popup')?.classList.add('open-popup')
  }
  closePopup(){
    document.querySelector('.popup')?.classList.remove('open-popup')
    this.rec_email = "";
  }
  recuperarCuenta(){
    this.wandererServices.recuperar(this.rec_email.toLowerCase()).subscribe(
      (response: Responsive) => {
        if(response.code === "00"){
          this.messageService.add({
            severity: 'success', summary: response.code , detail: "Se envió la verificación a su correo"});
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
        console.error(error);
      }
    );
    this.closePopup();
  }
}
