import {createContext} from 'react'; 

export const signedInContext = createContext({
    signedIn: false,
    setSignedIn: undefined
})