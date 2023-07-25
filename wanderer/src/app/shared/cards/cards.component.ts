import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WandererService } from 'src/app/wanderer/services/wanderer.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  constructor(private wandererServices:WandererService, private router: Router){}
  seleccionarTipo(tipo: string){
    const stateObject = { tipo: tipo };
    this.router.navigateByUrl('/selecDestino', { state: stateObject });
  }
}
