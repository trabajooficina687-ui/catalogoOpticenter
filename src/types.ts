export interface Product {
  id: string | number;
  titulo: string;
  descripcion: string;
  precio: string | number;
  imagenPrincipal: string;
  imagenesAdicionales: string[];
  linkPago: string;
}
