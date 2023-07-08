import { ChartConfiguration } from 'chart.js';
import { ChartCardParentInfo } from 'src/app/shared/interfaces/charts/charts.interface';

export const CARDS_TABLES_INFO = {
  USERS: 'users',
  OBJETIVES: 'objectives',
  TRACING: 'tracing',
  PERIOD: 'period',
};

export const BASE_CARDS: ChartCardParentInfo[] = [
  {
    chartcardData: {
      title: 'Usuarios con objetivos creados',
      table: CARDS_TABLES_INFO.USERS,
      type: 'create-objetives',
    },
    chartDataLabels: {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: '#4888FF',
        },
      ],
    },
    type: 'bar',
    multiple: false,
  },
  {
    chartcardData: {
      title: 'Compromisos resueltos por periodos',
      table: CARDS_TABLES_INFO.OBJETIVES,
      type: 'resolve-objectives',
    },
    chartDataLabels: {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: '#4888FF',
        },
      ],
    },
    type: 'bar',
    multiple: false,
  },
  {
    chartcardData: {
      title: 'Encuestas de seguimiento continuo realizadas',
      table: CARDS_TABLES_INFO.TRACING,
      type: 'continuous-monitoring',
    },
    chartDataLabels: {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: '#4888FF',
        },
      ],
    },
    type: 'bar',
    multiple: false,
  },
  {
    chartcardData: {
      title: 'Encuestas de cierre del periodo realizadas',
      table: CARDS_TABLES_INFO.PERIOD,
      type: 'period-end',
    },
    chartDataLabels: {
      labels: [],
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: '#4888FF',
        },
      ],
    },
    type: 'bar',
    multiple: false,
  },
];

export const BASE_CHART_COLORS = {
  BLUE: '#4888FF',
  GREEN: '',
  MIND_GREEN: '',
};

export const CHART_LINE_CONFIG: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: 'center',
      position: 'bottom',
      labels: {
        usePointStyle: true,
      },
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      formatter: (value) => {
        return value + ' %';
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      suggestedMax: 105,
    },
  },
};
