export const generateProductErrorInfo = product => {
    return `
    Uno o mas properties están incompletos o no son validos.
    Lista de properties obligatorios:
        - title: Must be a String (${product.title})
        - description: Must be a String (${product.description})
        - code: Must be a Number (${product.code})
        - price: Must be a Number (${product.price})
        - stock: Must be a Number (${product.stock})
        - category: Must be a String (${product.category})
    `
}

export const generateProductCodeError = code => {
    return `
    El código de producto ${code} ya existe.
    `
}