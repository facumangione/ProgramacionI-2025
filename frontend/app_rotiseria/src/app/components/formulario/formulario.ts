import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})

export class Formulario implements OnInit{

  @Input() config: any;
  @Input() infoActual: any;
  @Input() funcionGuardarCambio: any

  ngOnInit() {
    if (this.infoActual && this.config) {
      this.config.fields.forEach((field: any) => {
        if (this.infoActual[field.name] !== undefined) {
          field.value = this.infoActual[field.name];
        }
      });
    }
  }

  isFunction(value: any): value is Function {
    return typeof value === 'function';
  }

}


