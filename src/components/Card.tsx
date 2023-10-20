import React from "react"
import { useState, useEffect } from 'react'
import { useFetcher } from "react-router-dom"

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'


function Card({ code, person, properties }) {

    const [text, setText] = useState(properties.notes)

    useEffect(() => {
        setText(properties.notes)
    }, [])

    function handleChange(e) {
        setText(e.target.value)
    }

    const handleUpdate = (code, id, notes) => {
        fetch(`http://localhost:3001/update?code=${code}&id=${id}&notes=${notes}`, {
            method: 'POST',

        })
            .then(res => {

            })
    }

    // if(!properties.game) return (<div key={person}></div>)

    return (
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={properties.thumbnail} alt="" />
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-800">{properties.userName} streaming {properties.game}</h3>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{ }{ }</p>
                    <p className="mt-1 truncate text-sm text-gray-500">{ }{properties.title}{ }</p>
                </div>
            </div>
            <Popover className="relative   shadow">
                <div className="bg-white py-5">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            More Info
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                >
                    <Popover.Panel className="absolute inset-x-0 top-20 z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 flex flex-col justify-center">
                        <div>
                            <div>
                                <iframe
                                    src={`https://player.twitch.tv/?channel=${properties.userName}&parent=localhost&muted=true&autoplay=false`}
                                    height="200"
                                    allowFullScreen
                                    className='w-11/12 ml-4'>
                                </iframe>
                            </div>
                            <div className='flex items-center justify-center '>
                                <div className="w-11/12">
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
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200 p-1">
                                    <div className="flex w-0 flex-1">
                                        <button className="bg-white hover:text-[#535bf2] relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            onClick={() => handleUpdate(code, properties.twitchID, text)}>
                                            Update Info
                                        </button>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <a
                                            href={`http://localhost:3001/startraid?broadcaster_id=${properties.twitchID}&code=${code}`}
                                            className=" relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            Raid!
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </li >
    )
}

export default Card