export interface Translation {
    en: string;
    hu: string;
    answers: string;
}

export interface Answer {
    id?: number | null;
    guestid?: number | null;
    questionid?: number | null;
    translations: Translation[];
}
