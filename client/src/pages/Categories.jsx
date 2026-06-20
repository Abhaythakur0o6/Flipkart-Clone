import "./css/categories.css"
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CategoriesSidebar from "../components/Categories/CategoriesSidebar/CategoriesSidebar"
import CategoriesMain from "../components/Categories/CategoriesMain/CategoriesMain"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCategoryProducts } from "../redux/features/ProductSlice"
import { useSearchParams } from "react-router-dom"

const Categories = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const queryString = searchParams.toString();

    useEffect(() => {
        if (!searchParams.get("page") || !searchParams.get("limit")) {
            setSearchParams({
                page: 1,
                limit: 8
            });
            return;
        }
        dispatch(fetchCategoryProducts(queryString))
    }, [searchParams, dispatch]);

    const { categoryProducts, pagination } = useSelector(state => state.products);
    if (!categoryProducts) return <>...Loading</>

    return (
        <>
            <Header />
            <div className="categories-container">
                <div className="categories">
                    <CategoriesSidebar />
                    <div className="all-category-products">
                        <CategoriesMain products={categoryProducts} />
                        <div className="categories-page-box">
                            <img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="prev"
                                onClick={() => {
                                    if (page > 1) {
                                        const newParams = new URLSearchParams(searchParams);
                                        newParams.set("page", page - 1);
                                        setSearchParams(newParams);
                                    }
                                }}
                            />

                            <p>{page}</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="next"
                                onClick={() => {
                                    if (page < pagination?.totalPages) {
                                        const newParams = new URLSearchParams(searchParams);
                                        newParams.set("page", page + 1);
                                        setSearchParams(newParams);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Categories