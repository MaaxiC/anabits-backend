import { PersistenceFactory } from "../daos/factory.js"

class ProductService {
    constructor() {
        this.productsDao;
        this.init();
    }

    init = async () => {
        const { products } = await PersistenceFactory.getPersistence();
        this.productsDao = products;
    }

    getProducts = async () => {
        return await this.productsDao.getAll();
    }

    getProduct = async (id) => {
        return await this.productsDao.getById(id);
    }

    addProduct = async (product) => {
        return await this.productsDao.save(product);
    }

    updateProduct = async (id, product) => {
        return await this.productsDao.update(id, product);
    }

    deleteProduct = async (id) => {
        return await this.productsDao.deleteById(id);
    }
}

const productService = new ProductService();

export default productService;