import { PersistenceFactory } from "../daos/factory.js"

class CartService {
    constructor() {
        this.cartsDao;
        this.init();
    }

    init = async () => {
        const { carts } = await PersistenceFactory.getPersistence();
        this.cartsDao = carts;
    }

    getCarts = async () => {
        return await this.cartsDao.getAll();
    }

    getCart = async (id) => {
        return await this.cartsDao.getById(id);
    }

    addCart = async (cart) => {
        return await this.cartsDao.save(cart);
    }

    updateCart = async (id, cart) => {
        return await this.cartsDao.update(id, cart);
    }

    deleteCart = async (id) => {
        return await this.cartsDao.deleteById(id);
    }
}

const cartService = new CartService();

export default cartService;