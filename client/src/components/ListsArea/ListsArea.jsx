import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useListPosition } from "../../hooks/useListPosition/useListPosition";
import List from "../List/List";
import { useLists } from "../../hooks/useLists/useLists";
import ListBody from "../ListBody/ListBody";
import { useUpdate } from "../../hooks/useUpdate/useUpdate";

export default props => {

    const {update, setUpdate} = useUpdate()
    const { lists, setLists, listId, setListId } = useLists()
    const {listPosition, setListPosition} = useListPosition()

    async function getAllLists() {

        await axios.get('http://localhost:3001/lists/all', { params: { board: props.board_id } })
            .then(res => {
                setLists([])
                if (res.data !== null || res.data.length > 0) {
                    setLists(Array(res.data.length).fill(null))
                    res.data.map(e => {
                        setLists((a) => [...a, <ListBody id={'list-' + e.list_id} position={e.position} key={'list-' + e.list_id} title={e.list_name} />])
                        let temporaryArr = lists
                        temporaryArr[e.position-1] = (<ListBody id={'list-' + e.list_id} position={e.position} key={'list-' + e.list_id} title={e.list_name} />)
                        setLists(temporaryArr)
                     })
                    
                    if(res.data.length > 0){
                        setListPosition(res.data.length)
                        setListId(res.data[res.data.length-1].list_id+1)
                    } else{
                        setListPosition(1)
                    }
                }
            })
        }
        
    useEffect(getAllLists, [update])

    return (

        <>
            {lists}
            <List id={"list-"+listId} setLists={setLists} />
        </>

    )
}