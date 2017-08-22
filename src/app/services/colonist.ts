import { Injectable } from '@angular/core';
import { Colonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService {
    aliensUrl = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

    constructor(private http: Http) {

    }

    getAliens(): Promise<Colonist[]> {
        return this.http.get(this.aliensUrl)
                .toPromise()
                .then((response) => response.json().colonists)
                .catch(this.handleError);
    }

    handleError(error) {
        console.log(error);
        return Promise.reject(error.message || error);
    }
}

