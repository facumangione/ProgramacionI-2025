import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})

export class Formulario implements OnInit, OnChanges {

  @Input() config: any;
  @Input() infoActual: any;
  @Input() funcionGuardarCambio: any

  archivo: string = '';

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['infoActual'] && this.infoActual && this.config) {
      this.actualizarCampos();
    }
  }

  actualizarCampos() {
    if (this.config?.formGroup) {
      setTimeout(() => {
        const datosParaPatch = { ...this.infoActual };
        
        if (datosParaPatch.imagen) {
          const nombreArchivo = datosParaPatch.imagen.split('\\').pop().split('/').pop();
          this.archivo = nombreArchivo;
          datosParaPatch.imagen = nombreArchivo;
        }
        
        this.config.formGroup.patchValue(datosParaPatch);
      });
    }
  }

  onFileChange(event: any, formControlName: string) {
    const file = event.target.files[0];
    if (file) {
      const nombreArchivo = file.name;
      this.config.formGroup.patchValue({
        [formControlName]: nombreArchivo
      });
    }
  }


  isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

}