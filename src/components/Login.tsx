
function Login() {
    async function handleClick() {
        console.log('click')
        const domain = 'https://id.twitch.tv/oauth2/authorize?'
        const client_id = 'l0du0xx5ebj8ooe09vc9gidum44lsg'
        const redirect_uri = 'http://localhost:3000/raid'
        const response_type = 'code'
        const scope = ''
        const state = ''

        const response = await fetch(
            `${domain}/authorize?` + 
            `client_id=${client_id}& ` + 
            `redirect_url=${redirect_uri}&` +
            `response_type=${response_type}&` +
            `scope=${scope}`,
            {
                redirect: 'manual'
            }
        )
        window.location.replace(response.url)
    }
    return (

        <button
            type="button"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleClick}
        >
            Login to twitch.tv
        </button>
    )
}



export default Login
