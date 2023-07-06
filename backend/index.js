require('dotenv').config()
const fs = require('node:fs')
const fetch = require('node-fetch')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require('body-parser')
const oAuth = require('./middleware/oAuth')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const raidEndPoint = 'https://api.twitch.tv/helix/channels/followed'


// app.use(bodyParser.json())
app.use(express.json({ limit: '50mb', type: 'application/json' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000, type: 'application/x-www-form-urlencoded' }))
app.use(cors())
app.use(oAuth)
// app.get('/', cors(), (req, res) => {

// })
// app.options('/', cors())

app.get('/raid', async (req, res) => {
    console.log('GET /raid ...')
    try {
        console.log('GET /raid Try...')
        console.log('req.oAuth: ', req.oAuth)
        const params = new URLSearchParams()

        const { access_token } = req.oAuth
        console.log(`Access token: ${access_token}`)
        const user_id_response = await fetch('https://api.twitch.tv/helix/users',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Client-Id": process.env.CLIENT_ID
                }
            }
        )
        console.log(user_id_response)
        const user_id_data = await user_id_response.json()
        console.log(user_id_data)
        const user_id = user_id_data.data[0].id
        console.log('user_id', user_id)
        params.append('user_id', user_id)
        // params.append('first', '1')

        console.log('https://api.twitch.tv/helix/channels/followed', params)
        console.log(`Headers: Authorization: Bearer ${access_token},"Client-Id": ${process.env.CLIENT_ID}`)
        const response = await fetch(raidEndPoint, params, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Client-Id": process.env.CLIENT_ID
            }
        })
        // const data = await response.json()
        // console.log('GET /raid data: ', data)
        console.log(response)
        console.log('GET /raid ...done')
        // res.json(data)

    } catch (error) {
        console.log('...catch')
        console.log(error)
    }
})

app.listen(port, () => console.log('Server running on port ', port))