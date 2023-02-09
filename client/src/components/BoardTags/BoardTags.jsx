import React, { useEffect, useState } from "react"
import { useBoardTags } from "../../hooks/useBoardTags/useBoardTags"

export default function BoardTags(props) {

    const {boardTags, setBoardTags} = useBoardTags()
    const tags = ['general', 'marketing']
    console.log(boardTags)
    return (
        <div className="board__details-tags-area">

            {
                boardTags !== null 
                    ? boardTags.map(e => {
                        return (
                            <div id={'tag-'+e.tag_id} className="board__tags-tag">
                                <span className="board__tags-tag-caption">
                                    #{e.tag_caption}
                                </span>
                            </div>
                        )
                    })
                : ""
            }
        </div>
    )
}