import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../state/auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { registerSuccess, registerFailure } from '../../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/AppState';
import { privateDecrypt } from 'crypto';
import { UserService } from '../../../state/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  constructor(private formBuilder: FormBuilder,
    private authService:AuthService,
    private http:HttpClient,
    private store:Store<AppState>,
    private userService:UserService,
    private dilouge: MatDialog,
     ) {

  }

  @Input() changeTemplate: any;
  

  loginForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value)
      this.store.select('auth').subscribe((data)=>{
        this.userService.getUserProfile()
        console.log("helloooooooo")
        this.dilouge.closeAll()
      })

    }
  }

}
