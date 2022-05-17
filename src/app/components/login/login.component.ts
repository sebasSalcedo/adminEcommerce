import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';


declare var iziToast: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public token: any = '';

  constructor(private _globalService: GlobalService, private _router: Router) {
    this.token = this._globalService.gettoken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/']);
    }
  }

  login(formLogin: any) {
    if (formLogin.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      };

      this._globalService.login(data).subscribe(
        (res) => {
          if (res.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              class: 'text-danger',
              titleColor: '#ff0000',
              color: '#fff',
              position: 'topRight',
              message: res.message,
            });
          } else {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(res.data));

            localStorage.setItem('_id', JSON.stringify(res.data._id));
            this._router.navigate(['/']);

            iziToast.show({
              title: 'Hola!!!',
              class: 'text-danger',
              titleColor: '#16A085',
              position: 'topRight',
              message: 'Bienvenido.',
            });
          }
        },

        (err) => {
          console.log(err);
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            titleColor: '#ff0000',
            color: '#fff',
            position: 'topRight',
            message: err.error.message,
          });
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        titleColor: '#ff0000',
        color: '#fff',
        position: 'topRight',
        message: 'Datos incorrectos',
      });
    }
  }
}
