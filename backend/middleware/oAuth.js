const fetch = require('node-fetch')

const User = require('../model/User')

const tokenEndpoint = "https://id.twitch.tv/oauth2/token";
let keys = {}

oAuth = async (req, res, next) => {
    console.log('oAuth...')
    console.log('keys, ', keys)
    const code = req.query.code;
    console.log('query', req.query)
    console.log('code: ', code)

    
    if (!code) {
        // const domain = 'https://id.twitch.tv/oauth2/authorize?'
        // const client_id = 'l0du0xx5ebj8ooe09vc9gidum44lsg'
        // const redirect_uri = 'https://followfolders.com/raid'
        // // const redirect_uri = 'http://localhost:3000/raid'
        // const response_type = 'code'
        // const scope = 'user:read:follows channel:manage:raids'
        // const state = ''

        // const response = await fetch(
        //     `${domain}` + 
        //     `client_id=${client_id}&` + 
        //     `redirect_uri=${redirect_uri}&` +
        //     `response_type=${response_type}&` +
        //     `scope=${scope}`,
        //     {
        //         method: 'POST',
        //         redirect: 'manual'
        //     }
        // )
        // console.log(response)
        // res.redirect(redirect_uri)
        // res.redirect('/')
        next()
        return
    }
    if(keys.hasOwnProperty(code) && keys.code !== undefined) {
        console.log(`Code: ${code} already used. Sending ${keys.code} authorization token`)
        req.oAuth = {}
        req.oAuth.access_token = keys[code]
        // Object.defineProperty(req.oAuth, 'access_token', {value: keys.code})
        next()
        return
    }
   

    const params = new URLSearchParams();
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET)
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    // params.append("redirect_uri", "http://localhost:3000/raid");
    params.append("redirect_uri", "https://followfolders.com/raid");

    console.log(tokenEndpoint, params)

    try {
        console.log('oAuth Try...')
        const response = await fetch(tokenEndpoint, { 
            method: "POST",
            body: params
         })
        console.log('Response: ' , response)
        const data = await response.json()
        req.oAuth = data
        console.log(`req.oAuth = `, req.oAuth)
        keys[code] = req.oAuth.access_token
        // Object.defineProperties(keys, code, { value: })
        console.log('Going to next.')
        next()
    } catch (error) {
        console.log('CATCH')
        console.log(error)
    }
    console.log('oAuth...done')
}

module.exports = oAuth;