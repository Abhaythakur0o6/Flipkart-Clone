import "./Slide.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const Slide = ({ products, title, number }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: number
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };

    return (
        <>
            <div className="main-page-slide">
                <h5 className='main-slide-container-heading'>{title}</h5>
                <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}
                    className='main-slide-container'>
                    {products.slice(0,8).map((product, index) => {
                        return (
                            <Link to={`/product/${product._id}`}>
                                <div className='main-slide'>
                                    <img src={product.detailUrl} alt="product-image" />
                                    <div className="image-text">
                                        <p style={{ fontWeight: 600 }}>{product.title.shortTitle}</p>
                                        <p>&#8377;{product.price.cost}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
            </div>
        </>
    )
}

export default Slide