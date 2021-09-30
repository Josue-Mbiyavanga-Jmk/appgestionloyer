import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISite, ISiteCustom } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  //pour la pagination
  totalLength: number | undefined;
  page: number = 1;
  itemPage: number = 5;
  isUpdate: boolean = false;
  textName: string = '';
  textBtn: string = 'Créer';
  editForm: NgForm | undefined;
  siteName: string = '';
  siteID: number = 0;

  sites: ISite[] = [];

  constructor(private siteService: SiteService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    //load data
    this.chargement();
  }

  onSaveSite(siteForm: NgForm) {
    //test des champs
    if (siteForm.value.siteName == "") {
      Swal.fire('Erreur...', 'Le champs nom du site ne doit jamais etre vide !!!', 'error');

    }
    else {

      if (this.isUpdate === false) {
        //pour la sauvegarde
        let addSite: ISiteCustom = <ISiteCustom>{};
        addSite.name = siteForm.value.siteName;
        addSite.createBy = 1; // à remplacer par le userID connecté
        //formation json                            
        const jsonValue = { "site": JSON.stringify(addSite) };
        //appel
        this.adding(jsonValue);
      }
      else {
        //pour la mise à jour
        console.log("ici track update")
        let updateSite: ISite = <ISite>{};
        const findSite = this.sites.find(o => o.id === this.siteID);
        updateSite = Object.assign(updateSite, findSite);
        updateSite.name = siteForm.value.siteName;
        console.log(updateSite)
        //appel
        this.updating(updateSite);
      }
    }


  }

  //
  onUpdate(site: ISite) {
    //le verrou indiquant la MAJ
    this.isUpdate = true;
    this.textBtn = "Modifier";
    //pour le two way binding dans le formulaire
    this.siteID = site.id;
    this.siteName = site.name;
  }

  // 
  onDelete(site: ISite) {
    //pour supprimer
    this.deleting(site);
  }
  //http load des sites
  chargement() {
    //ici, au chargement du component, on s'inscrit à un observable
    this.siteService.findSites().subscribe(
      (reponse) => {
        if (reponse.status === 200) {
          //on met cette liste dans le service
          this.sites = reponse.data;
          //on match le total de ligne
          this.totalLength = this.sites.length;
        } else {
          console.log("pas code 200")
        }

      },
      (error) => {
        console.log("erreur")
      }

    );
  }

  //http add du site
  adding(value: {}) {
    //progression
    this.spinner.show();
    //
    this.siteService.addSite(value).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          //parsing
          let newSite: ISite = <ISite>{};
          newSite = Object.assign(newSite, reponse.data);
          this.siteName = ""; //réinitialisation
          this.sites.push(newSite);  // ajout du nouvel élément dans la liste
          this.totalLength = this.sites.length; //on match le total de ligne
          //fin progression
          this.spinner.hide();
        } else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Cet enregistrement de site existe déjà!', 'error');
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

  //http update du site
  updating(value: ISite) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "site": JSON.stringify(value) };
    //
    this.siteService.updateSite(jsonValue).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          //parsing
          value.updateAt = Date.now();
          let index = this.sites.findIndex((obj => obj.id == value.id));
          this.siteName = "";//réinitialisation
          this.sites[index] = value; // modification dans la liste principale
          this.totalLength = this.sites.length; //on match le total de ligne
          this.textBtn = "Creer";
          this.isUpdate = false;
          //fin progression
          this.spinner.hide();
        } else if (reponse.status === 400) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Modification echouée. Contactez l\'admin...', 'error');

        }
        else if (reponse.status === 403) {
          //fin progression
          this.spinner.hide();
          Swal.fire('Erreur...', 'Il existe déjà un site avec ces donnnées!', 'error');
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

  //http delete du site
  deleting(value: ISite) {
    //progression
    this.spinner.show();
    //formation json                            
    const jsonValue = { "id": value.id };
    //
    this.siteService.deleteSite(jsonValue).subscribe(
      (reponse) => {
        console.log(reponse);
        if (reponse.status === 200) {
          // modification dans la liste principale
          const tempSiteList = this.sites.filter(item => item.id !== value.id); //enlever element
          this.sites = []; // vider ancienne liste
          this.sites = tempSiteList; //charger nouvelles données
          //on match le total de ligne
          this.totalLength = this.sites.length;
          //fin progression
          this.spinner.hide();

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
    if (this.textName == '' && this.isUpdate == true) {
      this.textBtn = "Creer";
      this.isUpdate = false;
    }

  }

  onPrint() {

    let element = document.getElementById('print') as HTMLElement;
    html2canvas(element).then((canvas) => {
      let imgData = canvas.toDataURL('image/png');
      let doc = new jsPDF("p", "mm", "a4");
      let imgHeight = canvas.height * 208 / canvas.width;
      doc.setFontSize(15);
      doc.addImage(imgData, 'PNG', 0, 10, 208, imgHeight);

      doc.save("listedessites.pdf");
    });
  }

}
