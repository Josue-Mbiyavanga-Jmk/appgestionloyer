import { Component, ElementRef, OnInit } from '@angular/core';
import { ILocation } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-modalite',
  templateUrl: './modalite.component.html',
  styleUrls: ['./modalite.component.css']
})
export class ModaliteComponent implements OnInit {
  //controle de login et signup composant
  private signUp: any;
  private signIn: any;
  private loginUp: any;
  private loginIn: any;
  private pageHtml: HTMLElement;
  countFocus1: number = 0;
  countFocus2: number = 0;
  isActive: boolean = true;

  locations: ILocation[] = [];


  constructor(private element: ElementRef,
    private locationService: LocationService) {
    this.pageHtml = element.nativeElement;
  }

  ngOnInit() {
    //appel 
    this.focusChangement();
    this.chargementLocations();
    //this.chargement();
  }

  focusChangement() {
    this.loginUp = this.pageHtml.querySelector('#second-page');
    this.loginIn = this.pageHtml.querySelector('#first-page');
    this.signUp = this.pageHtml.querySelector('#second-page-on')?.addEventListener('click', this.onClickSignUp.bind(this));
    this.signIn = this.pageHtml.querySelector('#first-page-on')?.addEventListener('click', this.onClickSignIn.bind(this));
    this.countFocus1 += 1; //première page déjà affichée
  }

  onClickSignIn(event: any) {
    if (this.countFocus1 == 0) {
      //appel de la fonction
      this.isActive = true;
      this.onDisplayLogin();
    }
    //
    this.countFocus1 += 1;
    this.countFocus2 = 0;
  }

  onClickSignUp(event: any) {
    if (this.countFocus2 == 0) {
      //appel de la fonction
      this.isActive = false;
      this.onDisplaySignup();
    }
    //
    this.countFocus2 += 1;
    this.countFocus1 = 0;

  }

  //utilitaire pour afficher le login
  onDisplayLogin() {
    // Remove classes first if they exist
    this.loginIn.classList.remove('none')
    this.loginUp.classList.remove('block')

    // Add classes
    this.loginIn.classList.toggle('block')
    this.loginUp.classList.toggle('none')
  }

  //utilitaire pour afficher le signup
  onDisplaySignup() {
    // Remove classes first if they exist
    this.loginIn.classList.remove('block')
    this.loginUp.classList.remove('none')

    // Add classes
    this.loginIn.classList.toggle('none')
    this.loginUp.classList.toggle('block')
  }

  //Les Http

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
  //

}
