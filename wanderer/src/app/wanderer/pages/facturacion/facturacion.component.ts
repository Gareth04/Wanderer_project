import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paquete } from '../../interfaces/paquete.interface';
import { Login } from '../../interfaces/login.interface';
import { WandererService } from '../../services/wanderer.service';
import { User } from '../../interfaces/user.interface';
import { Factura } from '../../interfaces/factura.interface';
import { Responsive } from '../../interfaces/responsive.interface';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  //Objetos
  paquete_obj!: Paquete;
  login!: Login;
  usuario_obj!: User;
  factura_obj!: Factura;

  //variables
  nombre: string = "";
  correo: string = "";
  lugar: string = "";
  fecha_act: string = "";
  metodo: string = "";
  precio: number = 0;
  fechaActual = new Date();
  popup = document.getElementById('popup');

  constructor(private route: ActivatedRoute, private wandererServices: WandererService) {}

  ngOnInit() {
    this.login = this.wandererServices.getArrLogin();
    this.paquete_obj = history.state;
    this.lugar = this.paquete_obj.destino;
    this.precio = this.paquete_obj.precio_paq;
    this.fecha();
    console.log(this.fechaActual);
    this.ObtenerUsuario(this.login.user_id);
  }
  openPopup(){
    // console.log("Entre");
    document.querySelector('.popup')?.classList.add('open-popup')
    // this.popup?.classList.add("open-popup");
  }
  closePopup(metodo: string){
    console.log(metodo);
    document.querySelector('.popup')?.classList.remove('open-popup')
  }

  ObtenerUsuario(id: number){
    this.wandererServices.obtenerUsuario(id).subscribe(
      (data: Responsive) =>{
        this.usuario_obj = data.data
          this.nombre = this.usuario_obj.nombres
          this.correo = this.usuario_obj.correo
      },
      (error) => {
        console.error(error);
      });
  }
  generarCompra(){
    this.factura_obj = {
      id_factura: 0,
      id_usuario: this.usuario_obj.id_usuario,
      correo: this.correo,
      metodo: this.metodo,
      lugar: "esmeraldas",
      fecha: this.fechaActual,
      precio: this.precio,
      Usuario: this.usuario_obj
    }
    console.log(this.factura_obj);
    this.wandererServices.registarFactura(this.factura_obj).subscribe(
      (response) => {
        console.log(response.code);
        console.log(response.message);
      },
      (error) => {
        console.error('Error en la solicitud POST:', error);
      });
  }
  fecha(){
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener los componentes de la fecha
    const year = fechaActual.getFullYear(); // Año actual
    const month = fechaActual.getMonth() + 1; // Mes actual (0-11, por eso se suma 1)
    const day = fechaActual.getDate(); // Día del mes actual

    // Formatear la fecha como un string (opcional)
    this.fecha_act = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
}
