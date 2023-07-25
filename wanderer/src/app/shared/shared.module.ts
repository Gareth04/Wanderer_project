import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SecHeaderComponent } from './sec-header/sec-header.component';
import { CardsComponent } from './cards/cards.component';
import { TerHeaderComponent } from './ter-header/ter-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SecHeaderComponent,
    CardsComponent,
    TerHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SecHeaderComponent,
    TerHeaderComponent,
    CardsComponent
  ]
})
export class SharedModule { }
