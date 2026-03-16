export type QuestionTranslation = {
    hu?: string;
    en?: string;
    [key: string]: any;
}

export type QuestionSet = {
    id?: number | string | null;
    conferenceid?: number | string | null;
    translations?: QuestionTranslation[] | QuestionTranslation | null;
    updatedAt?: string | null;
    createdAt?: string | null;
    _synthetic?: boolean;
    [key: string]: any;
}

export function normalizeQuestionTranslations(translations: unknown): QuestionTranslation[] {
    if (Array.isArray(translations)) {
        return translations.filter((item): item is QuestionTranslation => !!item && typeof item === 'object')
    }

    if (translations && typeof translations === 'object') {
        return [translations as QuestionTranslation]
    }

    return []
}

export function hasTranslationContent(translation: QuestionTranslation | undefined | null): boolean {
    const hu = typeof translation?.hu === 'string' ? translation.hu.trim() : ''
    const en = typeof translation?.en === 'string' ? translation.en.trim() : ''
    return hu.length > 0 || en.length > 0
}

function getQuestionSetTimestamp(questionSet: QuestionSet | undefined | null): number {
    const raw = questionSet?.updatedAt || questionSet?.createdAt
    if (!raw) return 0

    const time = new Date(raw).getTime()
    return Number.isFinite(time) ? time : 0
}

function getQuestionSetId(questionSet: QuestionSet | undefined | null): number {
    const id = Number(questionSet?.id)
    return Number.isFinite(id) ? id : 0
}

export function getCurrentQuestionSet(questionSets: unknown): QuestionSet | null {
    const normalizedSets = Array.isArray(questionSets)
        ? questionSets.filter((item): item is QuestionSet => !!item && typeof item === 'object')
        : questionSets && typeof questionSets === 'object'
            ? [questionSets as QuestionSet]
            : []

    const arrayBacked = normalizedSets
        .filter((item) => Array.isArray(item.translations))
        .map((item) => ({
            ...item,
            translations: normalizeQuestionTranslations(item.translations)
        }))
        .sort((a, b) => {
            const filledDiff = b.translations.filter(hasTranslationContent).length - a.translations.filter(hasTranslationContent).length
            if (filledDiff !== 0) return filledDiff

            const timeDiff = getQuestionSetTimestamp(b) - getQuestionSetTimestamp(a)
            if (timeDiff !== 0) return timeDiff

            return getQuestionSetId(b) - getQuestionSetId(a)
        })

    if (arrayBacked.length > 0) {
        return arrayBacked[0]
    }

    const legacyRows = normalizedSets
        .filter((item) => !Array.isArray(item.translations))
        .map((item) => ({
            ...item,
            translations: normalizeQuestionTranslations(item.translations)
        }))
        .filter((item) => item.translations.length > 0 && hasTranslationContent(item.translations[0]))
        .sort((a, b) => {
            const timeDiff = getQuestionSetTimestamp(a) - getQuestionSetTimestamp(b)
            if (timeDiff !== 0) return timeDiff

            return getQuestionSetId(a) - getQuestionSetId(b)
        })

    if (legacyRows.length === 0) {
        return null
    }

    return {
        id: null,
        conferenceid: legacyRows[0].conferenceid ?? null,
        translations: legacyRows.map((item) => item.translations[0]).slice(0, 5),
        _synthetic: true,
    }
}
