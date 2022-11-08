export class ProductDTO {
    constructor(product) {
        this.id = product._id??product.id;
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
    }
}