import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILocation } from 'src/app/models/location';
import { ILocationLoyer, ILocationLoyerCustom } from 'src/app/models/locationLoyer';
import { LocationLoyerService } from 'src/app/services/locationLoyer.service';
import { getAnnee, getMois } from 'src/app/utils/utilString';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-loyer',
  templateUrl: './loyer.component.html',
  styleUrls: ['./loyer.component.css']
})
export class LoyerComponent implements OnInit {
  //la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  textSearchLocataire: string = ''; // pour la recherche sur la liste
  textSearchLocal: string = ''; // pour la recherche sur la liste
  //
  textBtn: string = 'Créer';
  textSpinner: string = 'Chargement en cours...';
  @Input() locations: ILocation[] = [];
  customLocations: ILocation[] = []; //pour la recherche
  loyers: ILocationLoyer[] = [];
  customLoyers: ILocationLoyer[] = []; //pour la recherche sur la liste
  constructor(private loyerService: LocationLoyerService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //
    this.chargement();
  }

  //pour la partie loyer
  onSaveLoyer(myForm: NgForm) {
    console.log(myForm.value)
    //test des champs
    if (myForm.value.locataire == "" || myForm.value.local == "" || myForm.value.periode == ""
      || myForm.value.locataire == "Choisir Locataire" || myForm.value.local == "Choisir Local" || myForm.value.periode == null) {
      alert("Tous les champs ne doivent jamais etre vide !!!")
    }
    else {
      //
      let index = this.customLocations.findIndex(
        (obj => obj.locataireName == myForm.value.locataire && obj.localName == myForm.value.local)
      );
      let addLoyer: ILocationLoyerCustom = <ILocationLoyerCustom>{};
      addLoyer.mois = getMois(myForm.value.periode);
      addLoyer.annee = getAnnee(myForm.value.periode);
      addLoyer.state = "init";
      addLoyer.montant = 0;
      addLoyer.datePaiement = 0;
      addLoyer.dateSolde = 0;
      addLoyer.createBy = 1; //mettre l'utilisateur
      addLoyer.locationID = this.customLocations[index].id;
      addLoyer.loyerNet = this.customLocations[index].loyer;

      //formation json                            
      const jsonValue = { "locationLoyer": JSON.stringify(addLoyer) };
      this.textSpinner = 'Operation en cours...'; // texte du spinner
      //appel
      this.adding(jsonValue, myForm);
    }

  }
  changeLocataire(e: any) {
    console.log(e.target.value)
    this.customLocations = this.locations.filter(res => res.locataireName == e.target.value);
    //this.isNotSelectable = false;
  }

  changeLocal(e: any) {
    console.log("ici")
    console.log(e.target.value)
  }

  changePeriode(e: any) {
    console.log(e.target.value)
    console.log(typeof (e.target.value))
  }

  //Les Http
  //http load loyers
  chargement() {
    //debut progression
    this.spinner.show();
    //ici, au chargement du component, on s'inscrit à un observable
    this.loyerService.findLoyers().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.loyers = reponse.data;
          this.customLoyers = reponse.data; // on garde les memes données pour plus tard
          //on match le total de ligne
          this.totalLength = this.loyers.length;
          //
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);

        } else {
          this.spinner.hide();
          console.log("pas code 200")
        }

      },
      (error) => {
        this.spinner.hide();
        console.log("erreur")
      }

    );
  }
  //http add du location
  adding(value: {}, form: NgForm) {
    this.spinner.show()
    //
    this.loyerService.addLoyer(value).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          let newLoyer: ILocationLoyer = <ILocationLoyer>{};
          newLoyer = Object.assign(newLoyer, reponse.data);
          form.reset(); //réinitialisation
          this.loyers.push(newLoyer);  // ajout du nouvel élément dans la liste
          this.totalLength = this.locations.length; //on match le total de ligne
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          //message

        } else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Cet enregistrement de paiement existe déjà!', 'error');
        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          alert("Problème coté serveur" + reponse.message)
        }

      },
      (error) => {
        //fin progression
        this.spinner.hide();
        console.log("erreur " + error)

      },
    );
  }

  //recherche sur la liste
  onSearchByLocataire(value: string) {
    this.textSearchLocataire = value;
    if (this.textSearchLocataire == "") {
      this.loyers = this.customLoyers;//on ne change rien cad on met toutes les données
      this.totalLength = this.loyers.length; //on match le total de ligne
    } else {
      //on filtre
      this.loyers = this.loyers.filter(res => {
        return res.locataire.toLowerCase().match(this.textSearchLocataire)
      });
      this.totalLength = this.loyers.length; //on match le total de ligne
    }
  }

  //recherche sur la liste
  onSearchByLocal(value: string) {
    this.textSearchLocal = value;
    if (this.textSearchLocal == "") {
      this.loyers = this.customLoyers;//on ne change rien cad on met toutes les données
      this.totalLength = this.loyers.length; //on match le total de ligne
    } else {
      //on filtre
      this.loyers = this.loyers.filter(res => {
        return res.local.toLowerCase().match(this.textSearchLocal)
      });
      this.totalLength = this.loyers.length; //on match le total de ligne
    }
  }

}
