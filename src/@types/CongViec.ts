export interface LoaiCV {
    id: number
    tenLoaiCongViec: string
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
  