import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public url: string = '';
  public tokenUser: any;
  public headers: any;

  constructor(private _http: HttpClient) {
    this.gettoken();

    this.url = environment.urlBack;

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.tokenUser);
  }

  /**
   *
   * @param user
   * @param gettoken
   * @returns
   */

  login(user: any, gettoken = null): Observable<any> {
    return this._http.post(this.url + 'admin_login', user, {
      headers: this.headers,
    });
  }

  /**
   * Metodo que estare del local stogare el item token
   * @returns retorna el token
   */
  gettoken() {
    this.tokenUser = localStorage.getItem('token');

    return this.tokenUser;
  }

  public isAuthenticated(allowRoles: string[]): boolean {
    var token = localStorage.getItem('token');

    if (!token) {
      return false;
    } else {
      try {
        const helper = new JwtHelperService();
        var decodedToken = helper.decodeToken(token);

        if (!decodedToken) {
          localStorage.removeItem('token');
          return false;
        }
      } catch (error) {
        localStorage.removeItem('token');
        return false;
      }

      return allowRoles.includes(decodedToken['rol']);
    }
  }

  //------------------------------------------------------
  //------------ Metodo get Post Delete update -----------
  //------------------------------------------------------

  /**
   * Metodo global que permite realizar una peticion get al backend
   * @param rute: string , complemento de la ruta que se desea enviar
   * @returns retorna los datos a consultar
   */
  public getData(rute: string): Observable<any> {
    return this._http.get(this.url + '/' + rute, { headers: this.headers });
  }

  /**
   * Metodo global que permite realizar filtros una peticion get al backend
   * @param rutes: string , complemento de la ruta que se desea enviar
   * @returns retorna los datos a consultar
   */
  public filterData(tipo?: string, filtro?: string): Observable<any> {
    if (tipo == null || tipo == 'null' || tipo == '') {
      return this._http.get(this.url + 'filter_client' + '/null/' + 'null', {
        headers: this.headers,
      });
    } else {
    }

    return this._http.get(this.url + '/filter_client/' + tipo + '/' + filtro, {
      headers: this.headers,
    });
  }

  /**
   *
   * @param data
   * @param url
   * @returns
   */
  public registerData(data: any, url: string): Observable<any> {
    return this._http.post(this.url + url, data, {
      headers: this.headers,
    });
  }

  /**
   *
   * @param data
   * @param url
   * @returns
   */
  public updateData(data: any, url: string): Observable<any> {
    return this._http.put(this.url + url, data, { headers: this.headers });
  }

  /**
   * 
   * @param id
   * @param url
   * @returns
   */
  public deleteData(id: string, url: string): Observable<any> {
    console.log(this.url + url + '/' + id);

    return this._http.delete(this.url + url + '/' + id, {
      headers: this.headers,
    });
  }
}
