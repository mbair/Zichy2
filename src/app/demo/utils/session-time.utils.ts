const EPOCH_SECONDS_MAX = 99_999_999_999

export function parseSessionExpiry(value: string | null): number | null {
    if (!value) {
        return null
    }

    const rawExpiry = Number(value)
    if (!Number.isFinite(rawExpiry)) {
        return null
    }

    // Accept both epoch seconds and epoch milliseconds from the backend.
    return rawExpiry <= EPOCH_SECONDS_MAX ? rawExpiry * 1000 : rawExpiry
}

export function getRemainingSessionMs(expiresAt: number | null, nowMs: number): number {
    if (expiresAt === null) {
        return 0
    }

    return Math.max(expiresAt - nowMs, 0)
}

export function formatRemainingSessionTime(remainingMs: number): string {
    const totalSeconds = Math.max(Math.ceil(remainingMs / 1000), 0)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    if (minutes <= 0) {
        return `${seconds} másodperc`
    }

    if (seconds === 0) {
        return `${minutes} perc`
    }

    return `${minutes} perc ${seconds} másodperc`
}
