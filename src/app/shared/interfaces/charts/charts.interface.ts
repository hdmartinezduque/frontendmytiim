import { ChartConfiguration } from 'chart.js';

export interface ChartFilter {
  table: string;
  type: string;
  lapses: string[];
}
export interface FilterSelectData {
  name: string;
  key: string;
}

export interface ChartData {
  labels: string[];
  datasets: { data: number[]; label: string }[];
}

export interface ViewPercentages {
  totalUsers: number;
  percentageCreated: number;
  percentageNoCreated: number;
  periodId?: string;
}

export interface ChartCardData {
  title: string;
  table: string;
  type: string;
  periodId?: string;
}

export interface ChartCardParentInfo {
  chartcardData: ChartCardData;
  chartDataLabels: ChartConfiguration['data'];
  type: string;
  multiple?: boolean;
}

export const bgPluginColor = {
  id: 'BackGroundPluginColor',
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
