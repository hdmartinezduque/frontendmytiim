// Falta cambiar los atributos
export interface CommentType {
    commentTypeId: number;
    commentTypeDescribe: string;
}

export interface CommentCreate {
    objectiveId: number;
    commentTypeId: number;
    userId: number;
    statusId: number;
    commentType: boolean;
    commentDescribe: string;
}

export interface CommentView {
    objectiveId: number;
    commentId: number;
    userId: number;
    userName: string;
    userLastName: string;
    commentDate: string;
    commentTypeId: number;
    commentTypeDescribe?: string;
    commentDescribe: string;
}

export interface DataDialogFormCompromisos {
    form?: any;
    flag?: string;
}