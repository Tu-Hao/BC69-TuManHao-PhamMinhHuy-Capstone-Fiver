import { useQuery } from "@tanstack/react-query"
import { congViec } from "../../services/congViecService"

export const useGetTypeCV = () =>{
    const query = useQuery({
        queryKey:['LoaiCV'],
        queryFn:()=>congViec.getListTypeCV()
    })
    return{
        ...query,
        data:query.data?.data.content
    }
}
export const useGetDetailTypeCV = () =>{
    const query = useQuery({
        queryKey:['Detail'],
        queryFn:()=>congViec.getDetailTypeCV()
    })
    return{
        ...query,
        data:query.data?.data.content
    }
}