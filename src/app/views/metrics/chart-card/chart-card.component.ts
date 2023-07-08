import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  ChartCardData,
  ChartData,
  ChartFilter,
  FilterSelectData,
  bgPluginColor,
} from 'src/app/shared/interfaces/charts/charts.interface';
import { CHART_LINE_CONFIG } from '../constants/metrics.contants';
@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent {
  @Input() chartCardData!: ChartCardData;

  @Input() searchCategories?: FilterSelectData[] = [];
  @Input() chartData!: ChartConfiguration['data'];
  @Input() multiple?: boolean;

  @Output() searchData = new EventEmitter<ChartFilter>();
  @Output() downLoadFile = new EventEmitter<ChartCardData>();

  public categoriesFilter: FilterSelectData[] = [];
  public barChartLegend = true;
  public barChartPlugins = [bgPluginColor, ChartDataLabels];
  barChartOptions: ChartConfiguration['options'] = CHART_LINE_CONFIG;

  constructor(private fb: FormBuilder) {}
  filtersForm: FormGroup = this.fb.group({
    filters: [null],
  });

  search() {
    const filters =
      this.filtersForm.value.filters == null
        ? []
        : this.filtersForm.value.filters.length
        ? this.filtersForm.value.filters.map((filter: FilterSelectData) => {
            return filter.key;
          })
        : [this.filtersForm.value.filters.key];
    this.searchData.emit({
      table: this.chartCardData.table,
      type: this.chartCardData.type,
      lapses: filters,
    });
  }

  downloadFile() {
    const filters =
      this.filtersForm.value.filters == null
        ? []
        : this.filtersForm.value.filters.length
        ? this.filtersForm.value.filters.map((filter: FilterSelectData) => {
            return filter.key;
          })
        : [this.filtersForm.value.filters.key];

    if(filters[0] == undefined){
      filters[0] = 0;
    }
    
    this.chartCardData.periodId = filters[0];
    this.downLoadFile.emit(this.chartCardData);
  }
}
