export interface Translation {
    question: string;
}

export interface Answer {
    id?: string | null;
    guestid?: string | null;
    questionid?: string | null;
    translations: {
        [key: string]: Translation;
    }
}
