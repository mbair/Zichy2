import { FormControl } from '@angular/forms';
import { dateBoundsValidator } from './date-bounds-validator';

describe('dateBoundsValidator', () => {
    it('accepts values on the conference boundaries', () => {
        const control = new FormControl('2025-06-29');
        const validator = dateBoundsValidator('2025-06-29', '2025-07-04');

        expect(validator(control)).toBeNull();

        control.setValue('2025-07-04');
        expect(validator(control)).toBeNull();
    });

    it('rejects values outside the allowed conference range', () => {
        const control = new FormControl('2025-06-28');
        const validator = dateBoundsValidator('2025-06-29', '2025-07-04');

        expect(validator(control)).toEqual({ dateOutOfRange: true });

        control.setValue('2025-07-05');
        expect(validator(control)).toEqual({ dateOutOfRange: true });
    });

    it('ignores empty values so required validation can handle them', () => {
        const control = new FormControl('');
        const validator = dateBoundsValidator('2025-06-29', '2025-07-04');

        expect(validator(control)).toBeNull();
    });
});
