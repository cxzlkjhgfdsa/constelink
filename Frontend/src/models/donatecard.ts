// export interface DonationData {
//   title: string;
//   type: string;
//   deadline: string;
//   amount: number;
//   hospital: string,
//   img: string;
//   goal: number
// }

export interface DonationData {
    beneficiaryId:number;
    categoryName:string
    fundraisingAmountGoal: number;
    fundraisingAmountRaised: number;
    fundraisingEndTime:number;
    fundraisingIsDone: boolean
    fundraisingPeople:number
    fundraisingStartTime: number;
    fundraisingStory: string;
    fundraisingThumbnail: string;
    fundraisingTitle: string;
    fundraisingBookmarked:boolean
    fundraisingId: number;
  }
  
  
  