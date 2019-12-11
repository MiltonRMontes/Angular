import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: object = {
    nombreCompleto: {
      nombre: 'Milton',
      apellido: 'Montes'
    },
    correo: 'miltonmontes17@gmail.com',
    //pasatiempos: ['Comer', 'Dormir', 'Jugar']
  };

  constructor() {
    console.log(this.usuario);
    this.forma = new FormGroup({

      nombreCompleto: new FormGroup({

        nombre: new FormControl('', [Validators.required,
        Validators.minLength(3)
        ]),
        apellido: new FormControl('', [Validators.required,
                                      this.noMontes
                                    ])
      }),
      correo: new FormControl('', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('Comer', Validators.required)
      ])

    });

    //this.forma.reset(this.usuario);

  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noMontes(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'montes') {
      return {
        nomontes: true
      }
    }
    return null;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });
  }
}
