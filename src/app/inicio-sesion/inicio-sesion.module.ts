
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material.module';
import { InicioSesionComponent } from './inicio-sesion.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioSesionRoutingModule } from './inicio-sesion-routing.module';

@NgModule({
  declarations: [
    InicioSesionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    InicioSesionRoutingModule
  ]
  
})
export class InicioSesionModule { }