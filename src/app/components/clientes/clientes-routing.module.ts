import { CreateClientComponent } from './create-client/create-client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexClientesComponent } from './index-clientes/index-clientes.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [

    {path: 'panel',  children:[

        {path: 'clientes', component:IndexClientesComponent, canActivate:[AdminGuard]},
        {path: 'clientes/registro', component:CreateClientComponent, canActivate:[AdminGuard]},


    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
