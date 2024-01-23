import path from "path"
import fsAsync from "fs/promises"
import { isDirectory, readLinesAsync } from "./utils";

interface Parameters {
    rootDirectory: string,
    targetExtensions: string[],
    linesOfCodeThreshold: number

    ignoreDirectories?: string[],
}

interface FileData {
    relativePath: string,
    extension: string,
    linesOfCode: number,
}

main({
    rootDirectory: path.join(__dirname, "../__tests__/directory-to-test"),
    linesOfCodeThreshold: 10,
    targetExtensions: [".ts"],
});

async function main(parameters: Parameters) {

    printHeader(parameters);

    const rootDirectoryPath = parameters.rootDirectory;
    const targetExtensions = parameters.targetExtensions;

    const result = await analyzeDirectoryAsync(parameters, rootDirectoryPath);

    console.clear();

    printHeader(parameters);

    const filteredResults = result
        .filter(x => targetExtensions.length > 0 ? targetExtensions.includes(x.extension) : true)
        .filter(x => x.linesOfCode >= parameters.linesOfCodeThreshold)

    console.table(filteredResults);
}

function printHeader(parameters: Parameters) {
    console.log("\n\nMini Code Analyzer\n")

    console.log("Directory:", parameters.rootDirectory);
    console.log("Target Extensions:", parameters.targetExtensions);
    console.log("Lines of Code Threshold:", parameters.linesOfCodeThreshold);

    console.log("");
}


async function analyzeDirectoryAsync(parameters: Parameters, directoryPath: string): Promise<FileData[]> {

    const output: FileData[] = [];

    if (parameters.ignoreDirectories && parameters.ignoreDirectories.includes(path.basename(directoryPath)))
        return output;

    console.log(`Analyzing ${directoryPath}...`);

    const files = await fsAsync.readdir(directoryPath);

    for (let fileName of files) {

        const filePath = path.join(directoryPath, fileName);

        if (isDirectory(filePath)) {

            const recursiveResult = await analyzeDirectoryAsync(parameters, filePath);
            output.push(...recursiveResult);

            continue;
        }

        const lines = await readLinesAsync(filePath);

        const relativePath = path.relative(parameters.rootDirectory, filePath);
        const extension = path.extname(filePath);
        const linesOfCode = lines.length;

        output.push({ relativePath, extension, linesOfCode })
    }

    return output;
}

