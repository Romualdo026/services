import * as restify from 'restify'
import { EventEmitter } from 'events';

export abstract class Router extends EventEmitter{
  abstract applyRouters(application: restify.Server) : any

  render(response: restify.Response, next: restify.Next){
    return (document: any)=>{
      if (document) {
        this.emit('beforeRender', document)
        response.json(document);
      }else{
        response.send(404);
      }
      return next();
    }
  }
}
