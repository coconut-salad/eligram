import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

const material = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatDatepickerModule,
];

@NgModule({
  imports: [...material],
  exports: [...material],
})
export class AppMaterialModule {}
