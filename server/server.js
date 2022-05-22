const express= require('express')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors())
app.use(express.json())

const listRoutes = require('./routes/listRoutes')

app.use('/lists', listRoutes)

app.get('/test', (req, res) =>{
    console.log('conected')
    console.log(req.query)
    res.send('connected!')
})

app.listen(port, () => console.log('backend running on port '+port))