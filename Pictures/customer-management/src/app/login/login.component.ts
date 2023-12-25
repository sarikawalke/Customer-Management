import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = true;
  error: any;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  onSubmit() {
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      this.submitted = false;
      return;
    } else {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
