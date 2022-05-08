import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [...material],
  exports: [...material],
})
export class AppMaterialModule {}
