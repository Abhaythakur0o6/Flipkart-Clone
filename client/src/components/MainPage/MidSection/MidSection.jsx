import React from 'react'
import "./MidSection.css"
import BoxOfProducts from '../BoxOfProducts/BoxOfProducts'

const MidSection = ({ products, title, img }) => {
    return (
        <>
            <div className="mid-section">
                <BoxOfProducts products={products.filter(p => p.category === title.first.type).length ? products.filter(p => p.category === title.first.type) : products} title={title.first.heading} type={title.first.type} />
                <BoxOfProducts products={products.filter(p => p.category === title.second.type).length ? products.filter(p => p.category === title.second.type) : products} title={title.second.heading} type={title.second.type} />
                <img src={img} alt="" />
            </div>
        </>
    )
}

export default MidSection