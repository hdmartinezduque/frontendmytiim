export interface FillOutSurvey {
    pollId: number;
    describe: string;
    pollCode: string;
    endDate: string;
    questions: Array<FillOutQuestion>
}

export interface SetRequestFillOutSuvey {
        pollId: number,
        userId: number,
        answers: Array<AnswerFillOutSurvey>
}

export interface AnswerFillOutSurvey {
    questionId: number;
    value: string;
}

export interface FillOutQuestion {
    id: number;
    describe: string;
    answerTypeId: number;
    options: Array<string> | null;

}


