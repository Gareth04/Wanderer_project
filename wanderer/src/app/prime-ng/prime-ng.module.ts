import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CarouselModule,
    ImageModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule
  ]
  
})
export class PrimeNgModule { }
