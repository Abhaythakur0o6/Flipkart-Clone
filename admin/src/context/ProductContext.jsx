import { createContext, useContext, useState } from "react"
const DataProvider = createContext()

export const ProductContext = ({ children }) => {

    const [products, setProducts] = useState([])
    const contextValue = { products, setProducts };
    return (
        <>
            <DataProvider.Provider value={contextValue}>
                {children}
            </DataProvider.Provider>
        </>
    )
}

export const useProductContext = () => useContext(DataProvider)