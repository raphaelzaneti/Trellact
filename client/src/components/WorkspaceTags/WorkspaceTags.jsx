import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import WorkspaceTagField from "./WorkspaceTagField";

export default props => {

    const [allTags, setAllTags] = useState({el: [{tag_caption: 'test'}]})

    async function getAllTags(){
        console.log('called')
        await axios.get('http://localhost:3001/tags/by-tag/all-boards', { params: null})
            .then(res => res.data.data)
            .then(data => setAllTags(data))
        
    }

    useEffect(() => getAllTags(), [])

    return(
        <section className="workspace__tags">
            <div className="workspace__content-workspaces">
                <h2 className="workspace__content-workspaces-title">YOUR TAGS</h2>
                <div className="workspace__content-workspaces-workspace">
                    {Object.keys(allTags).length > 0
                            ? Object.keys(allTags).map(key => <WorkspaceTagField tag_caption={allTags[key][0].tag_caption} tag_id={allTags[key][0].tag_id} tag_boards={allTags[key]} />)
                            : "nothing"
                    }
                </div>
            </div>
        </section>
    )
}