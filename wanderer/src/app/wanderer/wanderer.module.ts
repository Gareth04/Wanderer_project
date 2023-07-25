import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { SelcDestinoComponent } from './pages/selc-destino/selc-destino.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    ReporteComponent,
    SelcDestinoComponent,
    FacturacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    SharedModule,
    RouterModule
  ],

  exports: [
    HomepageComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    ReporteComponent,
    SelcDestinoComponent,
    FacturacionComponent,
  ]
})
export class WandererModule { }
