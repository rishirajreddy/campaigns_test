import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { CampaignBoxComponent } from './campaign-box/campaign-box.component';
import { CampaignListComponent,DeleteBoxComponent } from './campaign-box/campaign-list/campaign-list.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule} from '@angular/material/slider';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CampaignBoxComponent,
    CampaignListComponent,
    AddCampaignComponent,
    DeleteBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSliderModule,
    HttpClientModule,
    MatStepperModule,
    MatTableModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
