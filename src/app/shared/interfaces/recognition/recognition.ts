export interface RecognitionUser {
    userId: number;
    userName: string;
    userLastName: string;
    statusId: number;
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
    type: number,
    ids: [
        number
    ],
    userId: number,
    commentDescribe: string
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
