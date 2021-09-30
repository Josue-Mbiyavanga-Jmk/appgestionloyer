import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";

//route
import { MainRoutingModule } from './main-routing.module';

//composant
import { MainComponent } from './main.component';
import { SiteComponent } from './site/site.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalComponent } from './local/local.component';
import { LocataireComponent } from './locataire/locataire.component';
import { LocationComponent } from './location/location.component';
import { PaiementComponent } from './paiement/paiement.component';
import { UsersComponent } from './users/users.component';
import { ModaliteComponent } from './modalite/modalite.component';
import { ChargeComponent } from './modalite/charge/charge.component';
import { LoyerComponent } from './modalite/loyer/loyer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    MainRoutingModule,
  ],
  declarations: [MainComponent, DashboardComponent,
    LocalComponent, LocataireComponent, ModaliteComponent,
    UsersComponent, LocationComponent, SiteComponent, PaiementComponent, ChargeComponent, LoyerComponent]
})
export class MainModule { }
