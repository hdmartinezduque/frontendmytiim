import { ResponseData } from '../../interfaces/http-request';
import { LoginRequest, User } from '../login/login';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { PutParams } from 'src/app/shared/interfaces/http-request';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

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
          const token: string = response.data?.token || ''
          this.userService.setToken(token);
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('userId', userId)
          sessionStorage.setItem('statusId', status)
        }
        
        return response;
      })
    )
  }
 
  updatePassword(request: PutParams): Observable<ResponseData> {
    return this.http.put(request).pipe(
      map((response: any) => {
        sessionStorage.getItem('userId')
        console.log("response:", response)
        return response;
      })
    )
  }

  logout(): void {
    sessionStorage.clear();
  }

}
