import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../models/new-user';
import { User } from '../models/user';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
    formGroup: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  
    constructor(private localStorageService: LocalStorageService, private userService: UserService, private router: Router) { }
    hide = true;
    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';
    ngOnInit(): void {
    }
  
    signIn() {
      const newUser = new NewUser(this.formGroup.value)
        this.userService.signin(newUser).subscribe((data: User) => {
        this.localStorageService.saveUser(data);
      if(data) {
        console.log(data)
        this.router.navigate(['tabs'])
      }
      })
    }

    hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}