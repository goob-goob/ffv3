
// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
// import './App.css'

function List({ }) {

    const { code } = queryString.parse(window.location.search)
    console.log('code: ', code)
    // console.log(location)
    // const code = ''

    const [raidData, setRaidData] = useState('none')

    useEffect(() => {
        console.log('<List /> useEffect()')
        fetch(`http://localhost:3001/raid?code=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json',
                Accept: 'application/json'
            }
        })
            // .then(res => console.log(res))
            .then(res => res.json())
            .then(res => {console.log(res, typeof res); console.log(res.data, typeof res.data); setRaidData(res.data)})
            // .then(res => setRaidData(res.data))
            .then(res => console.log(typeof raidData))
    }, [code])

    const people = [
        {
            name: 'Jane Cooper',
            headline: 'Regional Paradigm Technician',
            role: 'Admin',
            email: 'janecooper@example.com',
            telephone: '+1-202-555-0170',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        // More people...
    ]


        return (
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(raidData).map(([person, properties]) => (
                    // properties.thumbnail_url = `${properties}`;
                    <li key={person} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={properties.thumbnail_url} alt="" />
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-800">{properties.user_name} streaming {properties.game_name}</h3>
                                    {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {person.role}
                                    </span> */}
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{}{}</p>
                                <p className="mt-1 truncate text-sm text-gray-500">{}{properties.title}{}</p>
                            </div>

                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                {/* <div className="flex w-0 flex-1"> */}
                                    {/* <a
                                        href={`mailto:${properties.title}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        {/* <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> 
                                    </a> 
                                    */}
                                {/* </div> */}
                                <div className="-ml-px flex w-0 flex-1">
                                    <a
                                        href={`http://localhost:3001/startraid?broadcaster_id=${properties.id}&code=${code}`}
                                        className=" relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        {/* <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                        Raid!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    // }

    // return (
    //     <>
    //         {/* <h1> */}
    //             {raidData} 
    //             {typeof raidData}
    //             {/* {typeof people} */}
    //         {/* </h1> */}

    //     </>
    // )
}

export default List
