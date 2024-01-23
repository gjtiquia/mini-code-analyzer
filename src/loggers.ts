import { Logger } from "./interfaces";

export class ConsoleLogger implements Logger {
    public log(message: string, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    public clear() {
        console.clear();
    }

    public table(data: any) {
        console.table(data);
    }
}
export class NullLogger implements Logger {
    public log(message: string, ...optionalParams: any[]) { }
    public clear() { }
    public table(data: any) { }
}
