import {  DetailLoaiCV, LoaiCV, MenuCV, PageCV, SearchCV } from "../@types/CongViec";
import { apiInstance } from "../constants/apiInstance";


const api = apiInstance.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api'
})

export const congViec = {
    getListTypeCV: () => api.get<HttpResponse<LoaiCV[]>>('/loai-cong-viec'),
    getDetailTypeCV: () => api.get<HttpResponse<DetailLoaiCV[]>>(`/chi-tiet-loai-cong-viec`),
    searchByName: (value: string) => api.get<HttpResponse<SearchCV[]>>(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${value}`),

    searchMenuCV: () => api.get<HttpResponse<MenuCV[]>>('/cong-viec/lay-menu-loai-cong-viec'),
    getPageCV: (value: number) => api.get<HttpResponse<PageCV>>(`/cong-viec/phan-trang-tim-kiem?pageIndex=${value}&pageSize=10`),

    searchByMaChiTietLoai: (value: number) => api.get<HttpResponse<SearchCV[]>>(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${value}`),

    getDetailCV: (id: number) => api.get<HttpResponse<SearchCV[]>>(`/cong-viec/lay-cong-viec-chi-tiet/${id}`),
}