import { useState } from "react"
import "./CategoriesFilter.css"
import { useSearchParams } from "react-router-dom"

const CategoriesFilter = ({ filter }) => {

    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedValues = searchParams.getAll(filter.queryKey)

    const handleChange = (value) => {
        const params = new URLSearchParams(searchParams)
        if (filter.type === "radio") {
            params.set(filter.queryKey, value)
        }
        if (filter.type === "checkbox") { 
            if (selectedValues.includes(value)) {
                params.delete(filter.queryKey)
                selectedValues
                    .filter(v => v !== value)
                    .forEach(v => params.append(filter.queryKey, v))
            } else {
                params.append(filter.queryKey, value)
            }
        }
        setSearchParams(params)
    }

    return (
        <>
            <div className="catogeries-filter">
                <div className="filter-heading">
                    <h5>{filter.heading}</h5>
                    <img src="https://cdn-icons-png.flaticon.com/128/2985/2985150.png" alt="image" onClick={() => setOpen(prev => !prev)} className={open ? "arrow-up" : "arrow-down"} />
                </div>
                <div className={open ? "filters" : "hidden-filter"}>
                    <div className="filter">
                        {filter.options.map((option) => (
                            <div className="filter-items">
                                <input
                                    type={filter.type}
                                    name={filter.queryKey}
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleChange(option.value)}
                                />
                                <p>{option.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoriesFilter