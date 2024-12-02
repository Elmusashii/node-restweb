import http from 'http'
import fs from 'fs'

const server =  http.createServer((req, res)=>{

    console.log(req.url);

    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write(`<h1>Holaaaa desde la url: ${req.url}</h1>`)
    // // res.end()

    // const data = {
    //     name: 'Carlos',
    //     age: '23',
    //     city: 'Asuncion'
    // }

    // res.writeHead(200, {'Content-Type':'application/json'})
    // res.write(JSON.stringify(data))
    // res.end();
/*
    if(req.url==='/'){
        const HtmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(HtmlFile)
        
        res.end();
    }else if ( req.url==='/css/style.css') {
        
        const CssFile = fs.readFileSync('./public/css/style.css', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(CssFile)

        res.end();
    }else if ( req.url==='/js/app.js') {
        
        const JsFile = fs.readFileSync('./public/js/app.js', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/js'});
        res.write(JsFile)

        res.end();
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }   

*/
if(req.url==='/' ){
    const HtmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(HtmlFile)
    
    return;
}

if(req.url?.endsWith('.js')){
    res.writeHead(200, {'Content-Type': 'application/javascript'});
} else if(req.url?.endsWith('.css')){
    res.writeHead(200, {'Content-Type': 'text/css'});
}

const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
res.end(responseContent)

});

server.listen(8080, ()=>{
    console.log("El servidor se encuentra corriendo en el puerto 8080");
});