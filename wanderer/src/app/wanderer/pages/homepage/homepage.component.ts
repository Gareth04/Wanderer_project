import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Login } from '../../interfaces/login.interface';
import { LoginComponent } from '../login/login.component';
import { WandererService } from '../../services/wanderer.service';
import { Responsive } from '../../interfaces/responsive.interface';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {


  toggleBtn = document.querySelector('.toggle_btn')
  toggleBtnIcon = document.querySelector('.toggle_btn i')
  dropDomnMenu = document.querySelector('.dropdown_menu')
  info = document.querySelector('.info')
  
  // dropDomnMenu = document.getElementById('dropdown')
  
  toggleBTNmenu() {
    document.querySelector('.dropdown_menu')?.classList.toggle('open');
  }
  constructor(private primengConfig: PrimeNGConfig, private wandererServices:WandererService, private messageService: MessageService, private router: Router, private autGuard:AuthGuard){}
    //Objetos
  login!: Login;
  user!: User;
  banner: Banner[] = [];
  ngOnInit() {
    //Valido para que haga la validacion solo cuando el usuario este logueado
    if(this.autGuard.IsLoggued){
      //Obtener los datos de otro componente - 4
      this.login = this.wandererServices.getArrLogin();
      this.ObtenerUsuario(this.login.user_id);
    }
    this.banner = [
        {
          image:
                'assets/images/playa1.jpeg',
        }
        ,
        {

          image:
                'assets/images/carr2.png',
        }
        ,
        {
          image:
                'assets/images/info_nambillo.jpeg',
        }
        ,
        {
          image:
                'assets/images/carr3.png',
        }
    ];
  }
  ObtenerUsuario(id: number){
    this.wandererServices.obtenerUsuario(id).subscribe(
      (data: Responsive) =>{
        this.user = data.data
        if(this.user.estado === "inactivo"){
          this.messageService.add({
            severity: 'success' , detail: "Bienvenido!, Es necesario cambiar las credenciales"});
          // Utilizar setTimeout y Promise
          setTimeout(() => {
            this.router.navigate(['perfil']);
          }, 5000);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
export interface Banner {
  image?: String;
}
