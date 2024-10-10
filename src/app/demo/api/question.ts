export interface Translation {
    question: string;
}

export interface Question {
    id?: string | null;
    conferenceId?: string | null;
    translations: {
        [key: string]: Translation;
    }
}
