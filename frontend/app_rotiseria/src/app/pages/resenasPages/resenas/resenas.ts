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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resenasSvc: ResenasSvc,
    private comidasSvc: ComidasSvc
  ) {}

  ngOnInit() {
    const rol = localStorage.getItem('rol');
    const id_usuario = localStorage.getItem('id_usuario');
    const id_comida = this.route.snapshot.paramMap.get('id_comida');
  
    if (id_comida){
      console.log('Cargar reseñas por comida')
      this.cargarResenasComida(Number(id_comida));
      return;
    } 

    if (rol === 'ADMIN') {
      this.cargarTodasResenas();
    } else if (rol === 'CLIENTE' && id_usuario) {
      this.cargarResenasUsuario(Number(id_usuario));
    }
      
      
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

  private cargarTodasResenas(): void {
    this.resenasSvc.getResenas().subscribe({
      next: (res: any) => {
        console.log('Reseñas:', res);
        this.cargarResenas(res.resenas);
      },
      error: (err) => {
        console.log('Error al traer reseñas:', err);
      }
    });
  }

  private cargarResenasUsuario(id_usuario: number): void {
    this.resenasSvc.getResenasByUsuario(id_usuario).subscribe({
      next: (res: any) => {
        console.log('Reseñas del usuario:', res);
        this.cargarResenas(res.resenas);
      },
      error: (err) => {
        console.log('Error al traer reseñas del usuario:', err);
      }
    });
  }

  private cargarResenasComida(id_comida: number): void {
    this.resenasSvc.getResenasByComida(id_comida).subscribe({
      next: (res: any) => {
        console.log('Reseñas de la comida:', res);
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
    window.location.reload();
  }

  goToEditarResena(id_resena:any){
    console.log("redirigido a editar reseña en:  /resena",id_resena,"editar" )
    this.router.navigate(['/resena',id_resena,'editar'])
  }

  goToCrearResena(){
    console.log("redirigido a crear reseña")
    this.router.navigate(['/resenas/crear'])
  }

  isUserAdmin(){
    const rol=localStorage.getItem('rol')
    if (rol==='ADMIN'){
      return true
    } else{
      return false
    }
  }

}
