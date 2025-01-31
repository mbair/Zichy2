import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { ConferenceService } from '../../service/conference.service';

@Component({
    selector: 'app-room-conference-binder',
    templateUrl: './room-conference-binder.component.html',
})
export class RoomConferenceBinderComponent {
    @Input() visible: boolean = false;
    @Output() close = new EventEmitter<void>();
    @Output() assign = new EventEmitter<{
        conferenceId: number;
        roomIds: number[];
    }>();

    conferences: any[] = [];
    rooms: any[] = [];
    selectedConference: any;
    selectedRooms: number[] = [];

    constructor(
        private roomService: RoomService,
        private conferenceService: ConferenceService
    ) {}

    ngOnInit() {
        this.loadConferences();
    }

    loadConferences() {
        this.conferenceService.conferenceObs.subscribe((response) => {
            if (response && response.rows) {
                this.conferences = response.rows;
            }
        });
    }

    loadAvailableRooms() {
        if (!this.selectedConference) return;
        this.roomService
            .getAvailableRooms(this.selectedConference.id)
            .subscribe((rooms) => {
                this.rooms = rooms;
            });
    }

    onConferenceChange() {
        this.selectedRooms = [];
        this.loadAvailableRooms();
    }

    onAssign() {
        this.assign.emit({
            conferenceId: this.selectedConference.id,
            roomIds: this.selectedRooms,
        });
        this.close.emit();
    }
}
