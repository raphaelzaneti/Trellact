import React from 'react'
import '../../css/style.css'
import { useFavoriteBoard } from '../../hooks/FavoriteBoard/useFavoriteBoard'

export default props => {

    const {isFavorite, setIsFavorite} = useFavoriteBoard()

    const toggleFavorite = () => setIsFavorite(!isFavorite)

    return (
        <div id="stars-area" className="board__details-item board__details-stars-area" onClick={toggleFavorite}>
            {
                isFavorite 
                    ? <i class="far fa-star"></i>
                    : <i class="fas fa-star"></i>
            }
        </div>
    )

}