import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./../shared/style.css', './verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm = new FormGroup({});
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.verifyEmailForm = new FormGroup({
      vCode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
    });
  }
  verifyEmail() {
    if (this.verifyEmailForm.invalid) {
      return;
    }
    this.authService.verifyEmail(this.verifyEmailForm.value.vCode);
  }
}
