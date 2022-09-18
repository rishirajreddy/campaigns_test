import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

interface Product {
  id:string,
  product:string,
  price:string,
  image:string
}

interface Service {
  id:string,
  service:string,
  description:string,
  icon:string,
  platform:string
}

interface Campaign {
  id:string,
  campaign:string,
  platform:string
}

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  newArray:any = [
    {id:1,image:"../../assets/images/cake-1.jpg"},
    {id:2, image:"../../assets/images/cake-2.jpg"},
    {id:3,image:"../../assets/images/cake-3.jfif"},
    {id:4,image:"../../assets/images/cake-4.jfif"},
  ];

  platforms:any = [
    {name:"fb", image: "../../assets/images/facebook.svg"},
    {name:"google", image: "../../assets/images/google.svg"},
    {name:"instagram", image: "../../assets/images/instagram.svg"},
    {name:"youtube", image: "../../assets/images/youtube.svg"},
  ]

  @ViewChild('stepper') stepper!: MatStepper;
  
  value = 100;
  value2 = 0;
  start_date = "";
  end_date = "";
  location!:string;
  campaignImg!:string;

  modesArray = [
    'What you want to do?',
    'Choose Product',
    'Campaign Settings',
    'Ready to Go'
  ]

  mode = this.modesArray[0];
  productsArr:Product[] | any = [];
  servicessArr:Service[] | any = [];
  
  selectedProduct!:number;
  selectedProductName:any = [];

  selectedService!:number;
  selectedServicename:any = [];

  selectedTemp!:number;

  platform!:string;
  campaign!:string;

  constructor(private service:AppService, 
    private route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.onGettingAllServices();
    console.log(this.mode);
  }

  onGettingAllProducts(){
    return this.service.getProducts()
      .subscribe({
        next:(v:any) => {
          this.productsArr = this.splitArr(v, 3);
          console.log(this.productsArr);
        }
      })
  }

  onGettingAllServices(){
    return this.service.getServices()
      .subscribe({
        next:(v:any) => {
          this.servicessArr = this.splitArr(v, 3);
          console.log(this.servicessArr);
        }
      })
  }

  nextStep(event:Event){
    if(this.mode === this.modesArray[0]){
      if(this.selectedServicename.length === 0){
        this.openSnackBar("Please Select a Service", "");        
      }else {
        this.platform = this.selectedServicename[0].platform;
        let platformStr = this.platforms.filter((item:any) =>{
          return item.name === this.platform
        })
        console.log(platformStr[0].name);
        this.onGettingAllProducts();
        this.mode = this.modesArray[1]; 
        this.stepper.next();
      }
    }
    else if(this.mode === this.modesArray[1]){
      if(this.selectedProductName.length === 0){
        this.openSnackBar("Please select a product", "")
      }else {
        this.campaign = this.selectedProductName[0].product;
        console.log(this.campaign);
        console.log(this.platform);
        this.mode = this.modesArray[2];
        this.stepper.next(); 
      }
    }
    else if(this.mode === this.modesArray[2]){
      this.start_date =  this.start_date.toString().substring(4, 15);
      this.end_date = this.end_date.toString().substring(4, 15);      
      console.log(this.value);
      console.log(this.start_date);
      console.log(this.end_date);
      console.log(this.location);
      this.stepper.next();
      this.mode = this.modesArray[3]; 
    }else {
      let platformStr = this.platforms.filter((item:any) =>{
        return item.name === this.platform
      })

      let campaignObj = {
        campaign: `${this.campaign} campaign`,
        date_range: `${this.start_date} - ${this.end_date}`,
        clicks: 100,
        budget: this.value,
        location: this.location,
        platform: platformStr[0].name,
        status:"Live Now",
        image: this.campaignImg
      }

      
      this.service.createCampaign(campaignObj)
        .subscribe({
          next:(v) => {
            console.log(v);
            this.stepper.next();
            this.openSnackBar("Campaign Created!!", "cancel");
            this.route.navigate(['/']);
          }
        })
    }
    this.stepper.selected?.completed;
    console.log(this.mode);
  }
  
  selectService(service:number){
    this.selectedService = service; 
    this.selectedServicename = this.servicessArr.flat().filter((val:any, index:number) => {
        return val.id === service;
    })
    console.log(this.selectedServicename[0]);
  }

  openSnackBar(message:string, action:string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: "top",
      duration: 3*1000,
      panelClass: "success"
    });
  }

  selectFinal(id:number, image:string){
    this.selectedTemp = id;
    this.campaignImg = image;
  }


  selectProduct(product:number){
    this.selectedProduct = product; 
    this.selectedProductName = this.productsArr.flat().filter((val:any, index:number) => {
        return val.id === product;
    })
    console.log(this.selectedProductName[0]);
  }
  

  splitArr(arr:any, size:number) {
    let newArr = [];
    for(let i = 0; i< arr.length; i += size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
 }
}

