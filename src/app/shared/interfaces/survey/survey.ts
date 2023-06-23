export interface Question {
    id?: number;
    questionId: number;
    questionDescribe: string;
    pollTypeId: number;
    periodId: number;
    isRequired: boolean;
}

export interface Period {
    periodId: number;
    describe: string;
}

export interface ViewPeriod{
    id: number;
    questionDescribe: string;
    questionId: string;
    isRequired: boolean;
    periodDescribe: string;
}
