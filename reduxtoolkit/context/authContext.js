import {useContext,createContext,useState} from "react"

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [user,setUser] = useState("")
    return (
      <AuthContext.Provider value={{user,setUser}}>
    {children}
    </AuthContext.Provider>
    )
}

const useAuth = ()=> useContext(AuthContext)

export {AuthProvider,useAuth}