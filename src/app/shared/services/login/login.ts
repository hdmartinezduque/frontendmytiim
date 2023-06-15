export interface LoginRequest {
    username: string;
    password: string;
}


 export interface ChangePasswordRequest{
    userId: string | null;
    password: string;

 }

export interface Group {
    groupCode: string;
    groupDescribe: string;
    groupId: number;
}

export interface User {
    group: Group;
    status: string;
    userEmail: string;
    userId: string;
    userLastName: string;
    userName: string;
    userPassword: string;
    userPhone: string;
    userProfileId: string;
}

