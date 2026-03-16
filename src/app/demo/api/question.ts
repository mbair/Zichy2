export interface QuestionTranslation {
    hu?: string;
    en?: string;
    answers?: string;
}

export interface Question {
    id?: number | string | null;
    conferenceId?: number | string | null;
    conferenceid?: number | string | null;
    translations: QuestionTranslation[] | QuestionTranslation;
}
