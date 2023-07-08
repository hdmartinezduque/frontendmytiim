import { Component } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Observable, filter } from 'rxjs';
import {
  ChartCardData,
  ChartCardParentInfo,
  ChartFilter,
  FilterSelectData,
  ViewPercentages,
} from 'src/app/shared/interfaces/charts/charts.interface';
import { Period } from 'src/app/shared/interfaces/survey/survey';
import { CloseSurveyService } from 'src/app/shared/services/closeSurvey/close-survey.service';
import {
  BASE_CARDS,
  BASE_CHART_COLORS,
  CARDS_TABLES_INFO,
} from './constants/metrics.contants';
import { MetricsService } from 'src/app/shared/services/metrics-services/metrics.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent {
  chartCards: ChartCardParentInfo[] = BASE_CARDS;
  public periods$: Observable<Array<Period>> | undefined;
  public viewPercentage$: Observable<ViewPercentages> | undefined;
  public periodsMapList?: Array<FilterSelectData>;
  public showCards: boolean = false;

  constructor(
    private periodSurveyService: CloseSurveyService,
    private metricsService: MetricsService
  ) { }

  ngOnInit(): void {
    this.periods$ = this.periodSurveyService.getPeriods();
    this.periods$.subscribe((response) => {
      this.periodsMapList = response.map((period) => {
        return { name: period.describe, key: period.periodId.toString() };
      });
      this.showCards = true;
    });

    this.searchByLapses({
      table: 'users',
      type: 'create-objetives',
      lapses: [],
    });

    this.searchByLapses({
      table: 'objectives',
      type: 'resolve-objectives',
      lapses: [],
    });

    this.searchByLapses({
      table: 'tracing',
      type: 'continuous-monitoring',
      lapses: [],
    });

    this.searchByLapses({
      table: 'period',
      type: 'period-end',
      lapses: [],
    });
  }

  searchByLapses(filters: ChartFilter) {
    const data = this.chartCards.find(
      (card) =>
        card.chartcardData.table == filters.table &&
        card.chartcardData.type == filters.type
    );
    if (data) {
      const index = this.chartCards.findIndex((item) => item == data);

      if (filters.table == 'users' && filters.type == 'create-objetives') {
        this.filterUserCreateObjetives(filters, index);
      }

      if (filters.table == 'objectives' && filters.type == 'resolve-objectives') {
        this.filterCommitmentsObjetives(filters, index);
      }

      if (filters.table == 'tracing' && filters.type == 'continuous-monitoring') {
        this.filterContinuousTracing(filters, index);
      }

      if (filters.table == 'period' && filters.type == 'period-end') {
        this.filterContinuousTracing(filters, index);
      }
    }
  }

  filterUserCreateObjetives(filters: ChartFilter, index: number) {
    if (index == -1) {
      return;
    }
    const lapseName =
      this.periodsMapList && this.periodsMapList.length > 0
        ? this.periodsMapList.find((period) => period.key == filters.lapses[0])
          ?.name
        : '';
    this.viewPercentage$ = this.metricsService.viewPercentagesPeriodObjective(
      filters.lapses.length == 0 ? undefined : filters.lapses[0]
    );
    this.viewPercentage$.subscribe((res) => {
      const chartDataLabels = {
        labels: ['% Objetivos creados', '% Objetivos no creados'],
        datasets: [
          {
            data: [
              parseFloat(res.percentageCreated.toFixed(2)),
              parseFloat(res.percentageNoCreated.toFixed(2)),
            ],
            label:
              filters.lapses.length != 0 && lapseName && lapseName != ''
                ? lapseName
                : this.periodsMapList && this.periodsMapList.length > 0
                  ? this.periodsMapList[this.periodsMapList.length - 1].name
                  : 'Sin Periodos Disponibles',
            backgroundColor: BASE_CHART_COLORS.BLUE,
          },
        ],
      };
      this.chartCards[index].chartDataLabels = chartDataLabels;
    });
  }

  filterCommitmentsObjetives(filters: ChartFilter, index: number) {
    if (index == -1) {
      return;
    }
    const lapseName =
      this.periodsMapList && this.periodsMapList.length > 0
        ? this.periodsMapList.find((period) => period.key == filters.lapses[0])
          ?.name
        : '';
    this.viewPercentage$ = this.metricsService.viewPercentagesPeriodCommitments(
      filters.lapses.length == 0 ? undefined : filters.lapses[0]
    );
    this.viewPercentage$.subscribe((res) => {
      const chartDataLabels = {
        labels: ['% Compromisos cumplidos', '%  Compromisos no cumplidos'],
        datasets: [
          {
            data: [
              parseFloat(res.percentageCreated.toFixed(2)),
              parseFloat(res.percentageNoCreated.toFixed(2)),
            ],
            label:
              filters.lapses.length != 0 && lapseName && lapseName != ''
                ? lapseName
                : this.periodsMapList && this.periodsMapList.length > 0
                  ? this.periodsMapList[this.periodsMapList.length - 1].name
                  : 'Sin Periodos Disponibles',
            backgroundColor: BASE_CHART_COLORS.BLUE,
          },
        ],
      };
      this.chartCards[index].chartDataLabels = chartDataLabels;
    });
  }

  filterContinuousTracing(filters: ChartFilter, index: number) {
    if (index == -1) {
      return;
    }
    const lapseName =
      this.periodsMapList && this.periodsMapList.length > 0
        ? this.periodsMapList.find((period) => period.key == filters.lapses[0])
          ?.name
        : '';
    this.viewPercentage$ = this.metricsService.viewPercentagesPeriodTracing(
      filters.lapses.length == 0 ? undefined : filters.lapses[0]
    );
    this.viewPercentage$.subscribe((res) => {
      const chartDataLabels = {
        labels: ['% Seguimientos continuos creados', '% Seguimientos continuos no creados'],
        datasets: [
          {
            data: [
              parseFloat(res.percentageCreated.toFixed(2)),
              parseFloat(res.percentageNoCreated.toFixed(2)),
            ],
            label:
              filters.lapses.length != 0 && lapseName && lapseName != ''
                ? lapseName
                : this.periodsMapList && this.periodsMapList.length > 0
                  ? this.periodsMapList[this.periodsMapList.length - 1].name
                  : 'Sin Periodos Disponibles',
            backgroundColor: BASE_CHART_COLORS.BLUE,
          },
        ],
      };
      this.chartCards[index].chartDataLabels = chartDataLabels;
    });
  }

  filterPeriodEnd(filters: ChartFilter, index: number) {
    if (index == -1) {
      return;
    }
    const lapseName =
      this.periodsMapList && this.periodsMapList.length > 0
        ? this.periodsMapList.find((period) => period.key == filters.lapses[0])
          ?.name
        : '';
    this.viewPercentage$ = this.metricsService.viewPercentagesPeriodEnd(
      filters.lapses.length == 0 ? undefined : filters.lapses[0]
    );
    this.viewPercentage$.subscribe((res) => {
      const chartDataLabels = {
        labels: ['% Cierres de periodo creados', '% Cierres de periodo no creados'],
        datasets: [
          {
            data: [
              parseFloat(res.percentageCreated.toFixed(2)),
              parseFloat(res.percentageNoCreated.toFixed(2)),
            ],
            label:
              filters.lapses.length != 0 && lapseName && lapseName != ''
                ? lapseName
                : this.periodsMapList && this.periodsMapList.length > 0
                  ? this.periodsMapList[this.periodsMapList.length - 1].name
                  : 'Sin Periodos Disponibles',
            backgroundColor: BASE_CHART_COLORS.BLUE,
          },
        ],
      };
      this.chartCards[index].chartDataLabels = chartDataLabels;
    });
  }

  downloadFile(data: ChartCardData) {

    if (data.table == 'users' && data.type == 'create-objetives') {
      this.metricsService
        .percentageUserPeriodObjectivesCSV()
        .subscribe((res) => {
          const blob = new Blob([res], { type: 'application/csv' });

          const downloadURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${data.title}.csv`;
          link.click();
        });
    }

    if (
      data.table == 'period' && data.type == 'resolve-objectives') {
      this.metricsService
        .percentageUserPeriodCommitmentsCSV()
        .subscribe((res) => {
          const blob = new Blob([res], { type: 'application/csv' });

          const downloadURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${data.title}.csv`;
          link.click();
        });
    }

    if (
      data.table == 'tracing' && data.type == 'continuous-monitoring') {
      this.metricsService
        .percentageUserPeriodTracingCSV()
        .subscribe((res) => {
          const blob = new Blob([res], { type: 'application/csv' });

          const downloadURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${data.title}.csv`;
          link.click();
        });
    }

    if (
      data.table == 'period' && data.type == 'period-end') {
      this.metricsService
        .percentageUserPeriodEndCSV()
        .subscribe((res) => {
          const blob = new Blob([res], { type: 'application/csv' });

          const downloadURL = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = `${data.title}.csv`;
          link.click();
        });
    }

  }
}
