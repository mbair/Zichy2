import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { EmailStatusSummary, Guest, GuestFilter } from '../api/guest';

type ToastMsg = {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail?: string;
    life?: number;
}

type EmailStatus = {
    status: 'queued' | 'processing' | 'sent' | 'failed' | 'skipped' | 'unknown';
    id?: number;
    type?: string;
    attemptCount?: number;
    maxAttempts?: number;
    message?: string;
    lastError?: string | null;
    lastAttemptAt?: string | null;
    nextAttemptAt?: string | null;
    sentAt?: string | null;
}

type CreateGuestResponse = {
    guest: Guest;
    email?: EmailStatus;
}

type RetryEmailResponse = {
    guest: Guest;
    email?: EmailStatusSummary;
}

type UpdateGuestResponse = Guest

@Injectable({
    providedIn: 'root',
})
export class GuestService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private createdGuest$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.createdGuest$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get guestObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get createdGuestObs(): Observable<ApiResponse | null> {
        return this.createdGuest$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get guests
     * @param page
     * @param rowsPerPage
     * @param sort
     */
    private buildGetUrl(page: number, rowsPerPage: number, sort: any, queryParams: string): string {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        const query = pageSort !== '' && queryParams !== '' ? pageSort + "&" + queryParams :
            pageSort !== '' && queryParams === '' ? pageSort :
                pageSort === '' && queryParams !== '' ? queryParams : '';

        return `${page}/${rowsPerPage}${query !== '' ? "?" + query : ''}`;
    }

    public get$(page: number, rowsPerPage: number, sort: any, queryParams: string): Observable<ApiResponse> {
        const url = this.buildGetUrl(page, rowsPerPage, sort, queryParams);
        return this.apiService.get<ApiResponse>(`guest/get/${url}`)
    }

    public get(page: number, rowsPerPage: number, sort: any, queryParams: string): void {
        this.get$(page, rowsPerPage, sort, queryParams)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get guests by Search
     * @param globalFilter 
     * @param sort 
     * @param conferenceIds 
     */
    public getBySearch$(globalFilter: string, sort: any, conferenceIds: number[], extraParams: Record<string, string> = {}): Observable<ApiResponse> {
        let params: any = {}
        if (sort && sort.sortField) {
            params['sort'] = sort.sortField
            params['order'] = sort.sortOrder === 1 ? 'ASC' : 'DESC'
        }
        if (conferenceIds && conferenceIds.length > 0) {
            params['conferenceIds'] = conferenceIds.join(',')
        }
        Object.assign(params, extraParams)
        return this.apiService.get<ApiResponse>(`guest/search/${encodeURIComponent(globalFilter)}`, { params })
    }

    public getBySearch(globalFilter: string, sort: any, conferenceIds: number[], extraParams: Record<string, string> = {}): void {
        this.getBySearch$(globalFilter, sort, conferenceIds, extraParams)
            .subscribe({
                next: (response: ApiResponse) => { this.data$.next(response) },
                error: (error: any) => { this.message$.next(error) }
            })
    }

    /**
     * Get guests by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`guest/searchquery?${filters}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public getBySearchQuery$(filters: string) {
        return this.apiService.get<ApiResponse>(`guest/searchquery?${filters}`)
    }

    /**
     * Retrieves guests associated with a specific conference name.
     * @param conferenceName - The name of the conference to search guests for.
     * @returns An Observable containing the response with the list of guests.
     */
    public getByConferenceName(conferenceName: string): Observable<any> {
        // return this.apiService.get(`guest/getbyconferancename/${conferenceName}`) // TODO: typo in backend
        return this.apiService.get(`guest/searchquery?conferenceName=${encodeURIComponent(conferenceName)}`)
    }

    public getByConferenceId(conferenceId: number): Observable<any> {
        return this.apiService.get(`guest/searchquery?conferenceid=${encodeURIComponent(String(conferenceId))}`)
    }

    /**
     * Get a guest by RFID identifier
     * @param rfid
     * @returns An Observable containing the response with the guest information
     */
    public getByRFID(rfid: string): Observable<any> {
        return this.apiService.get(`guest/getbyrfid/${rfid}`)
    }

    public getById$(guestId: number): Observable<Guest> {
        return this.apiService.get<Guest>(`guest/getbyid/${guestId}`)
    }

    /**
     * Updates the last tag usage of the guest identified by the given id.
     * @param guestId The id of the guest to update the last tag usage for.
     */
    public updateLastTagUsage(guestId: number): void {
        this.apiService.get<ApiResponse>(`guest/updatelasttagusage/${guestId}`)
            .subscribe({
                next: (response: ApiResponse) => { },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }


    public issueRoomKey(guestId: number): Observable<any> {
        return this.apiService.post(`guest/${guestId}/roomkey/issue`, {})
    }

    public returnRoomKey(guestId: number): Observable<any> {
        return this.apiService.post(`guest/${guestId}/roomkey/return`, {})
    }

    public retryEmail(guestId: number): Observable<RetryEmailResponse> {
        return this.apiService.post<RetryEmailResponse>(`guest/${guestId}/email/retry`, {})
    }

    /**
     * Guest create
     * @param guest
     * @param files
     */
    public create(guest: Guest, files: File[]): void {
        const guestPayload = {
            ...guest,
            privacy: (guest as any)?.privacy ?? true
        }

        const formData = new FormData()
        formData.append('guest', JSON.stringify(guestPayload))

        if (files && files.length > 0) {
            for (const file of files) {
                if (!file) return
                formData.append('idcard', file, file.name)
            }
        }

        this.apiService.post<CreateGuestResponse>(`guest/create/`, formData)
            .subscribe({
                next: (response: CreateGuestResponse) => {
                    // server returns { guest, email }
                    this.createdGuest$.next(response.guest)

                    const emailToast = this.emailStatusToast(response.email)

                    if (emailToast) {
                        this.message$.next(emailToast)
                    }
                },
                error: (error: any) => {
                    const errToast: ToastMsg = {
                        severity: 'error',
                        summary: 'Vendég rögzítés sikertelen',
                        detail: this.extractCreateErrorDetail(error)
                    }
                    this.message$.next(errToast)
                }
            })
    }

    /**
     * Guest update
     * @param guest
     */
    public update$(guest: Guest, files: File[] = []): Observable<UpdateGuestResponse> {
        // Remove idcard field from FormData
        const cleanedGuest = { ...guest }
        delete cleanedGuest.idcard

        // Ha van feltöltött file, FormData-t küldünk, különben sima JSON-t
        if (files && files.length > 0) {
            const formData = new FormData()
            formData.append('guest', JSON.stringify(cleanedGuest))
            for (const file of files) {
                if (file) formData.append('idcard', file, file.name)
            }
            return this.apiService.put<UpdateGuestResponse>(`guest/update/${guest.id}`, formData)
        } else {
            // Nincs file, maradhat sima JSON
            cleanedGuest.idCardUploaded = 0 // Szerver elvárja, hogy jelezzük, ha nincs új fájl
            return this.apiService.put<UpdateGuestResponse>(`guest/update/${guest.id}`, cleanedGuest)
        }
    }

    public update(guest: Guest, files: File[] = []): void {
        this.update$(guest, files)
            .subscribe({
                next: () => {
                    this.message$.next('success')
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    public updateGuest2(modifiedGuest: any): Observable<any> {
        return this.apiService.put(`guest/update/${modifiedGuest.id}`, modifiedGuest)
            .pipe(
                tap(() => console.log(`updated guest id=${modifiedGuest.id}`)),
                catchError(this.handleError<any>('updateGuest2'))
            )
    }

    /**
     * Guest delete
     * @param guest
     */
    public delete(guest: any): void {
        this.apiService.delete(`guest/delete/${guest.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres vendég törlés',
                        detail: `${guest.lastName} ${guest.firstName} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of guests
     * @param guests
     */
    public bulkdelete(guests: Guest[]): void {
        let params = {
            ids: guests.map(guest => guest.id)
        }
        this.apiService.post(`guest/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres vendég törlés',
                        detail: `${guests.length} vendég törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    searchGuestsForSelector$(filter: GuestFilter = {}) {
        const qs = this.buildGuestQS(filter)
        return this.apiService.get<ApiResponse>(`guest/searchquery?${qs}`)
            .pipe(map((data: any) => data ? (data.rows ?? []) : []))
    }

    private buildGuestQS(f: any = {}): string {
        const parts: string[] = []
        if (f.conferenceId != null) parts.push(`conferenceid=${encodeURIComponent(String(f.conferenceId))}`)
        if (typeof f.minBeds === 'number') parts.push(`minBeds=${f.minBeds}`)
        if (f.onlyNotReserved) parts.push(`onlyNotReserved=true`);
        if (f.includeGuestIds?.length) parts.push(`includeGuestIds=${f.includeGuestIds.join(',')}`);
        if (f.enabled) parts.push(`enabled=1`)
        return parts.join('&')
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error) // log to console instead

            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${error.message}`)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }

    private emailStatusToast(email?: EmailStatus): ToastMsg | null {
        if (!email) {
            return null;
        }
        switch (email.status) {
            case 'queued': return null;
            case 'processing': return null;
            case 'sent': return null;
            case 'failed': return { severity: 'warn', summary: 'E-mail', detail: email.lastError || email.message || 'A visszaigazoló e-mailt most nem sikerült elküldeni.' };
            case 'skipped': return { severity: 'warn', summary: 'E-mail', detail: email.lastError || email.message || 'A visszaigazoló e-mail nem került elküldésre.' };
            default: return null;
        }
    }

    private extractCreateErrorDetail(error: any): string {
        const rawDetail = [
            error?.error?.errorMessage,
            error?.error?.message,
            error?.errorMessage,
            error?.message,
        ].find(
            (value) => typeof value === 'string' && value.trim().length > 0,
        ) as string | undefined

        if (!rawDetail) {
            return 'Ismeretlen hiba történt.'
        }

        if (rawDetail.includes('A fizetési mód megadása kötelező.')) {
            return 'A regisztráció jelenleg nem küldhető el, mert ehhez a konferenciához nincs választható fizetési mód beállítva. Kérjük, vedd fel a kapcsolatot a szervezővel.'
        }

        if (
            rawDetail.includes(
                'A kiválasztott fizetési mód ennél a konferenciánál nem engedélyezett.',
            )
        ) {
            return 'A kiválasztott fizetési mód már nem érhető el ehhez a konferenciához. Kérjük, frissítsd az oldalt, és válassz újra.'
        }

        return rawDetail
    }
}
