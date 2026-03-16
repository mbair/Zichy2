import { TestBed } from '@angular/core/testing';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
    let service: ReservationService;
    let apiService: jasmine.SpyObj<ApiService> & { apiURL: string };

    beforeEach(() => {
        const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', ['get', 'post', 'put', 'delete']) as jasmine.SpyObj<ApiService> & { apiURL: string };
        apiServiceSpy.apiURL = '/api';

        const translateSpy = jasmine.createSpyObj<TranslateService>('TranslateService', ['instant']);

        TestBed.configureTestingModule({
            providers: [
                ReservationService,
                { provide: ApiService, useValue: apiServiceSpy },
                { provide: TranslateService, useValue: translateSpy }
            ]
        });

        service = TestBed.inject(ReservationService);
        apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService> & { apiURL: string };
    });

    it('maps conference summary from the reservation endpoint', (done) => {
        apiService.get.and.returnValue(of({
            summary: {
                registeredGuests: '150',
                reservedGuests: 26,
                totalBeds: '170',
                waitingForRoom: '124'
            }
        } as any));

        service.getConferenceSummary$(14).subscribe(summary => {
            expect(summary).toEqual({
                registeredGuests: 150,
                reservedGuests: 26,
                totalBeds: 170,
                waitingForRoom: 124
            });

            const [endpoint, options] = apiService.get.calls.mostRecent().args;
            expect(endpoint).toBe('reservation/get/0/1?conference_id=14');
            expect(options?.headers instanceof HttpHeaders).toBeTrue();
            done();
        });
    });

    it('falls back to zeroes when the backend does not return a summary', (done) => {
        apiService.get.and.returnValue(of({ rows: [] } as any));

        service.getConferenceSummary$(151).subscribe(summary => {
            expect(summary).toEqual({
                registeredGuests: 0,
                reservedGuests: 0,
                totalBeds: 0,
                waitingForRoom: 0
            });
            done();
        });
    });
});
