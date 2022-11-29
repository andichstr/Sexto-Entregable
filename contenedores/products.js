class Products {
    constructor(){
        /*
        Array with this type of objects:
            {
                id: Number (increased by this class automatically),
                title: String,
                price: Number,
                thumbnail: String
            }
        */
        this.products = [];
    }

    getAll(){
        return this.products;
    }

    getProduct(id){
        const product = this.products.find(element => element.id === id);
        return product ? product : {error: 'producto no encontrado'};
    }

    addProduct(product){
        if (this.products.length == 0){
            product['id'] = 1;
            this.products.push(product);
            return 1;
        }
        const id = this.products[this.products.length-1].id + 1;
        product.id = id;
        this.products.push(product);
        return id;
    }

    editProduct(id, product){
        const index = this.products.findIndex(element => element.id == id);
        if (this.products[index]) {
            product.id = this.products[index].id;
            this.products[index] = product;
            return `Producto con id: ${id} fue editado correctamente.`
        }
        return {error: 'producto no encontrado'};
    }

    deleteProduct(id){
        const index = this.products.findIndex(element => element.id === id);
        if(this.products[index]){
            this.products.splice(index, 1);
            return `Producto con id: ${id} fue borrado correctamente.`
        }
        return {error: 'producto no encontrado'};
    }
}

module.exports=Products;