import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

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
      ]),
      userName: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()

    });

    //this.forma.reset(this.usuario);

    this.forma.controls['password2'].setValidators([
        Validators.required,
        this.noIgual.bind(this.forma)
    ]);

    this.forma.controls['userName'].valueChanges
        .subscribe(data =>{
          console.log(data);
        });

    this.forma.controls['userName'].statusChanges
        .subscribe(data =>{
          console.log(data);
        });
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

  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<any>|Observable<any>{
    let promesa = new Promise(
      (resolve, reject) =>{

        setTimeout(() =>{
          if( control.value  === 'strider'){
            resolve ({existe: true});
          } else{
            resolve (null);
          }
        }, 3000);

      }
    );
    return promesa;
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
