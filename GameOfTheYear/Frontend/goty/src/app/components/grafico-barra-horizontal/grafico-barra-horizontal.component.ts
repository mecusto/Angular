import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IGame } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnInit, OnDestroy {

  @Input() results: IGame[] = [];


  // dimensiones
Ç

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  interval;

  constructor() {
    // this.interval = setInterval(() => this.changeRandomly(), 1000);

  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // changeRandomly() {
  //   console.log(this.results);
  //   const newResults = [...this.results];
  //   console.log(newResults);
  //   console.log(newResults[0].value);

  //   // tslint:disable-next-line: forin
  //   for (const i in newResults) {
  //     newResults[i].value = Math.round(Math.random() * 500);
  //   }

  //   this.results = [...newResults];
  // }

}
