import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

const materialModules: any[] = [
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
];

@NgModule({
  imports: [
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
