export interface User {
    id: number
    name: string
    email: string
    password: string
    phone: string
    birthday: string
    avatar: string
    gender: boolean
    role: string
    skill: string[]
    certification: string[]
    bookingJob: string[]
  }
  
  export interface Comment {
    id: number
    ngayBinhLuan: string
    noiDung: string
    saoBinhLuan: number
    tenNguoiBinhLuan: string
    avatar: string
  }
  
  export interface UserComment {
    id: number
    maCongViec: number
    maNguoiBinhLuan: number
    ngayBinhLuan: string
    noiDung: string
    saoBinhLuan: number
  }
  