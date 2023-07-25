import { Component } from '@angular/core';
import { Factura } from '../../interfaces/factura.interface';
import { WandererService } from '../../services/wanderer.service';
import { ResponsiveArr } from '../../interfaces/responsivearr.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  reporte: Factura[] = [];

  constructor(private wandererServices:WandererService){}
  ngOnInit(): void {
    console.log("entre")
    //Obtener el arreglo de Paquete y guardarlo en un arreglo de tipo paquete
    this.listaPaquete();
  }
  listaPaquete(){
    this.wandererServices.getReporte().subscribe(
      (data: ResponsiveArr) =>{
        this.reporte = data.data;
      },
      (error) => {
        console.error(error);
      });
  }
}
