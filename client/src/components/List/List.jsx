import React, { useEffect, useMemo, useState } from "react";
import { ListsInput } from "..";
import NewListBtn from "../Buttons/NewListBtn";

export default props => {

    const [showInput, setShowInput] = useState(false)

    return (
        <>
            {
                showInput ?
                <ListsInput id={props.id} setLists={props.setLists} callback={setShowInput} />:
                <NewListBtn callback={setShowInput} /> 
            }
        </>
    )
}