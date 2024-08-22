import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../api/ApiResponse';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Role } from '../api/role';

@Injectable({
    providedIn: 'root',
})

export class RoleService {

    public apiURL: string
    private cache: Role[] = [];
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService, private userService: UserService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get roleObs(): Observable<ApiResponse | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get roles
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

        this.apiService.get<ApiResponse>(`userrole/get/${url}`)
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
     * Get roles by Search
     * @param globalFilter
     * @param sort
     */
    public getBySearch(globalFilter: string, sort: any): void {
        let pageSort: string = '';
        if (sort !== '') {
            const sortOrder = sort.sortOrder === 1 ? 'ASC' : 'DESC';
            pageSort = sort.sortField != "" ? `?sort=${sort.sortField}&order=${sortOrder}` : '';
        }

        this.apiService.get<ApiResponse>(`userrole/search/${globalFilter}${pageSort}`)
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
     * Get roles by Search query
     * @param filters
     */
    public getBySearchQuery(filters: string): void {
        this.apiService.get<ApiResponse>(`userrole/searchquery?${filters}`)
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
     * Role create
     * @param role
     */
    public create(role: Role): void {
        this.apiService.post(`userrole/create/`, role)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szerepkör rögzítés',
                        detail: `${role.name} rögzítve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Role update
     * @param role
     */
    public update(modifiedRole: Role): void {
        this.apiService.put(`userrole/update/${modifiedRole.id}`, modifiedRole)
            .subscribe({
                next: () => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szerepkör módosítás',
                        detail: `${modifiedRole.name} módosítva`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Role delete
     * @param role
     */
    public delete(role: Role): void {
        this.apiService.delete(`userrole/delete/${role.id}`)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szerepkör törlés',
                        detail: `${role.name} törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Bulk delete of roles
     * @param roles
     */
    public bulkdelete(roles: Role[]): void {
        let params = {
            ids: roles.map(role => role.id)
        }
        this.apiService.post(`userrole/bulkdelete`, params)
            .subscribe({
                next: (response: any) => {
                    this.message$.next({
                        severity: 'success',
                        summary: 'Sikeres szerepkör törlés',
                        detail: `${roles.length} szerepkör törölve`,
                    })
                },
                error: (error: any) => {
                    this.message$.next(error)
                }
            })
    }

    /**
     * Get roles for selector
     * @returns
     */
    getRolesForSelector(): Observable<Role[]> {
        // Check if there is already cached data
        if (this.cache.length > 0) {
            return of(this.cache)
        }

        this.get(0, 999, '', '')
        return this.data$.asObservable().pipe(
            map((data: any) => {
                // Only Super Admins are allowed to chose Super Admin role
                if (data && !this.userService.hasRole(['Super Admin'])) {
                    data.rows = data.rows.filter((role: Role) => role.name !== 'Super Admin')
                }
                // Store roles in cache
                const roles = data ? data.rows : []
                this.cache = roles

                return roles
            })
        )
    }

    /**
     * Define the name associated with a user role
     * @param roleId
     * @returns
     */
    getRoleName(roleId: any): string {
        const role = this.cache.find((role: Role) => Number(role.id) === Number(roleId))
        return role && role.name ? role.name : ''
    }

    /**
     * Define the styleName for UserRole
     * @param role ID or NAME
     * @returns
     */
    getRoleStyleClass(role: any): string {
        let roleName: string = role,
            roleStyleClass = "";

        // If Role is ID
        if(!isNaN(Number(role))) {
            roleName = this.getRoleName(role)
        }
        roleStyleClass = roleName.trim().toLowerCase().replace(/\s+/g, '')

        return `user-role-badge role-${roleStyleClass}`
    }
}
