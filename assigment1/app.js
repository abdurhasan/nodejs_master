const http = require('http');
const port = process.env.PORT || 3000
const url = require('url')

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    //chosen handler, give 'hello' for root ( / ) and Not found for default
    let chosenHandler = trimmedPath === '' ? router['hello'] : typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;


    chosenHandler((statusCode, payload) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(JSON.stringify(payload))

    })
})

server.listen(port, () => console.log(`IS Running on : ${port}`))


let handlers = {};
handlers.hello = function (callback) {
    callback(200, { 'welcome': 'hello world is Me' })
}
//Notfound handler
handlers.notFound = function (callback) {
    callback(404, { 'message': 'Not found page' })
}
// define a request routers 

let router = {
    'hello': handlers.hello,

}