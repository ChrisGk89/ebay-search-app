import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {

    url: string;
    constructor(private http: Http) {
        this.url = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=NCSU99862-ca6c-48c3-b2e9-39d77d1d037' +
        '&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&GLOBAL-ID=EBAY-US&siteid=0';
    }

    search(term: string, entriesPerPage?: number): Observable<any[]> {
        const headers  = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        const options = new RequestOptions({headers: headers});

        if (entriesPerPage === undefined) {
            entriesPerPage = 100;
        }
        this.url += '&REST-PAYLOAD&keywords=' + term + '&paginationInput.entriesPerPage=' + entriesPerPage;
        return this.http.get(this.url, options)
        .map(response => response.json().findItemsByKeywordsResponse as any[]);
    }

}
