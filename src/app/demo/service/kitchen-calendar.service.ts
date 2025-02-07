import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})

export class KitchenCalendarService {

    public apiURL: string
    private data$: BehaviorSubject<any>
    private message$: BehaviorSubject<any>

    constructor(private apiService: ApiService) {
        this.apiURL = apiService.apiURL
        this.data$ = new BehaviorSubject<any>(null)
        this.message$ = new BehaviorSubject<any>(null)
    }

    public get kitchenCalendarObs(): Observable<any | null> {
        return this.data$.asObservable()
    }

    public get messageObs(): Observable<any> {
        return this.message$.asObservable()
    }

    /**
     * Get kitchen calendar
     */
    public get(date: string): void {


        let demoData =  [
            {
                'normal': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ],
                'vegetarian': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ],
                'gluten-lactose-milkfree': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ],
                'glutenfree': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ],
                'milkfree': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ],
                'lactosefree': [
                    {
                        date: '2025-02-03',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-04',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-05',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-06',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-07',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-08',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    },
                    {
                        date: '2025-02-09',
                        breakfast: { total: 10, adult: 7, child: 3 },
                        lunch: { total: 12, adult: 9, child: 3 },
                        dinner: { total: 11, adult: 8, child: 3 }
                    }
                ]
            }
        ]

        this.data$.next(demoData)

        // this.apiService.get<ApiResponse>(`kitchen-calendar/${date}`)
        // //this.apiService.get<ApiResponse>(`kitchen-calendar`, { params: { date: date } })
        //     .subscribe({
        //         next: (response: any) => {
        //             this.data$.next(demoData)
        //         },
        //         error: (error: any) => {
        //             this.data$.next(demoData)
        //             this.message$.next(error)
        //         }
        //     })
    }
}