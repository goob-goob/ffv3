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

const raidEndPoint = 'https://api.twitch.tv/helix/streams/followed?'
const tokenEndpoint = "https://id.twitch.tv/oauth2/token";


// app.use(bodyParser.json())
app.use(express.json({ limit: '50mb', type: 'application/json' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000, type: 'application/x-www-form-urlencoded' }))
app.use(cors())
// app.use(oAuth)
// app.get('/', cors(), (req, res) => {

// })
// app.options('/', cors())

let keys = {}

app.get('/raid', async (req, res) => {

    console.log('///////////')
    console.log('///////////')
    console.log('///////////')

    console.log('oAuth...')
    console.log('keys, ', keys)
    const code = req.query.code;
    // console.log('code: ', code)

    
    if (!code) {
        res.status(401).send("Missing authorization code");
    }
    if(keys.hasOwnProperty(code)) {
        console.log(`Code: ${code} already used. Sending ${keys.code} authorization token`)
        req.oAuth = {}
        req.oAuth.access_token = keys[code]
        // Object.defineProperty(req.oAuth, 'access_token', {value: keys.code})
    } else {
        const params = new URLSearchParams();
        params.append("client_id", process.env.CLIENT_ID);
        params.append("client_secret", process.env.CLIENT_SECRET)
        params.append("code", code);
        params.append("grant_type", "authorization_code");
        params.append("redirect_uri", "http://localhost:3000/raid");
    
        console.log(tokenEndpoint, params)
    
        try {
            console.log('oAuth Try...')
            const response = await fetch(tokenEndpoint, { 
                method: "POST",
                body: params
             })
            console.log('TOKEN Response: ' , response)
            const data = await response.json()
            req.oAuth = data
            console.log(`req.oAuth = `, req.oAuth)
            keys[code] = req.oAuth.access_token
            // Object.defineProperties(keys, code, { value: })
            console.log('Going to next.')
           
        } catch (error) {
            console.log('CATCH')
            console.log(error)
        }
        console.log('oAuth...done')
    }

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
        console.log('USER response:', user_id_response)
        const user_id_data = await user_id_response.json()
        console.log(user_id_data)
        const user_id = user_id_data.data[0].id
        console.log('user_id', user_id)
        params.append('user_id', user_id)
        // params.append('first', '1')

        console.log('https://api.twitch.tv/helix/streams/followed', params)
        console.log(`Headers: Authorization: Bearer ${access_token},"Client-Id": ${process.env.CLIENT_ID}`)
        try {
            const response = await fetch(raidEndPoint + params, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Client-Id": process.env.CLIENT_ID
                }
            })
            console.log('RAID response:', response)
            const data = await response.json()
            console.log('GET /raid data: ', data)
            res.json(data)
        } catch (error) {
            console.log(error)
        }
        console.log('GET /raid ...done')

    } catch (error) {
        console.log('...catch')
        console.log(error)
    }
})

app.listen(port, () => console.log('Server running on port ', port))