import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { CreateEmployeeComponent} from './employee/create-employee.component';
import { ListEmployeeComponent} from './employee/list-employee.component';
import { ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path :"Home" , component :HomeComponent},
  {path :"create" , component :CreateEmployeeComponent},
  {path :"list" , component :ListEmployeeComponent},
  {path :"Contact" , component :ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
