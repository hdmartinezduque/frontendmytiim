import { HeadersConfig, PutParams, ResponseData } from '../../interfaces/http-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map } from 'rxjs';
import { GetParams, PostParams, ErrorServicio, DeleteParamas } from '../../interfaces/http-request';
import { environment as env } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(
    protected http: HttpClient
  ) { }


  getHeaders(): HeadersConfig {
    const token = sessionStorage.getItem('token')
    const dominio = `${env.MAIN_URL}/mytiim/api/`;
    const headersConf = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
      // 'Authorization': ''
    };
    return {dominio, headersConf}
  }

  get(requestParams: GetParams): Observable<any> {
    const {dominio, headersConf} = this.getHeaders();
    const headers = new HttpHeaders(requestParams?.headers || headersConf);
    const urlComplete = requestParams.isPublicRoute ? requestParams.endpoint : `${dominio}${requestParams.endpoint}`;
    return this.http
      .get(urlComplete, {
        headers,
        params: this.getHttpParams(requestParams.params || {})
      })
      .pipe(map((response: ResponseData | any) => requestParams.getCompleteResponse ? response : response.data ))
      .pipe(catchError((error) => this.processError(error)));
  }

  getStatus(requestParams: GetParams): Observable<any> {
    const {dominio, headersConf} = this.getHeaders();
    const headers = new HttpHeaders(requestParams?.headers || headersConf);
    const urlComplete = requestParams.isPublicRoute ? requestParams.endpoint : `${dominio}${requestParams.endpoint}`;
    return this.http
      .get(urlComplete, {
        headers,
        params: this.getHttpParams(requestParams.params || {})
      })
      // .pipe(map((response: responseData | any) => response.data ))
      .pipe(catchError((error) => this.processError(error)));
  }

  post(requestParams: PostParams): Observable<any> {
      const {dominio, headersConf} = this.getHeaders();
      const headers = new HttpHeaders(requestParams?.headers || headersConf);
      const urlComplete = requestParams.isPublicRoute ? requestParams.endpoint : `${dominio}${requestParams.endpoint}`;
      return this.http
        .post(urlComplete, requestParams.body, { headers })
        .pipe(map((response: ResponseData | any) => requestParams.getCompleteResponse ? response : response.data ))
        .pipe(catchError((error) => this.processError(error)));
  }

  put(requestParams: PutParams): Observable < any > {
    const {dominio, headersConf} = this.getHeaders();
    const headers = new HttpHeaders(requestParams?.headers || headersConf);
    const urlComplete = requestParams.isPublicRoute ? requestParams.endpoint : `${dominio}${requestParams.endpoint}`;
    return this.http
      .put(urlComplete, requestParams.body, { headers })
      .pipe(map((response: ResponseData | any) => requestParams.getCompleteResponse ? response : response.data ))
      .pipe(catchError((error) => this.processError(error)));
  }

  processError(error: ErrorServicio) {
      const httpMessageError = {
        errorProtocolo: 'Ocurrió un error con la conexión, por favor, verifica la conexión de internet e intentalo de nuevo'
      };
      const errorProcesado = error.error?.mensajeError ? error.error?.mensajeError : httpMessageError.errorProtocolo;

      return throwError(errorProcesado);
  }

  delete (requestParams: DeleteParamas): Observable < any > {
      const {dominio, headersConf} = this.getHeaders();
      const headers = new HttpHeaders(requestParams?.headers || headersConf);
      const urlComplete = requestParams.isPublicRoute ? requestParams.endpoint : `${dominio}${requestParams.endpoint}`;
      return this.http
        .delete(urlComplete, {
          headers,
        })
        .pipe(catchError((error) => this.processError(error)));
  }

  private getHttpParams(params: { [key: string]: any }): HttpParams {
    if (params) {
      let httpParams = new HttpParams();

      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => (httpParams = httpParams.append(key, value)));
        } else if (params[key] !== null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });

      return httpParams;
    }
    return {} as HttpParams;
  }

}
