import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenasSvc } from '../../../services/resenas-svc';
import { ComidasSvc } from '../../../services/comidas';

@Component({
  selector: 'app-resenas',
  imports: [Header,Footer],
  templateUrl: './resenas.html',
  styleUrl: './resenas.css'
})
export class Resenas {

  resenas:any[]=[];
  private Comidas = new Map<number, string>();

  currentPage = 1;
  perPage = 5;
  totalPages!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resenasSvc: ResenasSvc,
    private comidasSvc: ComidasSvc
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
    this.cargarPagina(1);
    });
  }

  private cargarPagina(page: number): void {
    const rol = localStorage.getItem('rol');
    const id_usuario = localStorage.getItem('id_usuario');
    const id_comida = this.route.snapshot.paramMap.get('id_comida');
    const filter = this.route.snapshot.queryParamMap.get('filter');
    this.currentPage = page;

    if (id_comida){
      console.log('Cargar reseñas por comida')
      this.cargarResenasComida(Number(id_comida), page);
      return;
    } 

    if (filter === 'usuario' && id_usuario) {
      console.log('Cargar reseñas del usuario');
      this.cargarResenasUsuario(Number(id_usuario), page);
      return;
    }

    if (rol === 'ADMIN') {
      console.log('Cargar todas las reseñas (Admin)');
      this.cargarTodasResenas(page);
      return;
    }

    console.log('Cargar todas las reseñas (público)');
    this.cargarTodasResenas(page);
  }

  private cargarResenas(resenas: any[]): void {
    resenas.forEach((resena) => {
      const id = resena.id_comida;

      if (this.Comidas.has(id)) {
        resena.nombre_comida = this.Comidas.get(id);
      } else {
        this.comidasSvc.getComidaById(id).subscribe({
          next: (comida: any) => {
            resena.nombre_comida = comida.nombre;
            this.Comidas.set(id, comida.nombre);
          },
          error: (err) => {
            console.error(`Error al obtener comida ${id}:`, err);
            resena.nombre_comida = 'Comida no encontrada';
          }
        });
      }
    });

    this.resenas = resenas;
  }

  private cargarTodasResenas(page: number): void {
    this.resenasSvc.getResenas(page, this.perPage).subscribe({
      next: (res: any) => {
        console.log('Reseñas:', res);
        this.totalPages = Number(res.pages)
        this.cargarResenas(res.resenas);
      },
      error: (err) => {
        console.log('Error al traer reseñas:', err);
      }
    });
  }

  private cargarResenasUsuario(id_usuario: number,page: number): void {
    this.resenasSvc.getResenasByUsuario(id_usuario,page, this.perPage).subscribe({
      next: (res: any) => {
        console.log('Reseñas del usuario:', res);
        this.totalPages = Number(res.pages);
        this.cargarResenas(res.resenas);
      },
      error: (err) => {
        console.log('Error al traer reseñas del usuario:', err);
      }
    });
  }

  private cargarResenasComida(id_comida: number,page: number): void {
    this.resenasSvc.getResenasByComida(id_comida,page, this.perPage).subscribe({
      next: (res: any) => {
        console.log('Reseñas de la comida:', res);
        this.totalPages = Number(res.pages);
        this.cargarResenas(res.resenas);
      },
      error: (err) => {
        console.log('Error al traer reseñas de la comida:', err);
      }
    });
  }


  eliminarResena(id_resena:any) {
    this.resenasSvc.deleteResena(id_resena).subscribe({
      next: (res:any)=>{
        console.log("Reseña eliminado: ",res);
      },
      error: (err)=>{
        console.log("Error al reseña usuario: ",err)
      }
    })
    this.cargarPagina(1);
  }

  goToEditarResena(id_resena:any){
    console.log("redirigido a editar reseña en:  /resena",id_resena,"editar" )
    this.router.navigate(['/resena',id_resena,'editar'])
  }


  showEditDeleteButtons(resena_id_usuario:number){
    const rol=localStorage.getItem('rol')
    const id_usuario=Number(localStorage.getItem('id_usuario'))
    if (rol==='ADMIN'||id_usuario===resena_id_usuario){
      return true
    } else{
      return false
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.cargarPagina(this.currentPage + 1);
    } else {
      return
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.cargarPagina(this.currentPage - 1);
    } else {
      return
    }
  }

}
