import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  isSignUp = true;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {}

  get email() {return this.form.get('email'); }

  get password() {return this.form.get('password'); }

  onSubmit() {
    if (this.isSignUp) {
      this.loginService.signUp(this.form.value)
        .subscribe(data => {
          console.log(data);
          this.redirectToMenuPage();
        }, error => {
          console.log(error);
        });
    } else {
      this.loginService.login(this.form.value)
        .subscribe(data => {
          console.log(data);
          this.redirectToMenuPage();
        }, error => {
          console.log(error);
        });
    }
  }

  redirectToMenuPage() {
    this.router.navigate(['/menu']);
  }

}
