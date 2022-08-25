const createProductCard = async (products) => {
    const templateFile = await fetch("/card")
    const templateText = await templateFile.text()
    let templateCompiled = ejs.compile(templateText)
    return templateCompiled({ products })
}
  
export const utils = { createProductCard }