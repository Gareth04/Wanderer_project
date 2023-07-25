import { Component } from '@angular/core';

@Component({
  selector: 'app-ter-header',
  templateUrl: './ter-header.component.html',
  styleUrls: ['./ter-header.component.css']
})
export class TerHeaderComponent {
  toggleBtn = document.querySelector('.toggle_btn')
  toggleBtnIcon = document.querySelector('.toggle_btn i')
  dropDomnMenu = document.querySelector('.dropdown_menu')
  info = document.querySelector('.info')
  toggleBTNmenu() {
    document.querySelector('.dropdown_menu')?.classList.toggle('open');
  }
}
