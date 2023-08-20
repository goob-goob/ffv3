require('dotenv').config()
const fs = require('node:fs')
const fetch = require('node-fetch')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require('body-parser')
const oAuth = require('./middleware/oAuth')
const mongoose = require('mongoose')
const Follow = require('./model/Follow')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const startRaidEndPoint = 'https://api.twitch.tv/helix/raids?'


// app.use(bodyParser.json())
app.use(express.json({ limit: '50mb', type: 'application/json' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000, type: 'application/x-www-form-urlencoded' }))
app.use(cors())
app.use(oAuth)
// app.get('/', cors(), (req, res) => {

// })
// app.options('/', cors())

let keys = {}

app.get('/raid', async (req, res) => {
    console.log('GET /raid ...')
    try {
        console.log('GET /raid Try...')
        console.log('req.oAuth: ', req.oAuth)
        const params = new URLSearchParams()

        const accessToken = req.oAuth.access_token
        // console.log(`Access token: ${accessToken}`)

        try {
            const currentUserData = await getCurrentUserData(accessToken)
            // console.log('currentUserData', currentUserData)

            const userId = currentUserData.id
            console.log('userId', userId)

            const userLiveFollows = await getCurrentUserLiveFollows(accessToken, userId)

            const follows = await Follow.find({ parentTwitchID: userId })
            console.log('follows: ', follows)

            res.json(userLiveFollows)
            console.log('GET /raid ...done')
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log('...catch')
        console.log(error)
    }
})

app.get('/startraid', async (req, res) => {
    // console.log('GET /start')
    console.log('GET /startraid')


    const accessToken = req.oAuth.access_token
    const toId = req.query.broadcaster_id

    const currentUserData = await getCurrentUserData(accessToken)
    console.log('currentUserData', currentUserData)
    const fromId = currentUserData.id
    console.log('from, to', fromId, toId)
    const startRaidResponse = await startRaid(accessToken, fromId, toId)


    console.log('startRaidResponse:', startRaidResponse)
    res.status(200).end()
})

app.post('/update', async (req, res) => {
    const { code, id, notes } = req.query

    const accessToken = req.oAuth.access_token
    const currentUserData = await getCurrentUserData(accessToken)
    // console.log('currentUserData', currentUserData)

    const userId = currentUserData.id
    console.log('userId', userId)

    const follow = new Follow({
        userName: null,
        twitchID: id,
        parentTwitchID: userId,
        notes: notes
    })

    await follow.save()
    res.status(200).end()
})

app.get('/getFollows', (req, res) => {

})

app.get('/manageFolders', async (req, res) => {
    
    const accessToken = req.oAuth.access_token
    const currentUserData = await getCurrentUserData(accessToken)
    const currentUserId = currentUserData.id
    
    const Follow = mongoose.model('Follow', followSchema)
    const follows = await Follow.find({ parentTwitchID: currentUserId })

    res.json(follows)

})





async function run() {
    await mongoose.connect(process.env.DB_STRING)
    console.log('hello?')
}
run().catch(console.dir);


app.listen(port, () => console.log('Server running on port ', port))

async function getCurrentUserData(accessToken) {
    console.log('getCurrentUserData')
    const userInfoResponse = await fetch('https://api.twitch.tv/helix/users',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": process.env.CLIENT_ID
            }
        }
    )
    // console.log('USER response:', userInfoResponse)
    const userInfoData = await userInfoResponse.json()
    // console.log('userInfoData', userInfoData)
    return userInfoData.data[0]
}

async function getCurrentUserLiveFollows(accessToken, userId) {
    const liveFollowsEndPoint = 'https://api.twitch.tv/helix/streams/followed?'
    const params = new URLSearchParams()
    params.append('user_id', userId)

    const response = await fetch(liveFollowsEndPoint + params, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Client-Id": process.env.CLIENT_ID
        }
    })
    // console.log('getCurrentUserLiveFollows response:', response)
    const data = await response.json()
    // console.log('getCurrentUserLiveFollows data: ', data)
    data.data.forEach(element => {
        element.thumbnail_url = element.thumbnail_url.slice(0, -20) + '300x300.jpg'
    });
    // console.log('Data trimmed:', data)

    return data
}

async function startRaid(accessToken, fromId, toId) {
    console.log('startRaid...')
    const startRaidEndPoint = 'https://api.twitch.tv/helix/raids?'
    const params = new URLSearchParams()

    params.append('from_broadcaster_id', fromId)
    params.append('to_broadcaster_id', toId)

    console.log(startRaidEndPoint, params)
    try {
        const startRaidResponse = await fetch(startRaidEndPoint, {
            method: 'POST',
            body: params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": process.env.CLIENT_ID
            }
        })
        return startRaidResponse
    } catch (error) {
        console.log(error)
    }
}