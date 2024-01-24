import columnify from "columnify"
import { Logger } from "./interfaces";

export class ConsoleLogger implements Logger {
    public log(message: string, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    public clear() {
        console.clear();
    }

    public table(data: any) {

        const columns = columnify(data, {
            columns: ["relativePath", "linesOfCode"],
            columnSplitter: ' | ',

            config: {
                "relativePath": {
                    headingTransform: (_) => {
                        return "[Relative Path]";
                    },
                },
                "linesOfCode": {
                    headingTransform: (_) => {
                        return "[Lines Of Code]";
                    },
                }
            }
        });

        console.log(columns);

        // console.table(data);
    }
}

export class NullLogger implements Logger {
    public log(message: string, ...optionalParams: any[]) { }
    public clear() { }
    public table(data: any) { }
}
