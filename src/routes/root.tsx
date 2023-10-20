import Login from '../components/Login'
import Toggle from '../components/Toggle'
import ManageFoldersButton from '../components/ManageFoldersButton'
import queryString from 'query-string'
import { Outlet } from 'react-router-dom'

export default function Root() {
    const { code } = queryString.parse(window.location.search)
    return (
        <>
            <header className={`pb-4 flex items-center ${code ? 'justify-between' : 'justify-center'}`}>
                <section className='flex justify-between w-56'>
                    <Login />
                    {/* {code ? <ManageFoldersButton /> : null} */}
                    
                </section>
                {/* {code ? <Toggle /> : null} */}
                {/* <Toggle /> */}
            </header>
            <section className=''>
                <Outlet />
            </section>
        </>
    )
}