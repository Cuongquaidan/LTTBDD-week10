import { useState ,useEffect} from "react";

export default function useGetFetchData(url) {
    const [data, setData] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        const fetchData = async ()=>{
          setError(null)
          setIsLoading(true)
          try{
              const response = await fetch(url)
               if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
              const resjson = await response.json()
              setData(resjson)
          }catch(error){
            setError(error)
          }finally{
            setIsLoading(false)
          }
        }
        fetchData()
    },[url])
    return {data,error,isLoading}
}
