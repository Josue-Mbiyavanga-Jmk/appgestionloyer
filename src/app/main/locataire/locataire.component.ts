import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILocataire, ILocataireCustom } from 'src/app/models/locataire';
import { LocataireService } from 'src/app/services/locataire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-locataire',
  templateUrl: './locataire.component.html',
  styleUrls: ['./locataire.component.css']
})
export class LocataireComponent implements OnInit {

  //pour la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  reverse: boolean = false; // pour le tri de la liste
  key: string = 'id'; // pour le tri de la liste.
  textSearch: string = ''; // pour la recherche sur la liste
  isUpdate: boolean = false;
  textSpinner: string = 'Chargement en cours...';
  textName: string = '';
  textPrenom: string = '';
  textPhone: string = '';
  textEmail: string = '';
  textDesc: string = '';
  textBtn: string = 'Créer';
  locataire: ILocataire = <ILocataire>{}
  locataires: ILocataire[] = [];
  locatairesTemp: ILocataire[] = []; //pour la recherche

  constructor(private locataireService: LocataireService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //
    this.chargement();
  }

  onSaveLocataire(myForm: NgForm) {
    //test des champs
    if (myForm.value.prenom == "" || myForm.value.nom == "" || myForm.value.sexe === undefined
      || myForm.value.telephone == "" || myForm.value.email == "" || myForm.value.description == "") {
      alert("Tous les champs ne doivent jamais etre vide !!!")
    }
    else {
      if (this.isUpdate === false) {
        //pour la sauvegarde
        let addLocataire: ILocataireCustom = <ILocataireCustom>{};
        addLocataire.prenom = myForm.value.prenom.toLowerCase();
        addLocataire.nom = myForm.value.nom.toLowerCase();
        addLocataire.sexe = myForm.value.sexe;
        addLocataire.telephone = myForm.value.telephone.split(' ').join('');
        addLocataire.email = myForm.value.email;
        addLocataire.description = myForm.value.description;
        addLocataire.createBy = 1; // à remplacer par le userID connecté

        //formation json                            
        const jsonValue = { "locataire": JSON.stringify(addLocataire) };
        this.textSpinner = 'Operation en cours...'; // texte du spinner
        //appel
        this.adding(jsonValue);

      }
      else {
        //pour la mise à jour
        this.updating(this.locataire, myForm);
      }
    }


  }

  onUpdate(locataireUpdate: ILocataire) {
    //le verrou indiquant la MAJ
    this.isUpdate = true;
    this.textBtn = "Modifier"
    //pour le two way binding dans le formulaire
    this.locataire = Object.assign(this.locataire, locataireUpdate);
    //pour les changement de champ de saisie
    this.textName = this.locataire.nom
    this.textPrenom = this.locataire.prenom
    this.textPhone = this.locataire.telephone
    this.textEmail = this.locataire.email
    this.textDesc = this.locataire.description

  }

  onDelete(locataire: ILocataire) {
    //pour supprimer
    this.deleting(locataire);
  }

  //http load locataires
  chargement() {
    //debut progression
    this.spinner.show();
    //ici, au chargement du component, on s'inscrit à un observable
    this.locataireService.findLocataires().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.locataires = reponse.data;
          this.locatairesTemp = reponse.data; // on garde aux fins de recherche
          //on match le total de ligne
          this.totalLength = this.locataires.length;
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
  //http add du local
  adding(value: {}) {
    //progression
    this.spinner.show();
    //
    this.locataireService.addLocataire(value).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          let newLocataire: ILocataire = <ILocataire>{};
          newLocataire = Object.assign(newLocataire, reponse.data);
          this.locataire.prenom = ""; //réinitialisation
          this.locataire.nom = ""; //réinitialisation
          this.locataire.telephone = ""; //réinitialisation
          this.locataire.email = ""; //réinitialisation
          this.locataire.description = ""; //réinitialisation
          this.locataires.push(newLocataire);  // ajout du nouvel élément dans la liste
          this.totalLength = this.locataires.length; //on match le total de ligne
          //fin progression
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        }
        else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Cet enregistrement de locataire existe déjà!', 'error');
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
  updating(value: ILocataire, updateForm: NgForm) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "locataire": value };
    //
    this.locataireService.updateLocataire(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //parsing
          value.updateAt = Date.now();
          let index = this.locataires.findIndex((obj => obj.id == value.id));
          //objet tempo
          let tempLocataire: ILocataire = <ILocataire>{};
          tempLocataire = Object.assign(tempLocataire, value);
          this.locataires[index] = tempLocataire; // modification dans la liste principale
          this.totalLength = this.locataires.length; //on match le total de ligne 
          //réinitialisation
          updateForm.reset();
          this.textBtn = "Creer";
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
          Swal.fire('Erreur...', 'Il existe déjà un locataire avec ces donnnées !!', 'error');
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
  deleting(value: ILocataire) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "id": value.id };
    //
    this.locataireService.deleteLocataire(jsonValue).subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          // modification dans la liste principale
          const tempLocataireList = this.locataires.filter(item => item.id !== value.id); //enlever element
          this.locataires = []; // vider ancienne liste
          this.locataires = tempLocataireList; //charger nouvelles données
          //on match le total de ligne
          this.totalLength = this.locataires.length;
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
  onTextChangeInNom(value: any) {
    this.textName = value;
    if (this.textName == '' && this.textPrenom == '' && this.textPhone == '' &&
      this.textEmail == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  onTextChangeInPrenom(value: any) {
    this.textPrenom = value;
    if (this.textName == '' && this.textPrenom == '' && this.textPhone == '' &&
      this.textEmail == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  onTextChangeInPhone(value: any) {
    this.textPhone = value;
    if (this.textName == '' && this.textPrenom == '' && this.textPhone == '' &&
      this.textEmail == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  onTextChangeInEmail(value: any) {
    this.textEmail = value;
    if (this.textName == '' && this.textPrenom == '' && this.textPhone == '' &&
      this.textEmail == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  onTextChangeInDescription(value: any) {
    this.textDesc = value;
    if (this.textName == '' && this.textPrenom == '' && this.textPhone == '' &&
      this.textEmail == '' && this.textDesc == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }
  //recherche sur la liste
  onSearchByNom(value: string) {
    this.textSearch = value;
    if (this.textSearch == "") {
      this.locataires = this.locatairesTemp;//on ne change rien cad on met toutes les données
      this.totalLength = this.locataires.length; //on match le total de ligne
    } else {
      //on filtre
      this.locataires = this.locataires.filter(res => {
        return res.nom.toLowerCase().match(this.textSearch)
      });
      this.totalLength = this.locataires.length; //on match le total de ligne
    }
  }
  //trier par nom 
  onSort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //changement du combo sexe
  changeSexe(e: any) {
  }

}
