export interface RecoveryDiaryData {
  diaryId: number
  beneficiaryId : number,
  beneficiaryName: string,
  beneficiaryDisease: string,
  beneficiaryPhoto: string,
  beneficiaryAmountGoal: number,
  beneficiaryAmountRaised : number,
  beneficiaryBirthday : number,
}

export interface RecoveryDiaryDetailData {
  // beneficiaryInfo
  beneficiaryName: string,
  beneficiaryBirthday : number,
  beneficiaryDisease: string,
  beneficiaryPhoto: string,
  beneficiaryAmountRaised : number,
  beneficiaryAmountGoal: number,

  // beneficiaryDiaries
  diaryId : number,
  beneficiaryId : number,
  diaryRegisterDate : number,
  diaryPhoto: string,
  diaryTitle: string,
  diaryContent : string,
  diaryAmountSpent: number,
}
