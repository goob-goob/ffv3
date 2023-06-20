
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import List from './components/List.tsx'
import Login from './components/Login.tsx'
// import Header from 'react'

function App() {


  return (
      <>
        <header className='pb-4'>
          <Login />
        </header>
        <section className=''>


            <Route path='/raid' Component={List} />
          {/* <List /> */}
        </section>
      </>
  )
}

export default App
