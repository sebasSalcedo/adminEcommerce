import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var iziToast: any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  registerClient = this.fb.group({
    nombres: [
      '',
      {
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: 'blur',
      },
    ],
    apellidos: [
      '',
      {
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],

    telefono: [
      '',
      {
        Validators: [Validators.required, Validators.minLength(8)],
      },
    ],
    f_nacimiento: [
      '',
      {
        Validators: [Validators.required, Validators.minLength(8)],
      },
    ],
    dni: [
      '',
      {
        Validators: [Validators.required, Validators.minLength(8)],
      },
    ],
    genero: [
      '',
      {
        Validators: [Validators.required],
      },
    ],
  });

  //Obtener el id del parametro que se pasa por url
  public idData: string = ' ';

  /**
   * Metodo constructor
   * @param fb,  formbuilder
   * @param _globalService, variable para llamar al servicio global
   * @param router
   */
  constructor(
    private fb: FormBuilder,
    private _globalService: GlobalService,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.idData = this.router.snapshot.paramMap.get('id') || ' ';

    if (this.idData != null) {
      this.getClient();
    }
  }

  /**
   *
   */
  ngOnInit(): void {}

  /**
   *
   */
  register() {
    if (this.registerClient.valid) {
      this._globalService
        .registerData(this.registerClient.value, 'registerClienteAdmin')
        .subscribe(
          (res) => {
            this.registerClient.reset();
            iziToast.show({
              title: 'Exitoso',
              class: 'text-success',
              theme: 'dark',
              position: 'topRight',
              progressBarColor: 'rgb(0, 255, 184)',
              message: 'Se registro correctamente el dato',
            });
          },
          (err) => {
            iziToast.show({
              title: 'Error',
              class: 'text-success',
              theme: 'dark',
              position: 'topRight',
              progressBarColor: 'rgb(0, 255, 184)',
              message: 'Se ha presentado un error al registar al cliente',
            });
          }
        );
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        theme: 'dark',
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        message: 'Datos erronoes por favor verificar',
      });
    }
  }

  /**
   * Metodo que realiza la solicitud al back de obtener al cliente
   * con el id pasado por parametro
   */
  getClient() {
    this._globalService.getData('getClient/' + this.idData).subscribe(
      (res) => {
        this.registerClient.patchValue({
          nombres: res.client.nombres,
          apellidos: res.client.apellidos,
          email: res.client.email,
          telefono: res.client.telefono,
          f_nacimiento: res.client.f_nacimiento,
          dni: res.client.dni,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editar() {
    if (this.registerClient.valid) {
      this._globalService
        .updateData(this.registerClient.value, 'updatecliente/' + this.idData)
        .subscribe(
          (res) => {
            iziToast.show({
              title: 'Exito',
              class: 'text-danger',
              theme: 'dark',
              position: 'topRight',
              progressBarColor: 'rgb(0, 255, 184)',
              message: res.message,
            });
      this._router.navigate(['/panel/clientes']);

          },

          (err) => {
            iziToast.show({
              title: 'Error',
              class: 'text-danger',
              theme: 'dark',
              position: 'topRight',
              progressBarColor: 'rgb(0, 255, 184)',
              message: ' Se presento un error en la peticion',
            });

            console.log(err);
          }
        );
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        theme: 'dark',
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        message: 'Datos erronoes por favor verificar',
      });
    }
  }
}
