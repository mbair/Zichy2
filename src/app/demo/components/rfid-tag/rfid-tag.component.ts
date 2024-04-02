import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/demo/api/tag';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TagService } from 'src/app/demo/service/tag.service';

@Component({
    templateUrl: './rfid-tag.component.html',
    providers: [MessageService]
})
export class RFIDTagComponent implements OnInit {

    tag: Tag = {};
    tags: Tag[] = [];
    selectedTags: Tag[] = [];
    tagDialog: boolean = false;
    deleteTagDialog: boolean = false;
    deleteTagsDialog: boolean = false;
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private tagService: TagService, private messageService: MessageService) { }

    ngOnInit() {
        this.tagService.getTags().then(data => this.tags = data)

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'identifier', header: 'Azonosító' }
        ]
    }

    openNew() {
        this.tag = {};
        this.submitted = false;
        this.tagDialog = true;
    }

    deleteSelectedTags() {
        this.deleteTagDialog = true;
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
        this.tags = { ...tags };
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

        console.log('this.tag', this.tag)
        this.submitted = true;

        if (this.tag.identifier && this.tag.identifier.trim().length > 0) {
            const last = this.tags[this.tags.length - 1];
            const lastId = Number(last.id);
            this.tag.id = lastId + 1;
            this.tags.push(this.tag);
            this.tags = [...this.tags];
            this.tagDialog = false;
            this.tag = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Címke rögzítve', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
