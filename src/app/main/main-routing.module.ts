import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//composant pere
import { MainComponent } from './main.component';
//composant enfant
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalComponent } from './local/local.component';
import { LocataireComponent } from './locataire/locataire.component';
import { LocationComponent } from './location/location.component';
import { PaiementComponent } from './paiement/paiement.component';
import { UsersComponent } from './users/users.component';
import { SiteComponent } from './site/site.component';
import { ModaliteComponent } from './modalite/modalite.component';






const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: "", redirectTo: 'dashboard', pathMatch: 'full' },
            { path: "dashboard", component: DashboardComponent },
            { path: "local", component: LocalComponent },
            { path: "locataire", component: LocataireComponent },
            { path: "location", component: LocationComponent },
            { path: "modalite", component: ModaliteComponent },
            { path: "paiement", component: PaiementComponent },
            { path: "profil", component: UsersComponent },
            { path: "site", component: SiteComponent }

        ]

    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }