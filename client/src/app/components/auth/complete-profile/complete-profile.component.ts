import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./../shared/style.css', './complete-profile.component.css'],
})
export class CompleteProfileComponent implements OnInit {
  genders: { value: string; viewValue: string }[] = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
  ];
  completeProfileForm = new FormGroup({});
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.completeProfileForm = new FormGroup({
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });
  }
  completeProfile() {
    if (this.completeProfileForm.invalid) {
      return;
    }
    const { value } = this.completeProfileForm;
    this.authService.completeProfile(
      value.dateOfBirth.toLocaleDateString(),
      value.gender
    );
    // .replace(/\//g, '-')
  }
}
