import { Component, HostListener, OnInit } from '@angular/core';
import { Tag } from 'src/app/demo/api/tag';
import { Tag as PrimeNgTag } from 'primeng/tag';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TagService } from 'src/app/demo/service/tag.service';
import { Observable } from 'rxjs';

interface TagColor {
    name: string;
    code: string;
}

@Component({
    templateUrl: './rfid-tag.component.html',
    providers: [MessageService]
})

export class RFIDTagComponent implements OnInit {

    loading: boolean = false;           // Loading overlay trigger value
    tag: Tag = {};
    tags: Tag[] = [];
    selectedTags: Tag[] = [];
    tagDialog: boolean = false;
    deleteTagDialog: boolean = false;
    deleteTagsDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    messages1: Message[] = [];
    selectedTagColor: TagColor | undefined;
    tagColors: TagColor[] = []


    private code: string = '';

    tagsObs$: Observable<any>;

    constructor(private dataService: TagService, private messageService: MessageService) { }

    ngOnInit() {
        this.tagsObs$ = this.dataService.guestObs;
        this.tagsObs$.subscribe((data) => {
            this.loading = false;
            if (data) {
                this.tags = data.rows;
            }
        })

        // Get all Tags
        this.dataService.getTags()

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'color', header: 'Szín' },
            { field: 'identifier', header: 'Azonosító' },
            { field: 'enabled', header: 'Engedélyezve van' },
            { field: 'createdAt', header: 'Létrehozva' },
            { field: 'updatedAt', header: 'Módosítva' }
        ]

        this.tagColors = [
            { name: 'fekete', code: 'black' },
            { name: 'sárga', code: 'yellow' },
            { name: 'piros', code: 'red' },
            { name: 'zöld', code: 'green' },
            { name: 'kék', code: 'blue' }
        ]

        this.messages1 = [
            { severity: 'info', summary: '', detail: 'Tartsa az RFID címkét az olvasóhoz...' },
        ]
    }

    @HostListener('window:keypress', ['$event'])
    keyEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            // The QR/Bar code is ready here
            // Do something here with the scanned code
            console.log('hello', this.code)
            // alert('CODE: ' + this.code)
            this.tag.identifier = this.code
        } else {
            if (event.key === 'ö' || event.key === 'Ö'){
                this.code += '0'
            } else {
                this.code += event.key
            }
        }
    }

    openNew() {
        this.tag = {};
        this.code = '';
        this.submitted = false;
        this.tagDialog = true;
    }

    deleteSelectedTags() {
        this.deleteTagsDialog = true;
    }

    editTag(tag: Tag) {
        this.tag = { ...tag };
        this.tagDialog = true;
    }

    deleteTag(tag: Tag) {
        this.deleteTagDialog = true;
        this.tag = { ...tag };
    }

    confirmDeleteSelected() {
        this.deleteTagsDialog = false;
        let tags = this.tags.filter(val => !this.selectedTags.includes(val));
        this.tags = tags;
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'Címkék törölve', life: 3000 });
        this.selectedTags = [];
    }

    confirmDelete() {
        this.deleteTagDialog = false;
        this.tags = this.tags.filter(val => val.id !== this.tag.id);
        this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'Címke törölve', life: 3000 });
        this.tag = {};
    }

    hideDialog() {
        this.tagDialog = false;
        this.submitted = false;
    }

    save() {
        if (!this.tag.identifier) return;

        this.submitted = true;
        if (this.tag.identifier && this.tag.identifier.trim().length > 0) {
            const last = this.tags[this.tags.length - 1];
            const lastId = Number(last.id);
            this.tag.id = lastId + 1;
            this.tags.push(this.tag);
            this.tags = [...this.tags];
            this.tagDialog = false;
            this.tag = {};
            this.messageService.add({ severity: 'success', summary: 'Siker', detail: 'Címke rögzítve', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
