import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaignsArr:any = [];

  platforms:any = [
    {name:"fb", image: "../../assets/images/facebook.svg"},
    {name:"google", image: "../../assets/images/google.svg"},
    {name:"instagram", image: "../../assets/images/instagram.svg"},
    {name:"youtube", image: "../../assets/images/youtube.svg"},
  ]

  constructor(private service:AppService,public dialog: MatDialog) { }

  getCampNotifier:Subscription = this.service.campaignListener
      .subscribe({
        next: (notifier) => {
          this.onGettingAllCampaigns();
        }
      })
      
  ngOnInit(): void {
    this.onGettingAllCampaigns();
  }
  displayedColumns: string[] = ['select', 'on_off', 'campaign', 'date', 'clicks', 'budget', 'location', 'platform', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  platformImg!:string;
  searchText = ""

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // applyFilter(){
  //   this.dataSource.filter = this.searchText.trim().toLowerCase();
  // }

  // getSearchValue(){
  //   return this.service.searchText.subscribe({next:(v) => {
  //     this.searchText = v;
  //     this.dataSource.filter = this.searchText.trim().toLowerCase();
  //     console.log(v)}
  //   })
  // }

  onGettingAllCampaigns(){
    return this.service.getAllCampaigns()
      .subscribe({
        next:(v:any) => {
          this.dataSource = v;
          this.campaignsArr = v;
          console.log(this.dataSource);
        }
      })
  }

  platformSelect(platform:string){
    let platImg = "";
    if(platform === "google"){
       platImg = "../../../assets/images/google.svg";
    }
    else if(platform === 'fb'){
      platImg = "../../../assets/images/facebook.svg";
    }
    else if(platform === 'youtube'){
      platImg = "../../../assets/images/youtube.svg";
    }else {
      platImg = "../../../assets/images/instagram.svg";
    }
    return platImg;
  }

  onDeleteCampaign(id:number){
    this.service.deleteCampaign(id)
      .subscribe({
        next:(v:any) => {
          console.log(v);
          this.onGettingAllCampaigns();
        }
      })
  }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: id,
    });
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: string) {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    // }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.on/off + 1}`;
  }

}



@Component({
  selector: "app-delete-box-component",
  templateUrl: "./delete-box.component.html"
})

export class DeleteBoxComponent implements OnInit{

  campaignName!:string;

  constructor(
    private service:AppService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number){}

    ngOnInit(): void {
      this.onGetCampaign();        
    }

    onGetCampaign(){
      return this.service.getCampaign(this.data)
        .subscribe({
          next:(v:any) => {
            this.campaignName = v.campaign;
            console.log(v);
          }
        })
    }

    onGetAllCampaigns(){
      return this.service.getAllCampaigns()
        .subscribe({
          next:(v) => {
            console.log(v);
          }
        })
    }


    deleteCampaign(){
      this.service.deleteCampaign(this.data)
        .subscribe({
          next:(v) => {
            console.log(v);
            this.service.getAllCampaignsListener();
            this.openSnackBar("Campaign Deleted", "cancel");
            this.onNoClick();
          }
        })
    }

    openSnackBar(message:string, action:string) {
      this._snackBar.open(message, action, {
        horizontalPosition: 'center',
        verticalPosition: "top",
        duration: 3*1000,
        panelClass: "delete-success"
      });
    }

    onNoClick(){
      this.dialogRef.close();
    }
    
}