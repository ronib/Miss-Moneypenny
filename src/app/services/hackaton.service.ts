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

    getImageCategories() {
        return this.httpClient.get(`${this.baseUrl}image-categories/all`);
    }

    getHostilImages() {
        return this.httpClient.get(`${this.baseUrl}image-categories/list`);
    }

    createHostilImages(data) {
        return this.httpClient.post(`${this.baseUrl}image-categories/create`, data);
    }

    getHostilWatchlists() {
        return this.httpClient.get(`${this.baseUrl}watchlist/list`);
    }

    createHostilWatchlists(data) {
        return this.httpClient.post(`${this.baseUrl}watchlist/create`, data);
    }

    getHostilContacts() {
        return this.httpClient.get(`${this.baseUrl}identifiers/list`);
    }

    createHostilContacts(data) {
        return this.httpClient.post(`${this.baseUrl}identifiers/create`, data);
    }
}