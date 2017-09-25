import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';


@Injectable()
export class FormService {
  public jwtToken: String;
  constructor(private http: Http) { 
    const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
        this.jwtToken = theUser.token;
    }
  }

  public formSave(form: Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`http://localhost:2017/api/formsave`, JSON.stringify({form: form}), options)
      .map((response: Response) => response.json())
  }

  public getForms() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://localhost:2017/api/getforms`, options)
    .map((response: Response) => response.json())
  }

  public getForm(id: String) {
    let headers = new Headers ({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(`http://localhost:2017/form/${id}`, options)
      .map((response: Response) => response.json())
  }
}
