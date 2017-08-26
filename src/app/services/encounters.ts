import { Injectable } from '@angular/core';
import { Report, NewReport } from '../models/report';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EncountersService {
    encountersUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

    constructor(private http: Http) {

    }

    getEncounters(): Promise<Report[]> {
        return this.http.get(this.encountersUrl)
                .toPromise()
                .then((response) => response.json().encounters)
                .catch(this.handleError);
    }

    reportEncounters(report:NewReport): Promise<Report[]> {
        let headers = new Headers({"Content_Type":"application/json"});
        let body = JSON.stringify({report});
        return this.http.post(this.encountersUrl, body, {headers:headers})
                .toPromise()
                .then((response) => response.json().encounters)
                .catch(this.handleError);
    }

    handleError(error) {
        console.log(error);
        return Promise.reject(error.message || error);
    }
}

