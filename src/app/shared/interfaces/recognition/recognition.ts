export interface RecognitionUser {
  userId: number;
  userName: string;
  userLastName: string;
  statusId: number;
  userFullname?: string;
}

export interface RecognitionTeam {
  groupId: number;
  groupDescribe: string;
  groupCode: string;
}

export interface Recognition {
  id: number;
  description: string;
}

export interface RecognitionGeneral {
  userRecognitionData: Array<Recognition>;
  teamRecognitionData: Array<Recognition>;
}

export interface PostRecognition {
  type: number;
  ids: [number];
  userId: number;
  commentDescribe: string;
}

export interface PostRecognitionResponse {
  commentId: number;
  userId: number;
  commentFeedbackDescribe: string;
}

export interface GetRecognition {
  commentId: number;
  userId: number;
  userName: string;
  userLastName: string;
  commentDate: string;
  commentTypeId: number;
  commentDescribe: string;
  user: string;
}

export interface FilterRecognition {
  set: number;
  userId: number | null;
  groupId: number | null;
  commentDateInit: any | null;
  commentDateFinal: any | null;
}
