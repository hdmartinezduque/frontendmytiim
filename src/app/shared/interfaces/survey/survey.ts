export interface Question {
    id?: number;
    questionId: number;
    describe: String;
}

export interface Period {
    periodId: number;
    describe: string;
}

export interface ViewPeriod{
    
    codigoId: number;
    periodDiscribe: string;
    question: string;
    isRequired: string;
}
