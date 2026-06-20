import "./css/mainPage.css"
import Header from '../components/Header/Header'
import Navbar from '../components/MainPage/Navbar/Navbar'
import Carousel from '../components/MainPage/Carousel/Carousel'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slide from "../components/MainPage/Slide/Slide"
import MidSlide from "../components/MainPage/MidSlide/MidSlide"
import MidSection from "../components/MainPage/MidSection/MidSection"
import TopStories from "../components/MainPage/TopStories/TopStories"
import Footer from "../components/Footer/Footer"
import { fetchProducts } from "../redux/features/ProductSlice"

const MainPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const boxTitleOne = {
        first: {
            heading: "Best Quality",
            type: "Best Quality"
        },
        second: {
            heading: "Winter Essentials For Your",
            type: "Winter Essentials"
        }
    }

    const boxTitleTwo = {
        first: {
            heading: "Top Rated",
            type: "Top Rated"
        },
        second: {
            heading: "Discount For you",
            type: "Discount"
        }
    }

    const midSectionImage = {
        first: "https://rukminim2.flixcart.com/www/1060/1500/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60",
        second: "https://rukminim2.flixcart.com/www/1060/1560/promos/15/09/2023/9c056ec4-f39c-4740-938d-33e1a6c7c108.jpg?q=60"
    }

    const { products = [] } = useSelector(state => state.products)

    return (
        <div className="main-page">
            <Header />
            <div className="main-page-container">
                <Navbar />
                <Carousel />
                <MidSlide products={products.filter(p => p.category === "Top Deals")} title={"Top Deals"} />
                <MidSection products={products} title={boxTitleOne} img={midSectionImage.first} />
                <Slide products={products.filter(p => p.category === "Fashion Deals")} title={"Fashion Deals"} number={6} />
                <MidSection products={products} title={boxTitleTwo} img={midSectionImage.second} />
                <TopStories />
            </div>
            <Footer />
        </div>
    )
}

export default MainPage