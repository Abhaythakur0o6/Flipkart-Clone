import React from 'react'
import Slide from '../Slide/Slide'
import "./MidSlide.css"

const MidSlide = ({ products, title }) => {
    return (
        <>
            <div className="mid-slide">
                <div className="mid-slide-slides">
                    <Slide products={products} title={title} number={5} />
                </div>
                <div className="mid-slide-images">
                    <img src='https://rukminim2.flixcart.com/fk-p-flap/1060/1620/image/ce3cf81edb760559.jpg?q=60' alt="Half-Image" />
                </div>
            </div>
        </>
    )
}

export default MidSlide