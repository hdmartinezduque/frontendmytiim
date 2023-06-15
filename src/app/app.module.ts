import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationComponent } from './views/configuration/configuration.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/modules/material.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MainComponent } from './main/main.component';




@NgModule({
    declarations: [
        AppComponent,
        ConfigurationComponent,
        InicioSesionComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        MaterialModule,
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
