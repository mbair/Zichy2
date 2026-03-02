type XlsxModule = typeof import('xlsx');

let xlsxModulePromise: Promise<XlsxModule> | null = null;

export function loadXlsx(): Promise<XlsxModule> {
    if (!xlsxModulePromise) {
        xlsxModulePromise = import('xlsx');
    }

    return xlsxModulePromise;
}
