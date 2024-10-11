import { useQuery } from "@tanstack/react-query"
import { nguoiDung } from "../../services/nguoiDungService"

export const useGetDetailUserById = (value: number) => {
    const query = useQuery({
        queryKey: ['DetailUser', value],
        queryFn: () => nguoiDung.getDetailUserById(value)
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}

export const useGetCommentCV = (value: number) => {
    const query = useQuery({
        queryKey: ['DetailComment', value],
        queryFn: () => nguoiDung.getCommentCV(value)
    })
    return {
        ...query,
        data: query.data?.data.content
    }
}

