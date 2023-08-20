// import { useState } from 'react'
// import { Switch } from '@headlessui/react'

// export default function Example() {
//   const [enabled, setEnabled] = useState(false)

//   return (
//     <div className="">
//       <Switch.Group>
//       <Switch.Label>AutPlay Videos</Switch.Label>
//         <Switch
//           checked={enabled}
//           onChange={setEnabled}
//           className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
//         relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
//         >
//           <span className="sr-only">Use setting</span>
//           <span
//             aria-hidden="true"
//             className={`${enabled ? 'translate-x-4' : '-translate-x-4'}
//           pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
//           />
//         </Switch>
//       </Switch.Group>
//     </div>
//   )
// }


import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}
      >
      </Switch>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? '-translate-x-6' : '-translate-x-10',
          'pointer-events-none inline-block h-5 w-5 transition-transform rounded-full bg-white shadow ring-0 duration-200 ease-in-out'
        )}
      />

      <Switch.Label as="span" className="ml-1 text-sm">
        <span className="font-medium text-white">AutoPlay Video</span>
      </Switch.Label>
    </Switch.Group>
  )
}
