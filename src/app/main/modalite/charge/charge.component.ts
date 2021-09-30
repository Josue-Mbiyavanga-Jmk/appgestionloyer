import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICharge, IChargeBase } from 'src/app/models/charge';
import { ILocation } from 'src/app/models/location';
import { ChargeService } from 'src/app/services/charge.service';
import { getAnnee, getMois } from 'src/app/utils/utilString';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {

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
  charges: ICharge[] = [];
  customCharges: ICharge[] = [];

  constructor(private chargeService: ChargeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //
    this.chargement();
  }

  //pour la partie loyer
  onSaveCharge(myForm: NgForm) {
    console.log(myForm.value)
    //test des champs
    if (myForm.value.locataire == "" || myForm.value.local == "" || myForm.value.periode == ""
      || myForm.value.locataire == "Choisir Locataire" || myForm.value.local == "Choisir Local" ||
      myForm.value.periode == null || myForm.value.snel == "" || myForm.value.snel == null ||
      myForm.value.regideso == "" || myForm.value.regideso == null || myForm.value.autres == "" ||
      myForm.value.autres == null) {
      alert("Tous les champs ne doivent jamais etre vide !!!")
    }
    else {
      //
      let index = this.customLocations.findIndex(
        (obj => obj.locataireName == myForm.value.locataire && obj.localName == myForm.value.local)
      );
      let addCharge: IChargeBase = <IChargeBase>{};
      addCharge.mois = getMois(myForm.value.periode);
      addCharge.annee = getAnnee(myForm.value.periode);
      addCharge.state = "init";
      addCharge.montant = 0;
      addCharge.snel = myForm.value.snel;
      addCharge.regideso = myForm.value.regideso;
      addCharge.autres = myForm.value.autres;
      addCharge.total = myForm.value.autres + myForm.value.regideso + myForm.value.snel;
      addCharge.datePaiement = 0;
      addCharge.dateSolde = 0;
      addCharge.createBy = 1; //mettre l'utilisateur
      addCharge.locationID = this.customLocations[index].id;

      //formation json                            
      const jsonValue = { "charge": JSON.stringify(addCharge) };
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

  chargement() {
    //debut progression
    this.spinner.show();
    //ici, au chargement du component, on s'inscrit à un observable
    this.chargeService.findCharges().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.charges = reponse.data;
          this.customCharges = reponse.data; // on garde les memes données pour plus tard
          //on match le total de ligne
          this.totalLength = this.charges.length;
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
    this.chargeService.addCharge(value).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          let newCharge: ICharge = <ICharge>{};
          newCharge = Object.assign(newCharge, reponse.data);
          form.reset(); //réinitialisation
          this.charges.push(newCharge);  // ajout du nouvel élément dans la liste
          this.totalLength = this.charges.length; //on match le total de ligne 
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        } else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          alert("Cet enregistrement de paiement existe déjà")
        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          alert("Problème coté serveur")
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
      this.charges = this.customCharges;//on ne change rien cad on met toutes les données
      this.totalLength = this.charges.length; //on match le total de ligne
    } else {
      //on filtre
      this.charges = this.charges.filter(res => {
        return res.locataire.toLowerCase().match(this.textSearchLocataire)
      });
      this.totalLength = this.charges.length; //on match le total de ligne
    }
  }

  //recherche sur la liste
  onSearchByLocal(value: string) {
    this.textSearchLocal = value;
    if (this.textSearchLocal == "") {
      this.charges = this.customCharges;//on ne change rien cad on met toutes les données
      this.totalLength = this.charges.length; //on match le total de ligne
    } else {
      //on filtre
      this.charges = this.charges.filter(res => {
        return res.local.toLowerCase().match(this.textSearchLocal)
      });
      this.totalLength = this.charges.length; //on match le total de ligne
    }
  }

}
