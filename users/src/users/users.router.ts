import { Server } from "restify";
import { Router } from "../common/router"
import { User } from './users.model';

class UsersRouter extends Router{

    constructor(){

        super()
        
        this.on('beforeRender',document=>{
            document.password = undefined;
        })
        
    }
    applyRouters(application: Server) {

        //Lista os usuários cadatrados
        application.get('/users', (req, resp, next)=>{
            User.find().then(this.render(resp, next))
        })

        //Busca usuário por Id
        application.get('/users/:id',(req, resp, next)=>{
            User.findById(req.params.id).then(this.render(resp, next))
        })

        //inclusão de usuário
        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(this.render(resp, next))

        })

        //Edita um usuário
        application.put('/users/:id', (req, resp, next) => {
            User.findByIdAndUpdate(req.params.id, req.body)
                .exec()
                .then(this.render(resp, next)).then(null, function(err) {
                    console.error(err);
                    resp.send(err);
                    return next();
                });
        })

        //Apagar um usuário
        application.del('/users/:id', (req, resp, next) => {
            User.deleteOne(req.params.id).then(this.render(resp, next)).catch(err =>{
                console.log(err)
                return next()
            })
        })
    }
}

export const usersRouter = new UsersRouter()