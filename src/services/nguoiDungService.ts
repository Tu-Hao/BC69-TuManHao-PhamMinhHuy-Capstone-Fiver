import { Comment, User } from "../@types/User";
import { apiInstance, apiInstanceToken } from "../constants/apiInstance";


const api = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api/users'
})
const apiComment = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api/binh-luan',
})
const apiCommentToken = apiInstanceToken.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api',
})

export const nguoiDung = {
    getDetailUserById: (value: number) => api.get<HttpResponse<User>>(`/${value}`),
    getCommentCV: (value: number) => apiComment.get<HttpResponse<Comment[]>>(`/lay-binh-luan-theo-cong-viec/${value}`),

    postComment: (value: any) => apiCommentToken.post<HttpResponse<any>>("/binh-luan", value),
}