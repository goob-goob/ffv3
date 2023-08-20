import queryString from "query-string"
// import { useHistory } from "react-router-dom"

function ManageFoldersButton() {
    const { code } = queryString.parse(window.location.search)
    console.log('code: ', code)

    function handleClick() {
        // const history = useHistory()
        // history.push({
        //     pathname: '/folders',
        //     state: { code: code }
        // })
    }
    return (

        <>
            <a href='/manageraids'>


                <button
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() => handleClick()}
                >Manage Folders
                </button>
            </a>

        </>
    )
}

export default ManageFoldersButton