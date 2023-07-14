import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { Observable } from 'rxjs';
import { ViewPercentages } from '../../interfaces/charts/charts.interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpRequestService) { }

  public percentageUserPeriodObjectivesCSV(periodId: string | undefined) {
    return this.http.get({
      endpoint: 'indicators/downloadObjective-csv/'+periodId,
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public percentageUserPeriodCommitmentsCSV(periodId: string | undefined) {
    return this.http.get({
      endpoint: 'indicators/downloadCommitment-csv/'+periodId,
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  public percentageUserPeriodTracingCSV(periodId: string | undefined) {
    return this.http.get({
      endpoint: 'indicators/downloadPollContinues-csv/'+periodId,
      responseType: 'blob' as 'json',
      getCompleteResponse: true,
    });
  }

  // public percentageUserPeriodEndCSV() {
  //   return this.http.get({
  //     endpoint: '',
  //     responseType: 'blob' as 'json',
  //     getCompleteResponse: true,
  //   });
  // }

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
      endpoint: 'indicators/pollContinues/' + (period ? period : '1'),
    });
  }

  public viewPercentagesPeriodEnd(
    period?: string
  ): Observable<ViewPercentages> {
    return this.http.get({
      endpoint: 'indicators/closedPeriod/' + (period ? period : '1'),
    });
  }
}
