import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConexaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConexaoProvider {
  server: string = "http://haquasystems.net";
  baseUrl: string;

  constructor(public http: Http ) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({'Content-Type': 'application/json; charset=UTF-8'});
      
      this.http.post(this.server + type, JSON.stringify(credentials), {headers: headers})
    // Call map on the response observable to get the parsed object.
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    });
    });

  }

}