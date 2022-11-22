
export const typeDefs = `#graphql
    input ProductInput {
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Float
        stock: Int
    }

    type Product {
        id: ID
        nombre: String
        descripcion: String
        codigo: String
        foto: String
        precio: Float
        stock: Int
        timestamp: String
    }

    type Query {
        getProducts: [Product]
        getProduct(id:ID): Product
    }

    type Mutation {
        addProduct(createFields: ProductInput) : Product
        updateProduct(id:ID, updateFields: ProductInput) : Product
        deleteProduct(id:ID) : String
    }
`