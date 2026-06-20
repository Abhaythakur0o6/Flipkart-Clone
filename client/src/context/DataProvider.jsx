import React, { createContext, useContext, useState } from "react";
const dataProvider = createContext();

export const DataContextProvider = ({ children }) => {

    //Login Form
    const [loginform, setLoginForm] = useState(false)

    //Review Form
    const [reviewForm, setReviewForm] = useState(false)

    const contextValue = { loginform, setLoginForm, reviewForm, setReviewForm }

    return (
        <>
            <dataProvider.Provider value={contextValue}>
                {children}
            </dataProvider.Provider>
        </>
    )
}

export const useDataContextProvider = () => useContext(dataProvider)