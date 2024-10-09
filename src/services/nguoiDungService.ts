import { Comment, User } from "../@types/User";
import { apiInstance } from "../constants/apiInstance";


const api = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api/users'
})
const apiComment = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api/binh-luan'
})

export const nguoiDung = {
    getDetailUserById: (value: number) => api.get<HttpResponse<User>>(`/${value}`),
    getCommentCV:(value:number)=> apiComment.get<HttpResponse<Comment[]>>(`/lay-binh-luan-theo-cong-viec/${value}`)
}