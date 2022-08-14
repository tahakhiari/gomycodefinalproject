const express = require('express')
const connectDB = require('./config/connectDB')
const user = require('./routes/user')
const album = require('./routes/album')
const path = require('path')
const app = express()
const cors = require('cors')
const uploadRoutes=require('./routes/upload')

// 4 - parse data
app.use(express.json())
app.use(cors())
// 3 - routes
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.get('/', (req, res) => {
  res.json({ message: 'this shit is working!' })
})
app.use("/users", user)
app.use("/albums", album)
app.use("/api/uploads", uploadRoutes)
console.log(path.join(__dirname + '/uploads'))
// 2 - connectDB
connectDB()

// 1 - run server
// npm run dev
const port = process.envPORT || 7000 
app.listen(port, err => {
  err ? console.log(err) : console.log(`The server is running on http://localhost:${port}`)
})