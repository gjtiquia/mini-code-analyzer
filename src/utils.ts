import fs from "fs";
import readline from "readline";


export function isDirectory(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}

export async function readLinesAsync(filePath: string): Promise<string[]> {

    // Reference: https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const stringArray: string[] = [];

    for await (const line of rl) {
        stringArray.push(line);
    }

    return stringArray;
}
