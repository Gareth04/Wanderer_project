import {NgModule} from '@angular/core'
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./wanderer/pages/login/login.component";
import { RegistroComponent } from "./wanderer/pages/registro/registro.component";
import { HomepageComponent } from "./wanderer/pages/homepage/homepage.component";
import { PerfilComponent } from "./wanderer/pages/perfil/perfil.component";
import { ReporteComponent } from "./wanderer/pages/reporte/reporte.component";
import { SelcDestinoComponent } from "./wanderer/pages/selc-destino/selc-destino.component";
import { FacturacionComponent } from "./wanderer/pages/facturacion/facturacion.component";
import { AuthGuard } from './wanderer/guards/auth.guard';

export const routes: Routes =[ 
    {//configuracion de la ruta principal
        path:'',
        component: HomepageComponent,
        pathMatch: 'full',

    },
    {
        path:'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path:'registro',
        component: RegistroComponent,
        pathMatch: 'full'
    },
    {//ruta por region
        path:'homepage',
        component: HomepageComponent,
        pathMatch: 'full',
    },
    {//ruta por capital
        path:'perfil',
        component: PerfilComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }, 
    {
        path:'reporte',
        component: ReporteComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path:'selecDestino',
        component: SelcDestinoComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path:'facturacion',
        component: FacturacionComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {//necesito procesar si la persona ingresa a una pagina de forma incorrecta, para eso es esta ruta
        path:'**',
        redirectTo:'homepage'
    }
];
@NgModule({
    imports:[
        //forRoute son las rutas principales, forChild es para las rutas hijas
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}