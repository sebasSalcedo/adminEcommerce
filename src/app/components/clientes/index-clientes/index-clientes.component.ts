import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { rutas } from '../../../services/rutas_back';
import { NgForm } from '@angular/forms';
declare var iziToast: any;

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css'],
})
export class IndexClientesComponent implements OnInit {
  public list_client: any[] = [];
  public urls;

  public filter_surname: string = '';
  public filter_email: string = '';


  public page = 1;
  public pageSize =20;

  constructor(private _globalSerive: GlobalService) {
    this.urls = rutas;
  }

  ngOnInit(): void {
    this.listClient();
  }

  /**
   *
   */
  public listClient() {
    this._globalSerive.filterData('', '').subscribe(
      (res) => {
        if (res.status == 'Error') {
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            titleColor: '#ff0000',
            color: '#fff',
            position: 'topRight',
            message: res.message,
          });
        } else {
          this.list_client = res.client;

          iziToast.show({
            theme: 'dark',
            icon: 'icon-person',
            title: 'Clientes',
            message: res.message,
            position: 'topRight',
            progressBarColor: 'rgb(0, 255, 184)',
          });
        }
      },

      (err) => {
        console.log(err);
      }
    );
  }

  public filtro(tipo: string) {
    var filter = tipo == 'apellidos' ? 'apellidos' : 'email' ;

    var textFilter = tipo == 'apellidos' ? this.filter_surname : this.filter_email;

 

  this._globalSerive.filterData(filter, textFilter).subscribe(
    (res) => {
      console.log(res);

      if (res.status == 'Error') {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          titleColor: '#ff0000',
          color: '#fff',
          position: 'topRight',
          message: res.message,
        });
      } else {
        this.list_client = res.cliente;

        if (res.cliente.length == 0) {
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            titleColor: '#ff0000',
            color: '#fff',
            position: 'topRight',
            message:  'No existe ese registro',
          });
        }
       
      }
    },

    (err) => {
      console.log(err);
    }
  );
 
  }
}
