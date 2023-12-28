import { Server } from "restify";
import { Router } from "../common/router"
import { Person } from "./person.model";

class PersonRouter extends Router {

    applyRouters(application: Server) {

        //Lista de pessoas cadatrados
        application.get('/persons', (req, resp, next) => {
            Person.find().then(this.render(resp, next))
        })

        //Busca usuário por Id
        application.get('/persons/:id', (req, resp, next) => {
            Person.findById(req.params.id).then(this.render(resp, next))
        })

        //inclusão de uma pessoa
        application.post('/persons', (req, resp, next) => {
            let person = new Person(req.body)
            person.save().then(this.render(resp, next))
        })

        //Apagar um usuário
        application.del('/persons/:id', (req, resp, next) => {
            Person.deleteOne(req.params.id).then(this.render(resp, next)).catch(err => {
                console.log(err)
                return next()
            })
        })


    }
}