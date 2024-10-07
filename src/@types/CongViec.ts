export interface LoaiCV {
  id: number
  tenLoaiCongViec: string
}

 //menuCV
 export interface MenuCV {
  id: number
  tenLoaiCongViec: string
  dsNhomChiTietLoai: DetailLoaiCV[]
}

export interface PageCV {
  pageIndex: number
  pageSize: number
  totalRow: number
  keywords: any
  data: CongViec[]
}

export interface DetailLoaiCV {
  id: number
  tenNhom: string
  hinhAnh: string
  maLoaiCongviec: number
  dsChiTietLoai: DsChiTietLoai[]
}

export interface DsChiTietLoai {
  id: number
  tenChiTiet: string
}


export interface SearchCV {
  id: number
  congViec: CongViec
  tenLoaiCongViec: string
  tenNhomChiTietLoai: string
  tenChiTietLoai: string
  tenNguoiTao: string
  avatar: string
}

export interface CongViec {
  id: number
  tenCongViec: string
  danhGia: number
  giaTien: number
  nguoiTao: number
  hinhAnh: string
  moTa: string
  maChiTietLoaiCongViec: number
  moTaNgan: string
  saoCongViec: number
}

