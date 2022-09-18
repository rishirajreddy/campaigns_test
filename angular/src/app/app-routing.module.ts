import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignBoxComponent } from './campaign-box/campaign-box.component';

const routes: Routes = [
  {path:"", component: CampaignBoxComponent},
  {path:"add_campaign", component: AddCampaignComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
