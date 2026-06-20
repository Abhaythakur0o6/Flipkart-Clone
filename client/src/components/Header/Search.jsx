import React, { useEffect, useRef, useState } from 'react'
import "./Css/Search.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from '../../redux/features/ProductSlice'

const Search = () => {

    const [text, setText] = useState("")
    const dispatch = useDispatch();

    const searchRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setText("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const { products } = useSelector(state => state.products)

    const changed = (e) => {
        setText(e.target.value)
    }

    return (
        <>
            <div className="searchbar" ref={searchRef}>
                <div className="searchbar-search">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input
                        type="text"
                        onChange={changed}
                        value={text}
                        placeholder='Search for Products, Brands and More'
                    />
                </div>
                <div className="searchbar-list">
                    {text &&
                        <ul>
                            {
                                products
                                    .filter(product =>
                                        product.title.longTitle
                                            .toLowerCase()
                                            .includes(text.toLowerCase())
                                    )
                                    .slice(0, 6)
                                    .map(product => (
                                        <li key={product._id}>
                                            <Link
                                                className='search-link'
                                                onClick={() => setText("")}
                                                to={`/product/${product._id}`}
                                            >
                                                {product.title.shortTitle}
                                            </Link>
                                        </li>
                                    ))
                            }
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}

export default Search