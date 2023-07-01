import Login from '../components/Login'
import { Outlet } from 'react-router-dom'

export default function Root() {
    return (

        <>
            <header className='pb-4'>
                <Login />
            </header>
            <section className=''>
                <Outlet />
            </section>
        </>
    )
}