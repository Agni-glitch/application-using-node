const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceHtml = require('./module');

let html = fs.readFileSync('./index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
let productListItem = fs.readFileSync('./productList.html', 'utf-8');
let productDetailItem = fs.readFileSync('./product-details.html', 'utf-8');

const server = http.createServer();

server.on('request', (request, response) => {
    let { query, pathname: path } = url.parse(request.url, true);

    if (path === '/html' || path === '/home' || path === '/') {
        response.end(html.replace('{{%CONTENT%}}', 'you are in home page'));
    } else if (path === '/products') {
        if (!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListItem, prod);
            });
            response.writeHead(200, { 'content-type': 'text/html' });
            let productResponse = html.replace('{{%CONTENT%}}', productHtmlArray.join(''));
            response.end(productResponse);
        } else {
            let prod = products[query.id];
            if (prod) {
                let productDetailResponseHtml = replaceHtml(productDetailItem, prod);
                response.writeHead(200, { 'content-type': 'text/html' });
                response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
            } else {
                response.writeHead(404, { 'content-type': 'text/html' });
                response.end('Product not found');
            }
        }
    } else {
        response.writeHead(404, { 'content-type': 'text/html' });
        response.end('Page not found');
    }
});

server.listen(9000, '127.0.0.1', () => {
    console.log("Server has started");
});