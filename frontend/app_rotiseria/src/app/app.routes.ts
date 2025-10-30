import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ErrorPage } from './pages/error-page/error-page';
import { Comida } from './pages/comidasPages/comida/comida';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Perfil } from './pages/perfilPages/perfil/perfil';
import { EditarPerfil } from './pages/perfilPages/editar-perfil/editar-perfil';
import { Resenas } from './pages/resenasPages/resenas/resenas';
import { EditarResena } from './pages/resenasPages/editar-resena/editar-resena';
import { CrearResena } from './pages/resenasPages/crear-resena/crear-resena';
import { Usuarios } from './pages/usuariosPages/usuarios/usuarios';
import { CrearUsuario } from './pages/usuariosPages/crear-usuario/crear-usuario';
import { EditarUsuario } from './pages/usuariosPages/editar-usuario/editar-usuario';
import { Comidas } from './pages/comidasPages/comidas/comidas';
import { CrearComida } from './pages/comidasPages/crear-comida/crear-comida';
import { EditarComida } from './pages/comidasPages/editar-comida/editar-comida';
import { ConfirmarPedido } from './pages/pedidosPages/confirmar-pedido/confirmar-pedido';
import { ResumenPedido } from './pages/pedidosPages/resumen-pedido/resumen-pedido';
import { Pedidos } from './pages/pedidosPages/pedidos/pedidos';
import { EditarPedido } from './pages/pedidosPages/editar-pedido/editar-pedido';
import { authsessionGuard } from './guards/authsession-guard';
import { roladminGuard } from './guards/roladmin-guard';
import { usermatchGuard } from './guards/usermatch-guard';

export const routes: Routes = [
    { path:'error', component: ErrorPage },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path:'**',redirectTo: 'error' },

    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    //perfil:
    { path: 'perfil/:id_usuario', component: Perfil, canActivate:[authsessionGuard,usermatchGuard] },
    { path: 'perfil/:id_usuario/editar', component: EditarPerfil, canActivate:[authsessionGuard,usermatchGuard] },
    //comida:
    { path: 'comidas', component: Comidas, canActivate:[authsessionGuard,roladminGuard] },
    { path: 'comidas/crear', component: CrearComida, canActivate:[authsessionGuard,roladminGuard] },
    { path: 'comida/:id_comida', component: Comida },
    { path: 'comida/:id_comida/editar', component: EditarComida, canActivate:[authsessionGuard,roladminGuard] },
    //pedidos:
    { path: 'pedidos', component: Pedidos, canActivate:[authsessionGuard] },
    { path: 'pedido/:id_pedido/editar', component: EditarPedido, canActivate:[authsessionGuard,roladminGuard] },
    { path: 'pedido/:id_comida/confirmar', component: ConfirmarPedido, canActivate:[authsessionGuard]},
    { path: 'pedido/:id_pedido/resumen', component: ResumenPedido, canActivate:[authsessionGuard] },
    //reseñas:
    { path: 'resenas/crear', component: CrearResena, canActivate:[authsessionGuard] },
    { path: 'resena/:id_resena/editar', component: EditarResena, canActivate:[authsessionGuard]},
    { path: 'resenas/:id_comida', component: Resenas },   
    { path: 'resenas', component: Resenas },
    //usuarios:
    { path: 'usuarios', component: Usuarios, canActivate:[authsessionGuard,roladminGuard] },
    { path: 'usuarios/crear', component: CrearUsuario, canActivate:[authsessionGuard,roladminGuard] },
    { path: 'usuario/:id_usuario/editar', component: EditarUsuario, canActivate:[authsessionGuard,roladminGuard] },
    
];
