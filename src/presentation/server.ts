import express, { Router } from 'express'
import path from 'path';


interface serverOptions{
    port: number,
    public_path?: string,
    routes: Router
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: serverOptions){

        const {routes, port, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;

    }

    async start(){
        //console.log('server running')
        //* Middlewears 
        this.app.use(express.json()); //* leer el body que viene en formato JSON
        this.app.use(express.urlencoded()); //* leer el body que viene en formato urlencoded


        //* Public Folders
        this.app.use( express.static(this.public_path))

        //* Routes o rutas

        this.app.use(this.routes)

        // this.app.get('/api/todos',(req, res)=>{
        //     res.json([{
        //         id: 1,
        //         message: "Buy more milk",
        //         createdAt: new Date()
        //     },{
        //         id: 2,
        //         message: "Buy more meat",
        //         createdAt: new Date()    
        //     }]);
        // });



        //* Ayuda a los routers del SPA
        this.app.get('*',(req, res)=>{

            const indexPath = path.join(__dirname+ `../../../${this.public_path}/index.html`)
            res.sendFile(indexPath);

        });

        //* /////////////////////////////////////////////
        this.app.listen(this.port, ()=>{
            console.log(`Server running in port ${this.port}`)
        })
    }
}

