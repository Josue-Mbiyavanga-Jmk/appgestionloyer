import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Manipulation du DOM
  private toggle: any;
  private nav: any;
  private bodypd: any;
  private headerpd: any;
  private bodycontent: any;
  private linkColor: any;
  private page: HTMLElement;
  //
  userObject: any;

  constructor(private element: ElementRef, private router: Router) {
    this.page = element.nativeElement;
    this.userObject = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    //fonction d'affichage du menu et de ses fonctions
    this.onShowNavbar('#header-toggle', '#nav-bar', '#body-pd', '#header', '.body__content');

    console.log(this.userObject.user + " et son pwd = " + this.userObject.pwd)
  }

  onShowNavbar(toggleId: any, navId: any, bodyId: any, headerId: any, bodyContent: any) {

    this.toggle = this.page.querySelector(toggleId);
    this.nav = this.page.querySelector(navId);
    this.bodypd = this.page.querySelector(bodyId);
    this.headerpd = this.page.querySelector(headerId);
    this.bodycontent = this.page.querySelector(bodyContent);

    // Validate that all variables exist
    if (this.toggle && this.nav && this.bodypd && this.headerpd) {
      this.toggle.addEventListener('click', () => {
        // show navbar
        this.nav.classList.toggle('show')
        // change icon
        this.toggle.classList.toggle('bx-x')
        // add padding to body
        this.bodypd.classList.toggle('body-pd')
        // add padding to header
        this.headerpd.classList.toggle('body-pd')
        //repositionnement du contenu
        this.bodycontent.classList.toggle('position__auto')
      })
    }

  }

  //Deconnexion
  onLogout() {
    //redirection vers login
    this.router.navigate(['/auth'], { replaceUrl: true });

  }

}
