import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../shared/style.css', './signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({});

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }
    const { value } = this.signupForm;
    if (value.password != value.confirmPassword) {
      this.signupForm.patchValue({ password: '', confirmPassword: '' });
      this._snackBar.open('Passwords do not match', '', { duration: 2500 });
      return;
    }
    this.authService.signup(value);
  }
}
