import { ResponseData } from '../../interfaces/http-request';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { PutParams } from 'src/app/shared/interfaces/http-request';
import { UserService } from '../user/user.service';
import { LoginRequest } from '../../interfaces/login/login';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  previousRoute: string = '';

  constructor(
    private http: HttpRequestService,
    private userService: UserService
  ) { }

  login(body: LoginRequest): Observable<ResponseData> {
    return this.http.post({endpoint: 'auth/login', body, getCompleteResponse: true, headers: {}}).pipe(
      map((response: any) => {
        if (response.data) {
          const userId: string = response.data?.userId?.toString() || ''
          const status: string = response.data?.status.statusId?.toString() || ''
          const token: string = response.data?.token || '';
          const userName: string = response.data?.userName;
          this.userService.setToken(token);
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('userId', userId)
          sessionStorage.setItem('statusId', status)
          sessionStorage.setItem('userName', userName)
        }
        
        return response;
      })
    )
  }
 
  updatePassword(request: PutParams): Observable<ResponseData> {
    return this.http.put(request).pipe(
      map((response: any) => {
        sessionStorage.getItem('userId')
        return response;
      })
    )
  }

  logout(): void {
    // const {
    //   host, hostname, href, origin, pathname, port, protocol, search
    // } = window.location
    const previousRoute =  window.location.pathname
    this.setPreviousRoute(previousRoute);
    sessionStorage.clear();
  }

  setPreviousRoute(previousRoute: string): void {
    this.previousRoute = previousRoute;
  }

  getPreviousRoute(): string {
    return this.previousRoute;
    
  }

}
