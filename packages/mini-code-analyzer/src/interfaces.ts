export interface Parameters {
    rootDirectory: string;
    targetExtensions: string[];
    linesOfCodeThreshold: number;

    logger?: Logger
    ignoreDirectories?: string[];
}
export interface FileData {
    relativePath: string;
    extension: string;
    linesOfCode: number;
}

export interface Logger {
    log: (message: string, ...optionalParams: any[]) => void,
    clear: () => void,
    table: (data: any) => void
}
