
import { useEffect, useState } from "react"

import FolderCard from "./FolderCard"

function ManageFolders({  }) {

    const [folderData, setFolderData] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/managefolders')
            .then((res) => res.json())
            .then((res) => { console.log(res); setFolderData(res) })
    })

    return (
        <>

            {Object.entries(folderData).map(([name, properties]) => (
                <FolderCard
                    name={name}
                    properties={properties}
                />
            ))}
        </>
    )
}

export default ManageFolders