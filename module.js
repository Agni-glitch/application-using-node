module.exports= function replaceHtml(template,product){
    let output=template.replace(/{{%IMAGE%}}/g,product.productImage)
    output=output.replace(/{{%NAME%}}/g,product.name)
    output=output.replace(/{{%MODELNAME%}}/g,product.modeName)
    output=output.replace(/{{%MODELNO%}}/g,product.modelNumber)
    output=output.replace(/{{%SIZE}}/g,product.size)
    output=output.replace(/{{%CAMERA%}}/g,product.camera)
    output=output.replace(/{{%PRICE%}}/g,product.price)
    output=output.replace(/{{%COLOR%}}/g,product.color)
    output=output.replace(/{{%ROM%}}/g,product.ROM)
    output=output.replace(/{{%ID%}}/g,product.id)
    output=output.replace(/{{%DESC%}}/g,product.Description)
    return output
}