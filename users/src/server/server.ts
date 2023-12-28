import * as restify from 'restify'
import { environment } from '../common/environment'
import { Router } from '../common/router'
import mongoose from 'mongoose'

export class Server {

    application!: restify.Server

    initializeDb(){
        return mongoose.connect(environment.db.url)
    }

    intRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {
                this.application = restify.createServer({
                    name: 'BackEnd_app',
                    version: '1.0.0'
                })
                
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                for (let router of routers) {
                    router.applyRouters(this.application);
                }
                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=>
            this.intRoutes(routers).then(()=>this))
    }
}