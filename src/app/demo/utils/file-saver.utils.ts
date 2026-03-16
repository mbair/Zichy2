type SaveAsFunction = (data: Blob | string, filename?: string, options?: any) => void;

type FileSaverModule = {
    default?: SaveAsFunction | { saveAs?: SaveAsFunction };
    saveAs?: SaveAsFunction;
};

export function resolveSaveAs(fileSaverModule: FileSaverModule): SaveAsFunction {
    if (typeof fileSaverModule.saveAs === 'function') {
        return fileSaverModule.saveAs;
    }

    if (typeof fileSaverModule.default === 'function') {
        return fileSaverModule.default;
    }

    if (typeof fileSaverModule.default?.saveAs === 'function') {
        return fileSaverModule.default.saveAs;
    }

    throw new TypeError('FileSaver saveAs export is not available');
}

export async function saveBlobAsFile(data: Blob, fileName: string): Promise<void> {
    const fileSaverModule = await import('file-saver') as unknown as FileSaverModule;
    const saveAs = resolveSaveAs(fileSaverModule);
    saveAs(data, fileName);
}
