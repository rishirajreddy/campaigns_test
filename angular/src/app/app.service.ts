import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class AppService{
    url = "http://localhost:3000"

    campaignListener = new Subject<null>();
    searchText = new Subject<any>();

    constructor(private http:HttpClient){}

    getAllCampaignsListener(){
        this.campaignListener.next(null);
    }

    getProducts(){
        return this.http.get(`${this.url}/get_products`);
    }

    getServices(){
        return this.http.get(`${this.url}/get_services`);
    }

    createCampaign(camp:any){
        return this.http.post(`${this.url}/add`, camp);
    }

    getAllCampaigns(){
        return this.http.get(`${this.url}/get_all`);
    }

    deleteCampaign(id:number){
        return this.http.delete(`${this.url }/delete/${id}`);
    }

    getCampaign(id:number){
        return this.http.get(`${this.url}/get_campaign/${id}`);
    }
}