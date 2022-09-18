import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-campaign-box',
  templateUrl: './campaign-box.component.html',
  styleUrls: ['./campaign-box.component.css']
})
export class CampaignBoxComponent implements OnInit {
  
  searchText = "";
  dataSource!:MatTableDataSource<string>;
  
  sendData(value:string){
    this.searchText = value.trim().toLowerCase();
    return this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  constructor(private service:AppService) { }

  ngOnInit(): void {
  }

}
