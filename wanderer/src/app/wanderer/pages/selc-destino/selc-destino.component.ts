import { Component, OnInit } from '@angular/core';
import { WandererService } from '../../services/wanderer.service';
import { Paquete } from '../../interfaces/paquete.interface';
import { Router } from '@angular/router';
import { Responsive } from '../../interfaces/responsive.interface';
import { ResponsiveArr } from '../../interfaces/responsivearr.interface';

@Component({
  selector: 'app-selc-destino',
  templateUrl: './selc-destino.component.html',
  styleUrls: ['./selc-destino.component.css']
})
export class SelcDestinoComponent {
  paquete: Paquete[] = [];
  stateObject = { tipo: "tipo" }
  tipo : string = "";
  constructor(private wandererServices:WandererService, private router: Router){}
  ngOnInit(): void {
    this.stateObject = history.state
    this.tipo = this.stateObject.tipo
    this.llenarArreglo()
  }
  listaPaquete(){
    this.wandererServices.getPaquete().subscribe(
      (data: ResponsiveArr) =>{
        this.paquete = data.data;
        console.log(data.data)
      },
      (error) => {
        console.error(error);
      });
  }
  listaPaquetexTipo(tipo : string){
    this.wandererServices.getPaquetexTipo(tipo).subscribe(
      (data: ResponsiveArr) =>{
        this.paquete = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
  seleccionarDestino(paq: Paquete){
    this.router.navigateByUrl('/facturacion', { state: paq });
  }
  llenarArreglo(){
    if(this.tipo === undefined){
      //Obtener el arreglo de Paquete y guardarlo en un arreglo de tipo paquete
      this.listaPaquete();
    }else{
      this.listaPaquetexTipo(this.tipo)
    }
  }
}
