import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useListPosition } from "../../hooks/useListPosition/useListPosition";
import List from "../List/List";
import { useLists } from "../../hooks/useLists/useLists";
import ListBody from "../ListBody/ListBody";

export default props => {

    const { lists, setLists, listId, setListId } = useLists()
    const {listPosition, setListPosition} = useListPosition()
    
    async function getAllLists() {

        await axios.get('http://localhost:3001/lists/all', { params: { board: 1 } })
            .then(res => {
                console.log(res.data)
                if (res.data !== null) {
                    setLists(Array(res.data.length).fill(null))
                    console.log(lists)
                    res.data.map(e => {
                        console.log(e)
                        setLists((a) => [...a, <ListBody id={'list-' + e.list_id} position={e.position} key={'list-' + e.list_id} title={e.list_name} />])
                        let temporaryArr = lists
                        temporaryArr[e.position-1] = (<ListBody id={'list-' + e.list_id} position={e.position} key={'list-' + e.list_id} title={e.list_name} />)
                        setLists(temporaryArr)

                    })
                    
                    setListPosition(res.data.length)
                    setListId(res.data[res.data.length-1].list_id+1)
                }
            })
        }
        
    useEffect(getAllLists, [])

    return (

        <>
            {lists}
            <List id={"list-"+listId} setLists={setLists} />
        </>

    )
}