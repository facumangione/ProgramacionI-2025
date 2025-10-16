import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    this.config.fields.forEach((field: any) => {
      if (this.infoActual[field.name] !== undefined) {
        field.value = this.infoActual[field.name];
      }
    });
  }

  isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

}