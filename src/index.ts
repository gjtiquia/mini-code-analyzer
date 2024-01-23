import path from "path"
import fsAsync from "fs/promises"
import { isDirectory, readLinesAsync } from "./utils";

interface Parameters {
    rootDirectory: string
    targetExtensions: string[]
}

interface FileData {
    relativePath: string,
    extension: string,
    linesOfCode: number,
}

main({
    rootDirectory: path.join(__dirname, "../__tests__/directory-to-test"),
    targetExtensions: [".cs"]
});

async function main(parameters: Parameters) {

    const rootDirectoryPath = parameters.rootDirectory;
    const targetExtensions = parameters.targetExtensions;

    console.log("Mini Code Analyzer\n")

    console.log("Directory:", rootDirectoryPath);
    console.log("");

    const result = await analyzeDirectoryAsync(rootDirectoryPath, rootDirectoryPath);
    // result.forEach(x => console.log(x));

    const filteredResults = result
        .filter(x => targetExtensions.length > 0 ? targetExtensions.includes(x.extension) : true)

    console.table(filteredResults);
}


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
        const extension = path.extname(filePath);
        const linesOfCode = lines.length;

        output.push({ relativePath, extension, linesOfCode })
    }

    return output;
}

