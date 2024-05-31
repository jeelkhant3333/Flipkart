import {Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../state/auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppState} from '../../../models/AppState';
import { UserService } from '../../../state/user/user.service';
import { Store } from '@ngrx/store';
import { authReducer } from '../../../state/auth/auth.reducers';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
  HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {

  constructor(private formBuilder: FormBuilder,
     private authService:AuthService,
     private userService:UserService,
     private dilouge: MatDialog,
     private router: Router,
     private store : Store<AppState>
  ) {

  }

  @Input() changeTemplate: any;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  submitForm(): void {
      if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      this.store.select('auth').subscribe(()=>{
        this.userService.getUserProfile()
        this.dilouge.closeAll()
      })

      }

    }
  }

