import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from 'src/app/wanderer/guards/auth.guard';
import { WandererService } from 'src/app/wanderer/services/wanderer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private wandererServices: WandererService, private formBuilder: FormBuilder, private autGuard:AuthGuard){
    this.nuevoForm = this.formBuilder.group({
      comentarios: ['', Validators.required]
    });
  }
  Islogged: boolean = false;
  comments: string = "";
  nuevoForm: FormGroup;
  ngOnInit(): void {
    this.Islogged = this.autGuard.IsLoggued;   
  }
  toggleBtn = document.querySelector('.toggle_btn')
  toggleBtnIcon = document.querySelector('.toggle_btn i')
  dropDomnMenu = document.querySelector('.dropdown_menu')
  info = document.querySelector('.info')
  toggleBTNmenu() {
    document.querySelector('.dropdown_menu')?.classList.toggle('open');
  }
  logOut(){
    this.wandererServices.logout();
  }
  openPopup(){
    // console.log("Entre");
    document.querySelector('.popup')?.classList.add('open-popup')
    // this.popup?.classList.add("open-popup");
  }
  closePopup(){
    document.querySelector('.popup')?.classList.remove('open-popup')
  }
  closePopupsend(){
    document.querySelector('.popup_send')?.classList.remove('open-popup_send')
  }
  sendComments(){
    this.wandererServices.sendComments(this.comments)
    if(this.wandererServices.Islogged === true){
      document.querySelector('.popup')?.classList.remove('open-popup')
      document.querySelector('.popup_send')?.classList.add('open-popup_send')
      this.limpiarFormulario();
    }
  }
  limpiarFormulario(){
    this.nuevoForm.reset();
  }
}
