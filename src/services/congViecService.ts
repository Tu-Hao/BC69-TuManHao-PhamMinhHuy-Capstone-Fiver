import { DetailLoaiCV, LoaiCV } from "../@types/CongViec";
import { apiInstance } from "../constants/apiInstance";


const api = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api'
})

export const congViec = {
    getListTypeCV: () => api.get<HttpResponse<LoaiCV[]>>('/loai-cong-viec'),
    getDetailTypeCV: () => api.get<HttpResponse<DetailLoaiCV[]>>(`/chi-tiet-loai-cong-viec`),

}