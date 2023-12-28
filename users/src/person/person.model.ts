import * as mongoose from 'mongoose';

export interface Person extends mongoose.Document{
    name: string,
    cpf: string,
    email: string,
    birthday: Date
}

const personSchema = new mongoose.Schema({
    name:{
        type: String
    },
    cpf:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    birthday:{
        type: Date
    }
})

export const Person = mongoose.model<Person>('Person', personSchema)