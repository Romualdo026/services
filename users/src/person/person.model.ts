import * as mongoose from 'mongoose';

export interface Person extends mongoose.Document{
    name: string,
    cpf: string,
    email: string
}