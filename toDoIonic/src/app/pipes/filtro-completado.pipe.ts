import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false // hay que ponerlo en false para que se detecte el cambio fuera del componente donde se hace el cambio
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], ended: boolean = true): Lista[] {

    return listas.filter(lista => lista.ended === ended);

  }

}
