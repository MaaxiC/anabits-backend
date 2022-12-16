const createProductCard = async (products) => {
    const templateFile = await fetch("/card")
    const templateText = await templateFile.text()
    let templateCompiled = ejs.compile(templateText)
    return templateCompiled({ products })
}

const createCartProductCard = async (products) => {
    const templateFile = await fetch("/cartCard")
    const templateText = await templateFile.text()
    let templateCompiled = ejs.compile(templateText)
    return templateCompiled({ products })
}

export const createAlert = (type,title,message) => Swal.fire({
    icon:type,
    title,
    text:message,
    timer:3000,
    showConfirmButton:false
})

export const createAlertWithCallback = (type,title,message, callback) => Swal.fire({
    icon:type,
    title,
    text:message,
    timer:3000,
    showConfirmButton:false
}).then(result => window.location.replace('/'));
  
export const utils = { createProductCard, createCartProductCard, createAlert, createAlertWithCallback }