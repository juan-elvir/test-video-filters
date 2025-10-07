import { Children, createContext, useContext } from "react";

const callContext = createContext()

export const ActiveCallContext = ({activeCall, setActiveCall, children})=>{
    return(
        <>
            <callContext.Provider value={{activeCall, setActiveCall}}>
                {children}
            </callContext.Provider>
        </>
    )
}

export const useActiveCallContext = ()=>{
    return useContext(callContext)
}