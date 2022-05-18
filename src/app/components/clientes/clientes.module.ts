import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexClientesComponent } from './index-clientes/index-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './create-client/create-client.component';




@NgModule({
  declarations: [
    IndexClientesComponent,
    CreateClientComponent,
    
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class ClientesModule { }
