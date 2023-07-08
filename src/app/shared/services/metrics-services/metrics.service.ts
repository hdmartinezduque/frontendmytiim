import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { Observable } from 'rxjs';
import { ViewPercentages } from '../../interfaces/charts/charts.interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpRequestService) { }

  public percentageUserPeriodObjectivesCSV() {
    return this.http.get({
      endpoint: 'indicators/download-csv',
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public percentageUserPeriodCommitmentsCSV() {
    return this.http.get({
      endpoint: 'indicators/downloadCommitment-csv/1',
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public percentageUserPeriodTracingCSV() {
    return this.http.get({
      endpoint: '',
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public percentageUserPeriodEndCSV() {
    return this.http.get({
      endpoint: '',
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public viewPercentagesPeriodCommitments(
    period?: string
  ): Observable<ViewPercentages> {
    return this.http.get({
      endpoint: 'indicators/commitment/' + (period ? period : '1'),
    });
  }

  public viewPercentagesPeriodObjective(
    period?: string
  ): Observable<ViewPercentages> {
    return this.http.get({
      endpoint: 'indicators/objectives/' + (period ? period : '1'),
    });
  }

  public viewPercentagesPeriodTracing(
    period?: string
  ): Observable<ViewPercentages> {
    return this.http.get({
      endpoint: '' + (period ? period : '1'),
    });
  }

  public viewPercentagesPeriodEnd(
    period?: string
  ): Observable<ViewPercentages> {
    return this.http.get({
      endpoint: '' + (period ? period : '1'),
    });
  }
}