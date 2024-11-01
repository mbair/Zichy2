import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { User } from '../api/user';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get userObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get users
     * @param page
     * @param rowsPerPage
     * @param sort
     * @param queryParams
     */
    public get(page: number, rowsPerPage: number, sort: any, queryParams: string): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        const query = pageSort !== '' && queryParams !== '' ? pageSort + "&" + queryParams :
            pageSort !== '' && queryParams === '' ? pageSort :
                pageSort === '' && queryParams !== '' ? queryParams : '';

        const url = `${page}/${rowsPerPage}${query !== '' ? "?" + query : ''}`;

        this.apiService.get<ApiResponse>(`users/get/${url}`)
            .subscribe({
                next: (response: ApiResponse) => {
                    if (response && response.rows) {
                        // Super admin users is visible only for Super Admin's
                        if (!this.hasRole(['Super Admin'])) {
                            response.rows = response.rows.filter((user: User) => user.user_rolesid !== 1)
                        }
                    }
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get users by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`users/search/${globalFilter}${pageSort}`)
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
     * Get users by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`users/searchquery?${filters}`)
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
     * User create
     * @param user
     */
    public create(user: User): void {
        this.apiService.post(`users/create/`, user)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres felhasználó rögzítés',
                        detail: `${user.fullname} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * User update
     * @param user
     */
    public update(modifiedUser: User): void {
        this.apiService.put(`users/update/${modifiedUser.id}`, modifiedUser)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres felhasználó módosítás',
                        detail: `${modifiedUser.fullname} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * User delete
     * @param user
     */
    public delete(user: User): void {
        this.apiService.delete(`users/delete/${user.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres felhasználó törlés',
                        detail: `${user.fullname} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of users
     * @param users
     */
    public bulkdelete(users: User[]): void {
        let params = {
            ids: users.map(user => user.id)
        }
        this.apiService.post('users/bulkdelete', params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres felhasználó törlés',
                        detail: `${users.length} felhasználó törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get User own data
     */
    public getOwnData() {
        this.apiService.get(`users/getowndata`)
            .subscribe({
                next: (response: any) => {
                    this.data$.next(response)
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get User Role
     * @returns
     */
    public getuserrole(): string {
        return localStorage.getItem('userrole') || "No Role"
    }

    /**
     * Returns the current user's ID from local storage.
     * @returns The user ID as a number.
     */
    getUserId(): number {
        return Number(localStorage.getItem('userid'))
    }

    // Role check
    public hasRole(roles: string[]): boolean {
        const userrole = this.getuserrole()
        return roles.includes(userrole)
    }

    /**
     * Get users for selector
     * @returns
     */
    public getUsersForSelector(user_rolesid?: number): Observable<User[]> {
        const queryParams = user_rolesid ? `user_rolesid=${user_rolesid}` : ''
        this.get(0, 999, { sortField: 'fullname', sortOrder: 1 }, queryParams)

        return this.data$.asObservable().pipe(
            map((data: any) => {
                const users = data ? data.rows : []
                return users
            })
        )
    }
}
