import {Injectable} from '@angular/core'
import { User } from '../interfaces/user.interface';
import { AuthGuard } from '../guards/auth.guard';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment.development';
import { Paquete } from '../interfaces/paquete.interface';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Factura } from '../interfaces/factura.interface';
import { Responsive } from '../interfaces/responsive.interface';
import { ResponsiveArr } from '../interfaces/responsivearr.interface';

@Injectable({ 
    providedIn:'root'
})
export class WandererService{
    constructor(private autGuard:AuthGuard, private http: HttpClient){}
    Islogged: boolean = false;
    
    //Arreglos
    user: User[] = []; 

    //Obtener los datos de otro componente - 1
    login!: Login ;

    //Objetos
    userObj!: User;

    //Login
    obtenerLogin(correo:string,contrasena:string) {
        // const correoCodificado = encodeURIComponent(correo);
        // const url = `https://localhost:7140/api/login?correo=${correoCodificado}&contrasena=${contrasena}`;
        // return this.http.get<Responsive>(url,{ observe: 'response' });
        const params = new HttpParams()
          .set('correo', correo)
          .set('contrasena', contrasena);
        return this.http.get<Responsive>(`${environment.apiUrl}/login`,{params: params});
    }
    recuperar(correo: string) {
        const correoCodificado = encodeURIComponent(correo);
        return this.http.get<Responsive>(`${environment.apiUrl}/usuario/correo/${correoCodificado}`);
      }
    
    logout(){
        localStorage.removeItem('token');
        this.Islogged=false;
    }
    //Obtener los datos de otro componente - 2
    setArrLogin(arr: Login): void {
        this.login = arr;
    }
    getArrLogin(): Login {
        return this.login;
    }


    //--Usuario
    obtenerUsuario(id:number):Observable<Responsive> {
        const params = new HttpParams()
        .set('id',id)
        return this.http.get<Responsive>(`${environment.apiUrl}/usuario?`,{params:params})
    }
    putObjUsuario(user: User){
        return this.http.put<Responsive>(`${environment.apiUrl}/usuario/${user.id_usuario}`,user);
    }
    registro(Usuario :User){
        console.log(Usuario);
        return this.http.post<Responsive>(`${environment.apiUrl}/usuario`,Usuario)
    }

    //Factura
    registarFactura(factura :Factura){
        console.log(factura);
        return this.http.post<Responsive>(`${environment.apiUrl}/factura`,factura)
    }
    getReporte() {
        return this.http.get<ResponsiveArr>(`${environment.apiUrl}/factura`)
    }

    //Destinos
    getPaquete():Observable<ResponsiveArr> {
        console.log("entre")
        return this.http.get<ResponsiveArr>(`${environment.apiUrl}/paquete`)
    }
    getPaquetexTipo(tipo:string):Observable<ResponsiveArr>{
        const params = new HttpParams()
        .set('tipo',tipo)
        return this.http.get<ResponsiveArr>(`${environment.apiUrl}/paquete/tipo/${tipo}`,{params})
    }

    //Comentarios
    sendComments(comments: string){
        if(this.userObj === undefined){
            alert("Necesitas iniciar sesión para enviar")
        }else if(comments.trim() === ""){
            alert("Escriba comentarios para enviar")
        }else{
            console.log(this.userObj.correo.toLocaleUpperCase());
            console.log(comments);
        }
    }

    //no se en que lo uso 
    obtenerhistorialusers(){
        if(JSON.parse(localStorage.getItem('user')!) !== null){
            this.user = JSON.parse(localStorage.getItem('user')!);
        }
    }
}
