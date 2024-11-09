interface CCTVItem {
  clipRQId: number;
  status: string;
  address: string;
  name: string;
  createdAt: string;
}

type ClipList = string[]

interface requestDetailInfo {
  clipRQId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  endDate: string;
  sections: string[];
  photoStatus: boolean;
  password: string;
  clipList: ClipList;
}
