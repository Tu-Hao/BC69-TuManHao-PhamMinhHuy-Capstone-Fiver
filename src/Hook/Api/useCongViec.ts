import { useQuery } from "@tanstack/react-query"
import { congViec } from "../../services/congViecService"

//home
export const useGetTypeCV = () => {
    const query = useQuery({
        queryKey: ['LoaiCV'],
        queryFn: () => congViec.getListTypeCV()
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}
export const useGetDetailTypeCV = () => {
    const query = useQuery({
        queryKey: ['Detail'],
        queryFn: () => congViec.getDetailTypeCV()
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}
export const useSearchByName = (value: string) => {
    const query = useQuery({
        queryKey: ['Detail', value],
        queryFn: () => congViec.searchByName(value)
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}

//DSCV
export const useGetMenuCV = () => {
    const query = useQuery({
        queryKey: ['Menu'],
        queryFn: () => congViec.searchMenuCV()
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}

export const useGetPageCV = (value:number) => {
    const query = useQuery({
        queryKey: ['ListCV',value],
        queryFn: () => congViec.getPageCV(value)
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}

export const useSearchByMaLoai = (value: number) => {
    const query = useQuery({
        queryKey: ['Detail', value],
        queryFn: () => congViec.searchByMaChiTietLoai(value)
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}