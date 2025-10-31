import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { Formulario } from '../../../components/formulario/formulario';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PedidosSvc } from '../../../services/pedidos-svc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-editar-pedido',
  imports: [Header,Footer,Formulario],
  templateUrl: './editar-pedido.html',
  styleUrl: './editar-pedido.css'
})
export class EditarPedido {

  pedido: any;
  formConfig: any;
  pedidoForm!: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private location: Location, 
    private pedidosSvc: PedidosSvc,
    private formBuilder: FormBuilder
  ) {this.pedidoForm = this.formBuilder.group({
      id_pedido: ['', [Validators.required]],
      id_usuario: ['', [Validators.required]],
      comidas: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      total: ['', [Validators.required]]
    })}

  ngOnInit() {
    this.formConfig = {
      title: 'Editar Pedido',
      cancelRoute: this.goBack.bind(this),
      submitText: 'EDITAR PEDIDO',
      formGroup: this.pedidoForm,
      fields: [
        { label: 'ID_PEDIDO:',
          type: 'number',
          formControlName: "id_pedido",
          name: 'id_pedido',
          value: '',
          placeholder: "ID del pedido",
          required: true,
          readonly: true,
        },
        { 
          label: 'Comidas:', 
          type: 'text', 
          formControlName: "comidas",
          name: 'comidas',
          value: '',
          placeholder: "Comida del pedido",
          required: false,
          readonly: true,
        },
        { 
          label: 'Estado', 
          type: 'select', 
          formControlName: "estado",
          name: 'estado',
          value: null,
          required: true,
          options: [
            { value: null, label: 'Seleccionar estado...',disabled: true },
            { value: "EN PREPARACION", label: "EN PREPARACION" },
            { value: "LISTO", label: "LISTO" },
            { value: "ENTREGADO", label: "ENTREGADO" },
          ]
        },
        { label: 'FECHA:',
          type: 'text',
          formControlName: "fecha",
          name: 'fecha',
          value: '',
          placeholder: "DD-MM-YYYY HH:MM",
          required: true,
          disabled: true,
          readonly: true,
        },
        { label: 'TOTAL:',
          type: 'text',
          formControlName: "total",
          name: 'total',
          value: '',
          placeholder: "total",
          required: true,
          disabled: true ,
          readonly: true,
        },
      ]
    };

    this.editarPedido=this.editarPedido.bind(this);

    const id = Number(this.route.snapshot.paramMap.get('id_pedido'));

    this.pedidosSvc.getPedidoById(id).subscribe({
      next: (res) => {
        console.log('Pedido encontrado:', res);
        const nombresComidas = res.comidas && res.comidas.length > 0
          ? res.comidas.map((c: any) => c.nombre).join(', ')
          : 'Sin comidas';
        this.pedido = {
          id_pedido: res.id_pedido,
          comidas: nombresComidas,
          estado: res.estado,
          fecha: res.fecha,
          total: `${res.total}`
        }
      },
      error: (err) => {
        console.error('Error al cargar pedido:', err);
      }
    });

  }

  goBack() {
    this.location.back(); 
  }

  editarPedido(){

    const formData = this.pedidoForm.value;

    this.pedidosSvc.putPedido({
      fecha: formData.fecha,
      estado: formData.estado,
      total: formData.total
      },
      this.pedido.id_pedido
    ).subscribe({
      next: (res) => {
        console.log('Pedido editado exitosamente:', res);
        alert('Pedido editado exitosamente');
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        console.error('Error al editar pedido:', err);
        alert('Error al editar pedido');
      }
    });
  }

}
