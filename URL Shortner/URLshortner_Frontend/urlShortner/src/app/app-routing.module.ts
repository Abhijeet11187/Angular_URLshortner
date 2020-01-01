import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { EnterURLComponent } from './enter-url/enter-url.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path:'',redirectTo:'homePage',pathMatch:'full'},
{path:'signUp',component:SignupComponent},
{path:'enterURL',component:EnterURLComponent},
{path:'enterURL/:userName',component:EnterURLComponent},
{path:'homePage',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
