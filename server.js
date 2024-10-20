const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceHtml = require('./module');

let html;
try {
    html = fs.readFileSync('./index.html', 'utf-8');
} catch (err) {
    console.error("Error reading index.html:", err);
}
let products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
let productListItem = fs.readFileSync('./productList.html', 'utf-8');
let productDetailItem = fs.readFileSync('./product-details.html', 'utf-8');
let contacts=fs.readFileSync('./contacts.html','utf-8')

const server = http.createServer((request, response) => {
    let { query, pathname: path } = url.parse(request.url, true);
    console.log(`Received request for: ${path}`);
    if (path === '/home' || path === '/') {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', 'You are on the home page'));
    } else if(path === '/contactus'){
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', contacts));
    } else if (path === '/products') {
        if (!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListItem, prod);
            });
            response.writeHead(200, { 'content-type': 'text/html' });
            let productResponse = html.replace('{{%CONTENT%}}', productHtmlArray.join(''));
            response.end(productResponse);
        } else {
            let prod = products.find(p => p.id === Number(query.id));
            if (prod) {
                let productDetailResponseHtml = replaceHtml(productDetailItem, prod);
                response.writeHead(200, { 'content-type': 'text/html' });
                response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
            } else {
                response.writeHead(404, { 'content-type': 'text/html' });
                response.end(html.replace('{{%CONTENT%}}', 'Product not found'));
            }
        }
    } else {
        response.writeHead(404, { 'content-type': 'text/html' });
        response.end(html.replace('{{%CONTENT%}}', 'Page not found'));
    }
});

server.listen(5500, '127.0.0.1', () => {
    console.log("Server has started on port 5500");
});