import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';

import { IndexClientesComponent } from './index-clientes/index-clientes.component';
import { CreateClientComponent } from './create-client/create-client.component';



const routes: Routes = [

    {path: 'panel',  children:[

        {path: 'clientes', component:IndexClientesComponent, canActivate:[AdminGuard]},
        {path: 'clientes/registro', component:CreateClientComponent, canActivate:[AdminGuard]},
        {path: 'clientes/editar/:id', component:CreateClientComponent, canActivate:[AdminGuard]},



    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
