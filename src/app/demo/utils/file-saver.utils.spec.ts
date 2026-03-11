import { resolveSaveAs } from './file-saver.utils';

describe('resolveSaveAs', () => {
    it('returns the named saveAs export when available', () => {
        const saveAs = jasmine.createSpy('saveAs');

        expect(resolveSaveAs({ saveAs })).toBe(saveAs);
    });

    it('returns the default export when it is a function', () => {
        const saveAs = jasmine.createSpy('saveAs');

        expect(resolveSaveAs({ default: saveAs })).toBe(saveAs);
    });

    it('returns default.saveAs when module interop wraps the export', () => {
        const saveAs = jasmine.createSpy('saveAs');

        expect(resolveSaveAs({ default: { saveAs } })).toBe(saveAs);
    });

    it('throws when no callable saveAs export exists', () => {
        expect(() => resolveSaveAs({})).toThrowError(TypeError);
    });
});
