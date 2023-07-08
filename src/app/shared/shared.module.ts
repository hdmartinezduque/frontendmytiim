import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatCardModule } from '@angular/material/card';
import { PresentationComponent } from './components/presentation/presentation.component';
import { GetMetricaDescriptionPipe } from './pipe/getMetricaDescription/get-metrica-description.pipe';
import { PaginatorCardDatePipe } from './pipe/paginatorCardDate/paginator-card-date.pipe';
import { ValidateFechaCumplimientoPipe } from './pipe/validateFechaCumplimiento/validate-fecha-cumplimiento.pipe';
import { ValidateRiskDatetoAchivePipe } from './pipe/validateRiskDatetoAchive/validate-risk-dateto-achive.pipe';

import { ChooseRecognitionPipe } from './chooseRecognition/choose-recognition.pipe';
import { NgChartsModule } from 'ng2-charts';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    AlertComponent,
    PresentationComponent,
    GetMetricaDescriptionPipe,
    PaginatorCardDatePipe,
    ValidateFechaCumplimientoPipe,
    ValidateRiskDatetoAchivePipe,
    ChooseRecognitionPipe,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, MaterialModule, MatCardModule],
  exports: [
    SidenavComponent,
    ToolbarComponent,
    AlertComponent,
    PresentationComponent,
    GetMetricaDescriptionPipe,
    PaginatorCardDatePipe,
    ValidateFechaCumplimientoPipe,
    ValidateRiskDatetoAchivePipe,
    ChooseRecognitionPipe,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
