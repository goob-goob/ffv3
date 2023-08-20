/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function TextArea() {
  return (
    <div className="w-11/12">
      {/* <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
          Add your comment
        </label> */}
      <div className="mt-2">
        <textarea
          rows={2}
          name="comment"
          id="comment"
          className="resize-none p-3 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={''}
        />
      </div>
      {/* <button>Update comment</button> */}
    </div>
  )
}
