import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HackatonService {
    baseUrl: string = 'https://hackcell.herokuapp.com/';
    constructor(private httpClient: HttpClient) { }

    getCountries() {
        return this.httpClient.get(`${this.baseUrl}countries/list`);
    }

    getHostilCountries() {
        return this.httpClient.get(`${this.baseUrl}hostile_countries/list`);
    }

    createHostilCountries(data) {
        return this.httpClient.post(`${this.baseUrl}hostile_countries/create`, data);
    }
}