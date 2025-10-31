interface PedidoPostRequest{
    id_usuario: number;
    fecha: String
    estado: string, 
    total: string,
    comidas: Array<number>,
}