import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-pedido',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-pedido.html',
  styleUrl: './editar-pedido.css'
})
export class EditarPedido {

  pedido={
    id_pedido:1,
    id_usuario:1,
    fecha:'12/4/25',
    estado:'EN PREPARACIÓN',
    total: 1500,
    comida:'Spaghetti a la Fileto'
  };

  formConfig: any;

  constructor(private route: ActivatedRoute,public router: Router, private location: Location) {}

  ngOnInit() {
    this.formConfig = {
      title: 'Editar Pedido',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR PEDIDO',
      fields: [
        { label: 'ID_PEDIDO:',
          type: 'text',
          name: 'id_pedido',
          value: '',
          placeholder: "Nombre y apellido completo...",
          required: true 
        },
        { 
          label: 'Comida:', 
          type: 'select', 
          name: 'comida',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar comida...',disabled: true },
            { value: "Spaghetti a la Fileto", label: "Spaghetti a la Fileto" },
            { value: "Lasagna", label: "Lasagna" },
            { value: "Ñoquis a la sazón", label: "Ñoquis a la sazón" },
          ]
        },
        { 
          label: 'Estado', 
          type: 'select', 
          name: 'estado',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar estado...',disabled: true },
            { value: "EN PREPARACIÓN", label: "EN PREPARACIÓN" },
            { value: "LISTO", label: "LISTO" },
            { value: "ENTREGADO", label: "ENTREGADO" },
          ]
        },
        { label: 'FECHA:',
          type: 'text',
          name: 'FECHA',
          value: '',
          placeholder: "fecha",
          required: true 
        },
        { label: 'TOTAL:',
          type: 'text',
          name: 'total',
          value: '',
          placeholder: "total",
          required: true 
        },
      ]
    };

    this.editarPedido=this.editarPedido.bind(this);

  }

  goBack() {
    this.location.back(); 
  }

  //Deberia realizar el PUT, en el estado de ahora no trae los campos ingresados
  editarPedido(fields: any){
    console.log('Pedido actualizado:', this.pedido.id_pedido);
    this.router.navigate(['/pedidos']);
  }

}
