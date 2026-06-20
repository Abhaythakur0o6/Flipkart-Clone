import CategoriesFilter from "../CategoriesFilter/CategoriesFilter"
import "./CategoriesSidebar.css"

const CategoriesSidebar = () => {

    const filters = {
        Rating: {
            heading: "Rating",
            type: "checkbox",
            queryKey: "rating",
            options: [
                { label: "5 Star", value: "5" },
                { label: "4 Star", value: "4" },
                { label: "3 Star", value: "3" }
            ]
        }, 
        Discount: {
            heading: "Discount",
            type: "checkbox",
            queryKey: "discount",
            options: [
                { label: "30% or more", value: "30" },
                { label: "50% or more", value: "50" },
                { label: "70% or more", value: "70" }
            ]
        },
        Arrivals: {
            heading: "arrivals",
            type: "radio",
            queryKey: "arrivals",
            options: [
                { label: "New", value: "new" },
                { label: "Old", value: "old" },
            ]
        },
        Price: {
            heading: "Price",
            type: "radio",
            queryKey: "sort",
            options: [
                { label: "Low to High", value: "price_asc" },
                { label: "High to Low", value: "price_desc" }
            ]
        }
    }
    return (
        <>
            <div className="sidebar">
                <h4>Filters</h4>
                <div className="sidebar-filters">
                    <CategoriesFilter filter={filters.Rating} />
                    <CategoriesFilter filter={filters.Discount} />
                    <CategoriesFilter filter={filters.Arrivals} />
                    <CategoriesFilter filter={filters.Price} />
                </div>
            </div>
        </>
    )
}

export default CategoriesSidebar
