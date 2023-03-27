export interface BoardWrite {
        noticeTitle: string
        noticeContent: string,
        noticeType: string,
        noticeIsPinned: boolean
  }
  
export interface BoardDetail {
      id: Number,
      noticeTitle: string,
      noticeContent: string,
      noticeRegDate: string,
      noticeType: string,
      noticeIsPinned: boolean
}
