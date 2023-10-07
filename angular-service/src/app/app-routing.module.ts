import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenVisComponent } from './components/token-vis/token-vis.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: TokenVisComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
