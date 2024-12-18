import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import arrData from './data.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

app.get('/api/trips', (req, res) => {
  const params = req.query
  if (Object.keys(params).length === 0) res.send(arrData)
  if (params.keyword != undefined) {
    let result = arrData.trips.filter(elm => elm.tags.includes(params.keyword) || elm.title.includes(params.keyword) || elm.description.includes(params.title))
    res.send(result)
  } else {
    res.send('unknown keyword')
  }
});

let server = null

server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
server.timeout = 1800000
export default app



