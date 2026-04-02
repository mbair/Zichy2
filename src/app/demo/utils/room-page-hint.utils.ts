import { Conference } from '../api/conference';

export type RoomPageHintState = {
    selectedConferences: Conference[];
    globalFilter: string;
    filterValues: { [key: string]: string };
    totalRecords: number;
    loading: boolean;
};

export function buildRoomPageHint(state: RoomPageHintState): string {
    const selectedConferenceCount = state.selectedConferences.length;
    const hasSelectedConference = selectedConferenceCount > 0;
    const conferenceLabel = selectedConferenceCount === 1
        ? `A(z) ${state.selectedConferences[0]?.name || 'kiválasztott konferenciához'}`
        : 'A kiválasztott konferenciákhoz';

    const hasGlobalFilter = state.globalFilter.trim().length > 0;
    const activeColumnFilters = Object.entries(state.filterValues)
        .filter(([key, value]) => key !== 'conferences' && (value || '').trim().length > 0)
        .length;
    const hasScopedFiltering = hasGlobalFilter || activeColumnFilters > 0;

    if (!state.loading && state.totalRecords === 0) {
        if (hasSelectedConference && hasScopedFiltering) {
            return `${conferenceLabel} nincs a jelenlegi keresésnek vagy szűrésnek megfelelő szoba.`;
        }

        if (hasSelectedConference) {
            return `${conferenceLabel} jelenleg nincs hozzárendelt szoba.`;
        }

        if (hasScopedFiltering) {
            return 'Nincs a jelenlegi keresésnek vagy szűrésnek megfelelő szoba.';
        }
    }

    if (hasSelectedConference && hasScopedFiltering) {
        return `${conferenceLabel} rendelt szobák közül a jelenlegi keresésnek vagy szűrésnek megfelelő találatok láthatók.`;
    }

    if (hasSelectedConference) {
        return `${conferenceLabel} rendelt szobák láthatók.`;
    }

    if (hasScopedFiltering) {
        return 'Jelenleg az összes szoba közül a jelenlegi keresésnek vagy szűrésnek megfelelő találatok láthatók.';
    }

    return 'Jelenleg az összes szoba látható. Konferencia választásával szűkítheti a listát a konferenciához rendelt szobákra.';
}
