import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILocaCustom, ILocal } from 'src/app/models/local';
import { ISite } from 'src/app/models/site';
import { LocalService } from 'src/app/services/local.service';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  //pour la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  isUpdate: boolean = false;
  textSpinner: string = 'Chargement en cours...';
  textName: string = '';
  textDesc: string = '';
  textBtn: string = 'Créer';
  local: ILocal = <ILocal>{}
  site: ISite = <ISite>{}
  siteName: string = '';
  siteID: number = 0;

  locals: ILocal[] = [];
  sites: ISite[] = [];

  constructor(private localService: LocalService,
    private siteService: SiteService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //
    this.chargement();
  }

  onSaveLocal(Localform: NgForm) {
    //test des champs
    if (Localform.value.name == "" || Localform.value.type === undefined
      || this.siteName == "" || Localform.value.description == "") {
      Swal.fire('Erreur...', 'Tous les champs ne doivent jamais etre vide !!!', 'error');
    }
    else {
      if (this.isUpdate === false) {
        //pour la sauvegarde
        let addLocal: ILocaCustom = <ILocaCustom>{};
        addLocal.name = Localform.value.name;
        addLocal.description = Localform.value.description;
        addLocal.type = Localform.value.type;
        console.log(Localform.value)
        console.log(this.siteName)
        addLocal.siteID = this.findSiteByName(this.siteName);
        addLocal.createBy = 1; // à remplacer par le userID connecté

        //formation json                            
        const jsonValue = { "local": JSON.stringify(addLocal) };
        this.textSpinner = 'Operation en cours...'; // texte du spinner
        //appel
        this.adding(jsonValue);

      }
      else {
        //pour la mise à jour
        this.updating(this.local, Localform);
      }
    }


  }

  onUpdate(localUpdate: ILocal) {
    //le verrou indiquant la MAJ
    this.isUpdate = true;
    this.textBtn = "Modifier"
    //pour le two way binding dans le formulaire
    this.local = Object.assign(this.local, localUpdate);
    this.local.siteName = this.siteName;
    //pour les changement de champ de saisie
    this.textName = this.local.name
    this.textDesc = this.local.description

  }

  onDelete(local: ILocal) {
    //pour supprimer
    this.deleting(local);
  }

  chargement() {
    //debut progression
    this.spinner.show();
    this.chargementSites();
    this.chargementLocals();
  }
  //http load locaux
  chargementLocals() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.localService.findLocals().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locals = reponse.data;
          //on match le total de ligne
          this.totalLength = this.locals.length;
          //
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);

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
  //http load des sites
  chargementSites() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.siteService.findSites().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.sites = reponse.data;
          this.siteName = this.sites[0].name; // astuce pour avoir le premier site
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
  //http add du local
  adding(value: {}) {
    //progression
    this.spinner.show();
    //
    this.localService.addLocal(value).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          //parsing
          let newLocal: ILocal = <ILocal>{};
          newLocal = Object.assign(newLocal, reponse.data);
          this.local.name = ""; //réinitialisation
          this.local.description = ""; //réinitialisation
          this.locals.push(newLocal);  // ajout du nouvel élément dans la liste
          this.totalLength = this.locals.length; //on match le total de ligne
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        } else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Cet enregistrement de local existe déjà!', 'error');
        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Problème coté serveur.', 'error');

        }

      },
      (error) => {
        //fin progression
        this.spinner.hide();
        console.log("erreur " + error)

      },
    );
  }

  //http update du local
  updating(value: ILocal, updateForm: NgForm) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "local": value };
    console.log(jsonValue)
    //
    this.localService.updateLocal(jsonValue).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          //parsing
          value.updateAt = Date.now();
          let index = this.locals.findIndex((obj => obj.id == value.id));
          //objet tempo
          let tempLocal: ILocal = <ILocal>{};
          tempLocal = Object.assign(tempLocal, value);
          this.locals[index] = tempLocal; // modification dans la liste principale
          this.totalLength = this.locals.length; //on match le total de ligne
          //réinitialisation
          updateForm.reset();
          this.textBtn = "Creer";
          this.isUpdate = false;
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Modification echouée. Contactez l\'admin...', 'error');

        }
        else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Il existe déjà un local avec ces donnnées !!', 'error');

        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Problème coté serveur.', 'error');

        }

      },
      (error) => {
        //fin progression
        this.spinner.hide();
        console.log("erreur " + error)

      },
    );
  }
  //http delete du local
  deleting(value: ILocal) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "id": value.id };
    //
    this.localService.deleteLocal(jsonValue).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          // modification dans la liste principale
          const tempLocalList = this.locals.filter(item => item.id !== value.id); //enlever element
          this.locals = []; // vider ancienne liste
          this.locals = tempLocalList; //charger nouvelles données
          //on match le total de ligne
          this.totalLength = this.locals.length;
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);

        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Suppression echouée. Contactez l\'admin...', 'error');

        }
        else if (reponse.status === 500) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Problème coté serveur.', 'error');

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
  onTextChangeInName(value: any) {
    this.textName = value;
    if (this.textName == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
      console.log(this.isUpdate)
    }

  }
  onTextChangeInDescription(value: any) {
    this.textDesc = value;
    if (this.textDesc == '' && this.textName == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
      console.log(this.isUpdate)
    }

  }
  //
  changeType(e: any) {
    console.log(typeof (e));
    console.log(e.target.value);
  }

  changeSite(e: any) {
    this.siteName = e.target.value; //gestion du changement
  }
  //
  findSiteByName(name: string): number {
    let returnValue: number = 0;
    for (let i = 0; i < this.sites.length; i++) {
      if (this.sites[i].name == name) {
        returnValue = this.sites[i].id;
        break;
      } //end if
    }//end for
    return returnValue;
  }


}
