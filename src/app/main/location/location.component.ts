import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILocal } from 'src/app/models/local';
import { ILocataire } from 'src/app/models/locataire';
import { ILocation, ILocationCustom } from 'src/app/models/location';
import { LocalService } from 'src/app/services/local.service';
import { LocataireService } from 'src/app/services/locataire.service';
import { LocationService } from 'src/app/services/location.service';
import { stringDateToTimeStamp, timeStampToStringDate } from 'src/app/utils/utilDate';
import { getLocataireNom, getLocatairePrenom } from 'src/app/utils/utilString';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  //pour la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  reverse: boolean = false; // pour le tri de la liste
  key: string = 'id'; // pour le tri de la liste.
  textSearch: string = ''; // pour la recherche sur la liste
  isUpdate: boolean = false;
  isNotSelectable: boolean = false;
  textSpinner: string = 'Chargement en cours...';
  textLoyer: string = '';
  textGarantie: string = '';
  localName: string = 'Choisir Local';
  locataireName: string = 'Choisir Locataire';
  dateDebut: string = '';
  textBtn: string = 'Créer';
  //
  location: ILocation = <ILocation>{}
  locations: ILocation[] = [];
  locationsTemp: ILocation[] = []; //pour la recherche
  locals: ILocal[] = []; //pour les locaux
  locataires: ILocataire[] = []; //pour les locataires

  constructor(private locationService: LocationService,
    private localService: LocalService,
    private locataireService: LocataireService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    //
    this.chargement();
  }
  //les chargements
  chargement() {
    //debut progression
    this.spinner.show();
    this.chargementLocataires();
    this.chargementLocals();
    this.chargementLocations();
  }
  onSaveLocation(myForm: NgForm) {
    //test des champs
    if (this.localName == "Choisir Local" || this.locataireName == "Choisir Locataire" || myForm.value.loyer === undefined
      || myForm.value.garantie === undefined || myForm.value.dureeMoisGarantie === undefined || myForm.value.dateDebut === undefined) {
      alert("Tous les champs ne doivent jamais etre vide !!!")
    }
    else {
      if (this.isUpdate === false) {
        //progression
        this.spinner.show();
        //pour la sauvegarde
        let addLocation: ILocationCustom = <ILocationCustom>{};
        addLocation.loyer = myForm.value.loyer;
        addLocation.garantie = myForm.value.garantie;
        addLocation.dureeMoisGarantie = parseInt(myForm.value.dureeMoisGarantie);
        addLocation.dateDebut = stringDateToTimeStamp(myForm.value.dateDebut);
        addLocation.localID = this.findLocalByName(this.localName); // trouver id
        let nom = getLocataireNom(this.locataireName);
        let prenom = getLocatairePrenom(this.locataireName);
        addLocation.locataireID = this.findLocataireByNomAndPrenom(nom, prenom); // trouver id
        addLocation.createBy = 1; // à remplacer par le userID connecté
        //formation json                            
        const jsonValue = { "location": JSON.stringify(addLocation) };
        this.textSpinner = 'Operation en cours...'; // texte du spinner
        //appel
        this.adding(jsonValue, myForm);

      }
      else {
        //pour la mise à jour
        this.updating(this.location, myForm);
      }
    }


  }

  onUpdate(locationUpdate: ILocation) {
    if (locationUpdate.status == 2) {
      alert("Cette location est déjà désactivée et ne peut etre modifiée.")
    }
    else {
      //le verrou indiquant la MAJ
      this.isUpdate = true;
      this.textBtn = "Modifier";
      //pour le two way binding dans le formulaire
      this.location = Object.assign(this.location, locationUpdate);
      this.dateDebut = timeStampToStringDate(this.location.dateDebut);
      this.localName = this.location.localName;
      this.locataireName = this.location.locataireName;
      this.isNotSelectable = true;
    }

  }

  onDelete(location: ILocation) {
    if (location.status == 2) {
      alert("Cette location est déjà désactivée et ne peut etre supprimé.")
    }
    else {
      //pour supprimer
      this.deleting(location);
    }

  }

  onStop(location: ILocation) {
    if (location.status == 2) {
      alert("Cette location est déjà désactivée et son contrat arreté aussi.")
    }
    else {
      //pour stoper le contrat
      location.dateFin = Date.now(); //date actuelle
      this.stopping(location);
    }

  }
  //http load locations
  chargementLocations() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.locationService.findLocations().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locations = reponse.data;
          this.locationsTemp = reponse.data; // on garde aux fins de recherche
          //on match le total de ligne
          this.totalLength = this.locations.length;
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
  //http load locataires
  chargementLocataires() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.locataireService.findLocataires().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locataires = reponse.data;
          //

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
  //http load locaux
  chargementLocals() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.localService.findLocals().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locals = reponse.data;
          //

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
    //
    this.locationService.addLocation(value).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          let newLocation: ILocation = <ILocation>{};
          newLocation = Object.assign(newLocation, reponse.data);
          newLocation.localName = this.localName;
          newLocation.locataireName = this.locataireName;
          form.reset(); //réinitialisation
          this.locations.push(newLocation);  // ajout du nouvel élément dans la liste
          this.totalLength = this.locations.length; //on match le total de ligne
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        } else if (reponse.status === 500) {
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

  //http update du location
  updating(value: ILocation, updateForm: NgForm) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "location": value };
    //
    this.locationService.updateLocation(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          value.updateAt = Date.now();
          let index = this.locations.findIndex((obj => obj.id == value.id));
          //objet tempo
          let tempLocation: ILocation = <ILocation>{};
          tempLocation = Object.assign(tempLocation, value);
          this.locations[index] = tempLocation; // modification dans la liste principale
          this.totalLength = this.locations.length; //on match le total de ligne
          //réinitialisation
          updateForm.reset();
          this.localName = 'Choisir Local';
          this.locataireName = 'Choisir Locataire';
          this.textBtn = "Creer";
          this.isNotSelectable = false;
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          alert("Modification echouée. Contactez l'admin...")
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
  //http delete du location
  deleting(value: ILocation) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "id": value.id };
    //
    this.locationService.deleteLocation(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          // modification dans la liste principale
          const tempLocationList = this.locations.filter(item => item.id !== value.id); //enlever element
          this.locations = []; // vider ancienne liste
          this.locations = tempLocationList; //charger nouvelles données
          //on match le total de ligne
          this.totalLength = this.locations.length;
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);

        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          alert("Suppression echouée. Contactez l'admin...")
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
  //http stop du location 
  stopping(value: ILocation) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "location": value };
    //
    this.locationService.stopLocation(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //
          let index = this.locations.findIndex((obj => obj.id == value.id));
          //objet tempo
          let tempLocation: ILocation = <ILocation>{};
          value.status = 2; //symbole arret contrat
          value.updateAt = Date.now(); //date ecriture
          tempLocation = Object.assign(tempLocation, value);
          this.locations[index] = tempLocation; // modification dans la liste principale
          this.totalLength = this.locations.length; //on match le total de ligne
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);

        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          alert("Suppression echouée. Contactez l'admin...")
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
  //
  onTextChangeInLoyer(value: any) {
    this.textLoyer = value;
    if (this.textLoyer == null && this.textGarantie == null && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  onTextChangeInGarantie(value: any) {
    //
    this.textGarantie = value;
    if (this.textLoyer == null && this.textGarantie == null && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }

  //recherche sur la liste
  onSearchByNom(value: string) {
    this.textSearch = value;
    if (this.textSearch == "") {
      this.locations = this.locationsTemp;//on ne change rien cad on met toutes les données
      this.totalLength = this.locations.length; //on match le total de ligne
    } else {
      //on filtre
      this.locations = this.locations.filter(res => {
        return res.locataireName.toLowerCase().match(this.textSearch)
      });
      this.totalLength = this.locations.length; //on match le total de ligne
    }
  }
  //trier par nom 
  onSort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //changement du combo sexe
  changeDureeGarantie(e: any) {
  }
  //changement du combo locataire
  changeLocataire(e: any) {
  }
  //changement du combo local
  changeLocal(e: any) {
  }
  //
  findLocalByName(name: string): number {
    let returnValue: number = 0;
    for (let i = 0; i < this.locals.length; i++) {
      if (this.locals[i].name == name) {
        returnValue = this.locals[i].id;
        break;
      } //end if
    }//end for
    return returnValue;
  }

  findLocataireByNomAndPrenom(nom: string, prenom: string): number {
    let returnValue: number = 0;
    for (let i = 0; i < this.locataires.length; i++) {
      if (this.locataires[i].nom == nom && this.locataires[i].prenom == prenom) {
        returnValue = this.locataires[i].id;
        break;
      } //end if
    }//end for
    return returnValue;
  }

}
