import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { MetricsComponent } from './metrics.component';
import { MetricsRoutingModule } from './metrics-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartCardComponent, MetricsComponent],
  imports: [
    CommonModule,
    MetricsRoutingModule,
    MaterialModule,
    SharedModule,
    NgChartsModule,
  ],
})
export class MetricsModule {}
