import path from "path"
import fsAsync from "fs/promises"
import { isDirectory, readLinesAsync } from "./utils";

const rootDirectoryPath = path.join(__dirname, "../__tests__/directory-to-test");

interface FileData {
    relativePath: string,
    linesOfCode: number
}

async function main() {

    console.log("Mini Code Analyzer\n")


    console.log("Directory:", rootDirectoryPath);
    console.log("");

    const result = await analyzeDirectoryAsync(rootDirectoryPath, rootDirectoryPath);
    // result.forEach(x => console.log(x));
    console.table(result);
}

main();

async function analyzeDirectoryAsync(rootPath: string, directoryPath: string): Promise<FileData[]> {

    const output: FileData[] = [];

    const files = await fsAsync.readdir(directoryPath);

    for (let fileName of files) {

        const filePath = path.join(directoryPath, fileName);

        if (isDirectory(filePath)) {

            const recursiveResult = await analyzeDirectoryAsync(rootPath, filePath);
            output.push(...recursiveResult);

            continue;
        }

        const lines = await readLinesAsync(filePath);

        const relativePath = path.relative(rootPath, filePath);
        const linesOfCode = lines.length;

        output.push({ relativePath, linesOfCode })
    }

    return output;
}

