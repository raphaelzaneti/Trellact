const express= require('express')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors())
app.use(express.json())

const listRoutes = require('./routes/listRoutes')
const cardRoutes = require('./routes/cardRoutes')
const boardsRoutes = require('./routes/boardsRoutes')

app.use('/lists', listRoutes)
app.use('/card', cardRoutes)
app.use('/boards', boardsRoutes)

app.get('/test', (req, res) =>{
    console.log('conected')
    console.log(req.query)
    res.send('connected!')
})

app.listen(port, () => console.log('backend running on port '+port))