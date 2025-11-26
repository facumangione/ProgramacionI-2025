import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailMasivoService } from '../../../services/email-masivo';
import { Formulario } from '../../../components/formulario/formulario';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-enviar-email-masivo',
  imports: [Header, Footer, Formulario],
  templateUrl: './enviar-mail-masivo.html',
  styleUrl: './enviar-mail-masivo.css'
})
export class EnviarEmailMasivo {
  
  formConfig: any;
  emailForm!: FormGroup;

  constructor(
    public router: Router, 
    private location: Location,
    private formBuilder: FormBuilder,
    private emailMasivoService: EmailMasivoService
  ) {
    this.emailForm = this.formBuilder.group({
      asunto: ['', [Validators.required, Validators.minLength(1)]],
      mensaje: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.formConfig = {
      title: 'Enviar Email Masivo',
      cancelRoute: this.goBack.bind(this),
      submitText: 'ENVIAR A TODOS LOS USUARIOS',
      formGroup: this.emailForm,
      fields: [
        { 
          label: 'Asunto del Email:',
          type: 'text',
          formControlName: "asunto",
          name: 'asunto',
          value: '',
          placeholder: "Escribe el asunto del mail enviado...",
          required: true 
        },
        { 
          label: 'Mensaje:',
          type: 'textarea',
          formControlName: "mensaje",
          name: 'mensaje',
          value: '',
          placeholder: "Escribe el mensaje que se enviará a todos los usuarios...",
          required: true 
        }
      ]
    };

    this.enviarEmail = this.enviarEmail.bind(this);
  }

  goBack() {
    this.location.back(); 
  }

  enviarEmail() {
    if (this.emailForm.invalid) {
      console.error('Formulario inválido');
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    const formData = this.emailForm.value;

    const confirmacion = confirm(
      `¿Estás seguro de enviar este email a TODOS los usuarios?\n\n`
    );

    if (!confirmacion) {
      return;
    }

    console.log('Enviando email masivo:', formData);

    this.emailMasivoService.enviarEmailMasivo(
      formData.asunto,
      formData.mensaje
    ).subscribe({
      next: (res) => {
        console.log('Emails enviados:', res);
        this.emailForm.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al enviar email masivo:', err);
        alert(' Error al enviar emails. Por favor intente nuevamente.');
      }
    });
  }
}