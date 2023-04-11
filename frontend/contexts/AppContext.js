import { createContext, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {

    const teste = "funcionou o teste :D";
    
    return (
        <AppContext.Provider value={{teste}}>
            {children}
        </AppContext.Provider> 
    )
}