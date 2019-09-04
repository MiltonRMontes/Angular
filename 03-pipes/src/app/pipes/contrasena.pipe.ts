import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: any, activado: boolean = true): any {
    if (activado) {
      // let password = "";
      // for (let i in value) {
      //   password += "*";
      // }
      // return password;
      return "*".repeat(value.length);
    }

    return value;

  }

}
