import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ListingService {
    constructor(private http: HttpClient) {
        
    }
    getTableData() {
        let url = "https://zuper.free.beeceptor.com/jobs";
        url = './../../assets/jobs.json'
        return this.http.get(url);
    }
    getTableHeaders() {
        let url = "https://zuper.free.beeceptor.com/jobs/meta";
        url = './../../assets/meta.json'
        return this.http.get(url);
    }
}