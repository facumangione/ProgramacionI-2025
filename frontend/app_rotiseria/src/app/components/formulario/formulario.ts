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

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['infoActual'] && this.infoActual && this.config) {
      this.actualizarCampos();
    }
  }

  actualizarCampos() {
  if (this.config?.formGroup) {
    setTimeout(() => {
      this.config.formGroup.patchValue(this.infoActual);
    });
  }
}


  isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

}