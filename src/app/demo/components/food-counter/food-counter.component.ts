import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Guest } from '../../api/guest';
import { GuestService } from '../../service/guest.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'food-counter',
    templateUrl: './food-counter.component.html',
    styleUrls: ['./food-counter.component.scss'],
    providers: [MessageService],
})


export class FoodCounterComponent implements OnInit, OnDestroy {

    mealsNumber: number = 0;
    guest: Guest;
    guests: Guest[];
    loading: boolean = false;
    ageGroup: string = '';
    scanTemp: string = '';
    scannedCode: string = '';

    guestsObs$: Observable<any> | undefined;
    serviceMessageObs$: Observable<any> | undefined;

    constructor(public router: Router, private dataService: GuestService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.guestsObs$ = this.dataService.guestObs;
        this.guestsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.guests = data;
            }
        })

        // Get all Guests
        this.dataService.getGuests()

        // Initalize guest
        this.guest = {
            lastName: '',
            firstName: '',
            diet: '',
            conferenceName: '',
        }
    }

    public incMealsCount() {
        this.mealsNumber++
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            this.scannedCode = this.scanTemp
            this.scanTemp = ''
            console.log('scannedCode', this.scannedCode)

            this.guests.map(guest => {
                if (guest.rfid === this.scannedCode) {
                    this.guest = guest
                    this.mealsNumber++

                    let birthDate = new Date('1985-10-13')
                    let age:number = this.calculateAge(birthDate)
                    if (age >= 18){
                        this.ageGroup = 'felnőtt'
                    } else {
                        this.ageGroup = 'gyermek'
                    }
                }
            })
        } else {
            if (event.key === 'ö') {
                this.scanTemp += '0'
            }
            else if (/^[0-9]$/i.test(event.key)) {
                this.scanTemp += event.key
            }
            else {
                return
            }
        }
    }

    calculateAge(birthday:any) { // birthday is a date
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    ngOnDestroy() {
    }
}
