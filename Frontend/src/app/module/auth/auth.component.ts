import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [CommonModule, SignupComponent, SigninComponent]
})
export class AuthComponent {

  isLoggedin = true

  changeTemplet=()=>{
    this.isLoggedin = !this.isLoggedin;
  }

}
