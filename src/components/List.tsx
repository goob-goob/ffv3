
// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import TextArea from './TextaArea'
import Card from './Card'

function List({ }) {

    const { code } = queryString.parse(window.location.search)
    console.log('code: ', code)

    const [raidData, setRaidData] = useState('none')
    const [textData, setTextData] = useState('')

    useEffect(() => {
        console.log('<List /> useEffect()')
        fetch(`http://localhost:3001/raid?code=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
                Accept: 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => { console.log(res, typeof res); console.log(res.data, typeof res.data); setRaidData(res.data) })
        fetch(`http://localhost:3001/getFollows?code=${code}`)
    }, [code])

    

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(raidData).map(([person, properties]) => (
                <Card 
                    code={code}
                    person={person}
                    properties={properties}
                />
            ))}
        </ul>
    )
}

export default List
