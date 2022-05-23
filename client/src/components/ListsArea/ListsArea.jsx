import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ListPositionProvider from "../../hooks/useListPosition/useListPosition";
import Lists from "../Lists/Lists";
import List from "../List/List";
import ListsProvider, { useLists } from "../../hooks/useLists/useLists";

export default props => {

    const { lists, setLists, listId, setListId } = useLists()
    
    async function getAllLists() {

        await axios.get('http://localhost:3001/lists/all', { params: { board: 1 } })
            .then(res => {
                console.log(res.data)
                if (res.data !== null) {
                    res.data.map(e => {
                        console.log(e)
                        setLists((a) => [...a, <Lists id={'list-' + e.list_id} key={'list-' + e.list_id} title={e.list_name} />])
                    })
                    setListId(res.data[res.data.length-1].list_id+1)
                }
            })
    }

    useEffect(getAllLists, [])

    return (

        <ListPositionProvider>
            {lists}
            <List id={"list-"+listId} setLists={setLists} />
        </ListPositionProvider>

    )
}