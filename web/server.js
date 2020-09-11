// const http = require('http')
// const fs = require('fs')

// let index = fs.readFileSync('index.html')

// http.createServer(function (req,res) {
//     res.writeHead(200, {'Content-Type':'text/html'})
//     res.end(index)
// }).listen(9615)


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json'));

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => res.render('index', { data }))

app.get('/add', (req, res) => res.render('add'))
app.post('/add', (req, res) => {
    data.push(req.body)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    let dataEdit = data[req.params.id]
    if (dataEdit.boolean === "true") {
        var pilihanTrue = "selected"
    } else { var pilihanFalse = "selected" }
    res.render('edit', { dataEdit, pilihanTrue, pilihanFalse })
})
app.post('/edit/:id', (req, res) => {
    data[req.params.id] = req.body
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    data.splice(req.params.id, 1)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8')
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('web jalan di 3000')
})

