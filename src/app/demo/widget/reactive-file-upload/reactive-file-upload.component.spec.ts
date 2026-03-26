import { ReactiveFileUploadComponent } from './reactive-file-upload.component';

describe('ReactiveFileUploadComponent', () => {
    function createFile(
        name: string,
        sizeHint = 'test-file',
        type = 'image/jpeg',
    ): File {
        return new File([sizeHint], name, {
            type,
            lastModified: 1710000000000,
        });
    }

    it('syncs the selected file from the PrimeNG widget queue when CVA propagation is missed', () => {
        const component = new ReactiveFileUploadComponent();
        const onChange = jasmine.createSpy('onChange');
        const onTouch = jasmine.createSpy('onTouch');
        const file = createFile('id-card.jpg');

        component.registerOnChange(onChange);
        component.registerOnTouched(onTouch);
        (component as any).fileUpload = {
            files: [file],
            hasFiles: () => true,
            clear: jasmine.createSpy('clear'),
        };

        component.ngAfterViewChecked();

        expect(component.value).toBe(file);
        expect(onChange).toHaveBeenCalledOnceWith(file);
        expect(onTouch).not.toHaveBeenCalled();
    });

    it('clears the form value when the widget queue becomes empty', () => {
        const component = new ReactiveFileUploadComponent();
        const onChange = jasmine.createSpy('onChange');
        const file = createFile('id-card.jpg');

        component.registerOnChange(onChange);
        component.registerOnTouched(() => undefined);
        (component as any).fileUpload = {
            files: [file],
            hasFiles: () => true,
            clear: jasmine.createSpy('clear'),
        };

        component.onFileChange({ files: [file] });
        (component as any).fileUpload.files = [];
        (component as any).fileUpload.hasFiles = () => false;

        component.ngAfterViewChecked();

        expect(component.value).toBeNull();
        expect(onChange.calls.mostRecent().args).toEqual([null]);
    });
});
