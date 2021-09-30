import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILocation } from 'src/app/models/location';
import { IPaiement } from 'src/app/models/paiement';
import { LocationService } from 'src/app/services/location.service';
import { PaiementService } from 'src/app/services/paiement.service';
import { stringDateToTimeStamp } from 'src/app/utils/utilDate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  //la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  textSearchLocataire: string = ''; // pour la recherche sur la liste
  textSearchLocal: string = ''; // pour la recherche sur la liste
  textSearchState: string = ''; // pour la recherche sur la liste
  textSearchType: string = ''; // pour la recherche sur la liste
  reverse: boolean = false; // pour le tri de la liste
  key: string = 'id'; // pour le tri de la liste.
  //le fichier
  file: any;
  //les texte du spinner
  textBtn: string = 'Créer';
  textSpinner: string = 'Chargement en cours...';
  //
  locations: ILocation[] = [];
  customLocations: ILocation[] = []; //pour la recherche
  paiements: IPaiement[] = [];
  customPaiements: IPaiement[] = [];

  constructor(private paiementService: PaiementService,
    private locationService: LocationService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    //appel 
    this.chargements();

  }

  //pour la partie paiement
  onSavePaiement(myForm: NgForm) {
    console.log(myForm.value)
    //test des champs
    if (myForm.value.locataire == "" || myForm.value.local == "" || myForm.value.periode == ""
      || myForm.value.locataire == "Choisir Locataire" || myForm.value.local == "Choisir Local" ||
      myForm.value.periode == null || myForm.value.montant == "" || myForm.value.montant == null ||
      myForm.value.type == "" || myForm.value.type == "Choisir Type Paiement" || myForm.value.description == "" ||
      myForm.value.description == null) {

      Swal.fire('Erreur...', 'Tous les champs ne doivent jamais etre vide !!!', 'error')
    }
    else {
      //
      let index = this.customLocations.findIndex(
        (obj => obj.locataireName == myForm.value.locataire && obj.localName == myForm.value.local)
      );
      let addPaiement: IPaiement = <IPaiement>{};
      addPaiement.montant = myForm.value.montant;
      addPaiement.description = myForm.value.description;
      addPaiement.type = parseInt(myForm.value.type);
      addPaiement.imageBordereau = "pas dispo"; // à changer
      addPaiement.datePaiement = stringDateToTimeStamp(myForm.value.periode);
      addPaiement.createBy = 1; //mettre l'utilisateur
      addPaiement.locationID = this.customLocations[index].id;

      //formation json 
      const formData: FormData = new FormData();
      if (this.file !== undefined) {
        formData.append('avatar', this.file, this.file.name);
      }
      // on continue
      formData.append('paiement', JSON.stringify(addPaiement));

      //const jsonValue = { "paiement": JSON.stringify(addPaiement) };
      this.textSpinner = 'Operation en cours...'; // texte du spinner
      //appel
      this.adding(formData, myForm);
    }

  }

  onCheckPaiement(paiment: IPaiement) {
    //pour supprimer
    this.checkingPaiement(paiment);
  }
  changeLocataire(e: any) {
    this.customLocations = this.locations.filter(res => res.locataireName == e.target.value);
    //this.isNotSelectable = false;
  }

  changeLocal(e: any) {
    console.log(e.target.value)
  }

  changePeriode(e: any) {
    console.log(e.target.value)
    console.log(typeof (e.target.value))
  }

  changeType(e: any) {
    console.log(e.target.value)
    console.log(typeof (e.target.value))
  }
  //le trigger pour obtenir le fichier
  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    //event.target.value = null;

  }

  chargements() {
    //debut progression
    this.spinner.show();
    this.chargementLocations();
    this.chargement();
  }

  chargement() {

    //ici, au chargement du component, on s'inscrit à un observable
    this.paiementService.findPaiements().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.paiements = reponse.data;
          this.customPaiements = reponse.data; // on garde les memes données pour plus tard
          //on match le total de ligne
          this.totalLength = this.paiements.length;
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

  //http load locations
  chargementLocations() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.locationService.findValidLocations().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locations = reponse.data;
          //
        } else {
          console.log("pas code 200")
        }

      },
      (error) => {
        console.log("erreur")
      }

    );
  }

  //http add du location
  adding(value: FormData, form: NgForm) {
    this.spinner.show()
    //
    this.paiementService.addPaiement(value).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          let newPaiement: IPaiement = <IPaiement>{};
          newPaiement = Object.assign(newPaiement, reponse.data);
          form.resetForm(); //réinitialisation
          this.paiements.push(newPaiement);  // ajout du nouvel élément dans la liste
          this.totalLength = this.paiements.length; //on match le total de ligne
          this.file = undefined; //rénitialisation 
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
  //http verifyPaiement
  checkingPaiement(value: IPaiement) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "id": value.id };
    //
    this.paiementService.CheckProcessPaiement(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          // reception de l'objet modifié
          let updatePaiement: IPaiement = <IPaiement>{};
          updatePaiement = Object.assign(updatePaiement, reponse.data);
          // recherche de la position de l'element
          let index = this.paiements.findIndex((obj => obj.id == updatePaiement.id));
          this.paiements[index] = updatePaiement; // modification dans la liste principale
          //on match le total de ligne
          this.totalLength = this.paiements.length;
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
          Swal.fire('Info...', 'Règlement des litiges effectués avec succès !!!', 'success')

        }
        else if (reponse.status === 205) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Info...', 'Aucun litige trouvé pour etre regler par ce paiement !!!', 'warning')
        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Problème survenu coté serveur !!!', 'error')
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
      this.paiements = this.customPaiements;//on ne change rien cad on met toutes les données
      this.totalLength = this.paiements.length; //on match le total de ligne
    } else {
      //on filtre
      this.paiements = this.paiements.filter(res => {
        return res.locataire.toLowerCase().match(this.textSearchLocataire)
      });
      this.totalLength = this.paiements.length; //on match le total de ligne
    }
  }

  //recherche sur la liste
  onSearchByLocal(value: string) {
    this.textSearchLocal = value;
    if (this.textSearchLocal == "") {
      this.paiements = this.customPaiements;//on ne change rien cad on met toutes les données
      this.totalLength = this.paiements.length; //on match le total de ligne
    } else {
      //on filtre
      this.paiements = this.paiements.filter(res => {
        return res.local.toLowerCase().match(this.textSearchLocal)
      });
      this.totalLength = this.paiements.length; //on match le total de ligne
    }
  }

  onSearchByState(value: string) {
    this.textSearchState = value;
    if (this.textSearchState == "") {
      this.paiements = this.customPaiements;//on ne change rien cad on met toutes les données
      this.totalLength = this.paiements.length; //on match le total de ligne
    } else {
      //on filtre
      this.paiements = this.paiements.filter(res => {
        return res.state.toLowerCase().match(this.textSearchState)
      });
      this.totalLength = this.paiements.length; //on match le total de ligne
    }
  }

  onSearchByType(value: string) {
    this.textSearchType = value;
    if (this.textSearchType == "") {
      this.paiements = this.customPaiements;//on ne change rien cad on met toutes les données
      this.totalLength = this.paiements.length; //on match le total de ligne
    }
    else {
      //on filtre
      if (this.textSearchType.charAt(0).toLowerCase() == 'l' ||
        this.textSearchType.charAt(0).toLowerCase() == 'o' ||
        this.textSearchType.charAt(0).toLowerCase() == 'y') {

        this.paiements = this.paiements.filter(res => {
          return res.type == 1;
        });
      }
      else if (this.textSearchType.charAt(0).toLowerCase() == 'c' ||
        this.textSearchType.charAt(0).toLowerCase() == 'h' ||
        this.textSearchType.charAt(0).toLowerCase() == 'a') {

        this.paiements = this.paiements.filter(res => {
          return res.type == 2;
        });
      }

      this.totalLength = this.paiements.length; //on match le total de ligne
    }
  }

  //trier par nom 
  onSort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


}
