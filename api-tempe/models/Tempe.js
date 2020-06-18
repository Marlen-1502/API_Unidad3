'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TempeSchema = Schema({
    temperatura: Number,
    fecha: {date: Date},
    date: { type: Date, default: Date() }
})
module.exports = mongoose.model('tempe', TempeSchema) 
