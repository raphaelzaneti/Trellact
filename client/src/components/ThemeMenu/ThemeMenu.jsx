import React from "react";

export default function ThemeMenu(props) {

    function toggleDropdown(){
        const dropdown = document.getElementById('board__details-theme-dropdown')
        
        if(dropdown.style.display === 'block'){
            dropdown.style.display = 'none'
        } else{
            dropdown.style.display = 'block'
        }
    }

    function changeTheme(color){
        document.documentElement.style.setProperty('--board-main-bg-color-variable', `var(--${color}-main-bg)`);
        document.documentElement.style.setProperty('--board-header-bg-color-variable', `var(--${color}-header-bg)`);
    }

    function themePicker(element){
        const elementId = String(element.target.id)
        const color = elementId.substring(6, elementId.length)
        changeTheme(color)
    }


    return (
        <div
            type="button"
            id="board__details-theme"
            className="board__details-item board__details-theme dropdown"
            onClick={toggleDropdown}
        >
            <span>
                Change theme
            </span>
            <div id="board__details-theme-dropdown" class="dropdown-menu board__details-theme-menu" aria-labelledby="dropdownMenuButton">
                <div className="board__details-theme-grid">
                    <span id="theme-red" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-red"></span>
                    <span id="theme-blue" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-blue"></span>
                    <span id="theme-green" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-green"></span>
                    <span id="theme-yellow" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-yellow"></span>
                    <span id="theme-gray" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-gray"></span>
                    <span id="theme-purple" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-purple"></span>
                    <span id="theme-black" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-black"></span>
                    <span id="theme-pink" onClick={e=>themePicker(e)} class="dropdown- theme-color theme-pink testar"></span>
                </div>
            </div>
        </div>
    )
}