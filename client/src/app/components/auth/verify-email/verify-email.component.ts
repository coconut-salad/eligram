import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./../shared/style.css', './verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm = new FormGroup({});
  constructor() {}

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
    console.log(this.verifyEmailForm.value);
  }
}
