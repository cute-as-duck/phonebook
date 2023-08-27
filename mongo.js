const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://fullstack:${password}@localhost:27017/admin`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => mongoose.connection.close())
}