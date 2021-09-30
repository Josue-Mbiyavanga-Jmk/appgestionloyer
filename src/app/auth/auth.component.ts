import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  //
  changeProfil(e: any) {
    console.log(typeof (e));
    console.log(e.target.value);
  }
  //pour le login
  onLogin(loginForm: NgForm) {
    console.log(loginForm.value.userlogin + " " + loginForm.value.passwordlogin);
    const user = loginForm.value.userlogin;
    const pwd = loginForm.value.passwordlogin;
    if (user === undefined || user == "") {

    }
    else if (pwd === undefined || pwd == "") {

    }
    else {
      //progression debut
      this.spinner.show();
      //on fera le http 

      //progression fin
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        console.log("iccccc")
        this.spinner.hide();
        //puis redirection
        this.router.navigate(['main'], { state: { user: loginForm.value.userlogin, pwd: loginForm.value.passwordlogin } });
      }, 2000);

    }
    //this.router.navigate(['edition_vente'],{state:{id:element.id} });

  }

}
