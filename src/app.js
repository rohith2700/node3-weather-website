const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'rohith'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'rohith'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpText: 'This is to help!',
        title: 'Help',
        name: 'rohith'
    })
})

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    res.send({
        forecast: 50,
        location: 'New york',
        address: req.query.address
    })
})

app.get('/products', (req,res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'rohith',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'rohith',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

