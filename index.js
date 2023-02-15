const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const open = require('open');
app.use(cors())
app.use((req, res, next) => {
    console.log("millware request")
    next()
})
app.use(express.urlencoded({ extended: true }))
app.post('/register', (req, res) => {

    console.log(req.body.name)
    if (req.body.name) {
        if (fs.existsSync('data.json')) {
            const fileJ = fs.readFileSync('data.json', 'utf-8')
            const dataJ = JSON.parse(fileJ)
            const dataGo = {
                name: req.body.name,
                id: (dataJ.length) + 1,
                pass: req.body.pass,
                status: req.body.status
            }
            dataJ.push(dataGo)
            fs.writeFileSync('data.json', JSON.stringify(dataJ))

        }
        else {
            fs.writeFileSync('data.json', '[]');
        }
    } else {
        res.writeHead(422)
        res.send('the name is not registered')
        console.log('the name is not registered')
    }
    res.send(req.body)
})
app.post('/login', (req, res) => {
    if (fs.existsSync('data.json')) {
        const equa = fs.readFileSync('./data.json', 'utf-8')
        const equaParse = JSON.parse(equa);
        let equaFind = equaParse.find((prop) => {
            return prop.name === req.body.name
        }) ? true : false
        if (equaFind) {
            res.send(`logged in successfully  ${req.body.name} \n `)
        }
        else {
            res.writeHead(401)
            res.send('invalid credentials')
        }
    }

})
app.get('/todos/:id', (req, res) => {
    if (fs.existsSync('data.json')) {
        const fileJ = fs.readFileSync('data.json', 'utf-8')
        const dataJ = JSON.parse(fileJ)
        const dataGo = dataJ.find((prop) => {
            return prop.id === parseInt( req.params.id)
        })
    
        res.send(dataGo)
    }
})
app.listen(4000, () => {
    console.log("server is running")
    setTimeout(() => console.log("http://localhost:4000"), 1000)
    // setTimeout(() => open("http://localhost:4000"), 2000)


})