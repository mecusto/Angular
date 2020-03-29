import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeResourceUrl {
    const URL = 'https://open.spotify.com/embed/track/';
    return this.domSanitizer.bypassSecurityTrustResourceUrl(URL + value);
  }

}
