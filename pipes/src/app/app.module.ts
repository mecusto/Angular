import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
// import { LOCALE_ID } from '@angular/core';
import localEs from '@angular/common/locales/es';
import localFr from '@angular/common/locales/fr';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { CapitalizadodomSeguroPipe } from './pipes/capitalizadodom-seguro.pipe';
import { ContrasenaPipe } from './pipes/contrasena.pipe';

// the second parameter 'fr-FR' is optional
registerLocaleData(localEs);
registerLocaleData(localFr);

@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    CapitalizadodomSeguroPipe,
    ContrasenaPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
