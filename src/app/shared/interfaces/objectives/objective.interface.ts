
export interface Objective {
    objectiveId: number;
    objectiveDescribe: string;
    objectiveUserId: number;
    objectiveGrupoId: number;
    periodId: number;
    status: Status;
    objectiveType: ObjectiveType;
}

export interface ObjectiveRequest {
    objectiveDescribe: string ;
    objectiveTypeId: number;
    userId: number;
    periodId: number;
    commitments: Array<Compromise>;
}

export interface Status {
    statusId: number;
    statusDescribe?: string;
}

export interface ObjectiveType {
    objectiveTypeId: number;
    objectiveTypeDescribe?: string;
    objectiveTypeStatusId?: number;
}

export interface ObjectiveForm {
    objectiveTypeId: number;
    objectiveDescribe: string;
    periodId: number;
}

export interface GrupoObjetivo {
    groupId: number,
    groupDescribe: string,
    groupCode: string
}

export interface CreadorObjetivo {
    userId: number,
    userPassword: string,
    userName: string,
    userLastName: string,
    userPhone: string,
    userProfileId: number,
    userEmail: string,
    group: GrupoObjetivo,
    status: string | {
        statusId: number,
        statusDescribe: string
    }
}

export interface Objetivo {
    objectiveId: 4,
    objectiveDescribe: string,
    user: CreadorObjetivo,
    objectiveType: {
        objectiveTypeId: number,
        objectiveTypeDescribe: string,
        objectiveTypeStatusId: number
    }
}


export interface RegistrarComentario {
    commentId: number,
    commentDescribe: string,
    commentUserFromId: number,
    commentUserToId: number,
    status: {
        statusId: number,
        statusDescribe: string,
    },
    commentDate: string,
    commentType: boolean,
    commentCommentType: {
        objectiveTypeId: number,
        objectiveTypeDescribe: string,
        objectiveTypeStatusId: number
    }
}


export interface Compromise {
    commitmentId: number;
    commitmentDescribe: string;
    commitmentDate: string;
    commitmentAdvance: number;
    commitmentGoal: number;
    measureId: number;
    objectiveId: number;
    type?: string;
    percentageAvance?: number;
    measureDescribe?: string;
    getForm?: boolean;
}

export interface Metrica {
    measureId: number,
    measureDescribe: string,
    measureCode: string
}

export interface CloseObjectiveRequest {
    statusId: string,
    objectiveQualify?: number,
    objectiveObservations?: string
}

export interface CreateCommitment {

    objectiveId: number;
    commitmentDescribe: string;
    commitmentDate: Date;
    commitmentAdvance: number;
    commitmentGoal: number;
    measureId: number;
    commitmentDTO: {
        commitmentDescribe: string;
        commitmentDate: Date;
        commitmentAdvance: number;
        commitmentGoal: number;

    }
}

export interface ListFilter {
    statusId:number,
    objectiveTypeId:number,
    userId: number,
    groupId: number,

}


