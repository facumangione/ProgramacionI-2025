import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResenasSvc } from '../../../services/resenas-svc';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-editar-resena',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-resena.html',
  styleUrl: './editar-resena.css'
})
export class EditarResena {

  formConfig: any;
  resena: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private resenaSvc: ResenasSvc,
    private comidaSvc: ComidasSvc
  ) {}

  ngOnInit() {
    const id_resena = Number(this.route.snapshot.paramMap.get('id_resena')); 

    this.formConfig = {
      title: 'Editar Reseña',
      cancelRoute: this.goBack.bind(this),
      submitText: 'GUARDAR CAMBIOS',
      fields: [
        {
          label: 'Comida:',
          type: 'text', 
          name: 'nombre_comida',
          required: false,
          readonly: true,
        },
        { 
          label: 'Calificación:', 
          type: 'select', 
          name: 'calificacion',
          options: [
            { value: 1, label: '1 - Muy malo' },
            { value: 2, label: '2 - Malo' },
            { value: 3, label: '3 - Regular' },
            { value: 4, label: '4 - Bueno' },
            { value: 5, label: '5 - Excelente' }
          ]
        },
        { label: 'Comentario:',
          type: 'text', 
          name: 'comentario', 
          required: true
        },
      ]
    };

    this.editarResena=this.editarResena.bind(this);

    this.resenaSvc.getResenaById(id_resena).subscribe({
      next: (res) => {
        console.log('Reseña encontrada:', res);
        this.resena = res;

        this.comidaSvc.getComidaById(res.id_comida).subscribe({
          next: (comida: any) => {
            console.log('Comida asociada:', comida.nombre);
            this.resena = {
              ...this.resena,
              nombre_comida: comida.nombre
            };  
          },
          error: (err) => {
            console.error('Error al obtener la comida:', err);
            this.resena.nombre_comida = 'Comida no encontrada';
          },
        });
      },
      error: (err) => {
        console.error('Error al traer reseña:', err);
      },
    });

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarResena(fields: any){
    console.log('Reseña actualizada:', this.resena.id_resena);
    //this.router.navigate(['/resenas', this.resena.id_resena]);
  }

}