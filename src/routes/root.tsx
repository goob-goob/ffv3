import Login from '../components/Login'
import Toggle from '../components/Toggle'
import queryString from 'query-string'
import { Outlet } from 'react-router-dom'

export default function Root() {
    const { code } = queryString.parse(window.location.search)
    return (
        <>
            <header className={`pb-4 flex items-center ${code ? 'justify-between' : 'justify-center'}`}>
                <Login />
                {code ? <Toggle /> : null }
                {/* <Toggle /> */}
            </header>
            <section className=''>
                <Outlet />
            </section>
        </>
    )
}