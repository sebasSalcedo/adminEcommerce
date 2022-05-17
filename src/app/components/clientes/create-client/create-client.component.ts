import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  registerClient = this.fb.group({
    nombres: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
        updateOn: 'blur',
      },
    ],
    apellidos: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
        ],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.email,
          
        ],
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
    dni : [
      '',
      {
        Validators: [Validators.required, Validators.minLength(8)],
      },
    ]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
