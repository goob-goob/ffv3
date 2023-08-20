import React from "react"
import { useState } from 'react'

function Card({ code, person, properties }) {

    const [text, setText] = useState('')



    function handleChange(e) {
        setText(e.target.value)
    }

    const handleUpdate = (code, id, notes) => {
        fetch(`http://localhost:3001/update?code=${code}&id=${id}&notes=${text}`, {
            method: 'POST',

        })
            .then(res => {

            })
    }

    return (
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
                    <p className="mt-1 truncate text-sm text-gray-500">{ }{ }</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{ }{properties.title}{ }</p>
                </div>

            </div>
            <div className='flex items-center justify-center'>

                <iframe
                    src={`https://player.twitch.tv/?channel=${properties.user_name}&parent=localhost&muted=true&autoplay=false`}
                    height="200"
                    allowFullScreen
                    className='w-11/12'>
                </iframe>
            </div>
            <div className='flex items-center justify-center pb-2'>
                <div className="w-11/12">
                    {/* <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          Add your comment
        </label> */}
                    <div className="mt-2">
                        <textarea
                            rows={2}
                            name="comment"
                            id="comment"
                            value={text}
                            className="resize-none p-3 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            // defaultValue={''}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    {/* <button>Update comment</button> */}
                </div>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200 p-1">
                    <div className="flex w-0 flex-1">
                        {/* <a
                                        href={`http://localhost:3001/update?code=${code}&id=${properties.user_id}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        {/* <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />  */}
                        {/* Update Info */}
                        {/* </a>  */}
                        <button className="bg-white hover:text-[#535bf2] relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            onClick={() => handleUpdate(code, properties.user_id, text)}>
                            Update Info
                        </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <a
                            href={`http://localhost:3001/startraid?broadcaster_id=${properties.user_id}&code=${code}`}
                            className=" relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            {/* <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                            Raid!
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Card