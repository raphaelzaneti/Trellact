import React, { useEffect, useState } from "react"
import { useBoardTags } from "../../hooks/useBoardTags/useBoardTags"
import axios from "axios"

export default function BoardTags(props) {

    const { boardTags, setBoardTags } = useBoardTags()
    const [activeNewTagInput, setActiveNewTagInput] = useState()
    const [newTagCaption, setNewTagCaption] = useState("")

    function getBoardId(){
        const currentURL = window.location.href
        const arrayURL = currentURL.split('/')

        return arrayURL[arrayURL.length-1]

    }

    function toggleTagsInput(){
        setActiveNewTagInput(!activeNewTagInput)
        setNewTagCaption("")
    }

    function changeTagInput(e){
        setNewTagCaption(e.target.value)
    }

    function createNewTag() {
        console.log(newTagCaption)

        axios.post("http://localhost:3001/tags/new-tag", {
            data:
                { tag_caption: newTagCaption, board_id: getBoardId()}
        }).then(res => res.data)
        .then(data => console.log(data))
    }

    return (
        <div className="board__details-tags-area">

            {
                boardTags !== null
                    ? boardTags.map(e => {
                        return (
                            <div id={'tag-' + e.tag_id} className="board__tags-tag">
                                <span className="board__tags-tag-caption">
                                    #{e.tag_caption}
                                </span>
                            </div>
                        )
                    })
                    : ""
            }
            <div>
                {
                    activeNewTagInput
                        ? <div className="board__tags-input-area">
                            <input type="text" className="board__tags-input" value={newTagCaption} placeholder="New tag" onChange={(e) => changeTagInput(e)} />
                            <div className="board__tags-tag board__tags-tag-btn board__tags-confirm " onClick={createNewTag}>L</div>
                            <div className="board__tags-tag board__tags-tag-btn board__tags-cancel" onClick={toggleTagsInput}>X</div>
                        </div> 
                        :  <div className="board__tags-tag" onClick={toggleTagsInput}>+</div>
                }
            </div>
        </div>
    )
}