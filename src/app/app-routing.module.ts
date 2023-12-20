import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "home", component: HomeComponent , canActivate:[AuthGuard]},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
 //{ path: "home", component: HomeComponent }
  //{ path: "profile", redirectTo: "/home", pathMatch: "full" },
  //{ path: "", redirectTo: "/profile", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
