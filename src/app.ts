import { envs } from "./config/envs";
import { AppRoute } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=>{
    main();
   
})();

async function main(){
    //console.log('Corriendo el main');
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoute.routes
        
    });

    server.start();
    
}


