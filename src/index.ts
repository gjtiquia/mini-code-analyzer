import path from "path"
import fsAsync from "fs/promises"
import { isDirectory, readLinesAsync } from "./utils";
import { Parameters, FileData, Logger } from "./interfaces";
import { NullLogger } from "./loggers";

export async function analyzeAsync(parameters: Parameters): Promise<FileData[]> {

    printHeader(parameters);

    const rootDirectoryPath = parameters.rootDirectory;
    const targetExtensions = parameters.targetExtensions;
    const logger: Logger = parameters.logger ?? new NullLogger();

    const result = await analyzeDirectoryAsync(parameters, rootDirectoryPath);

    logger.clear();

    printHeader(parameters);

    const filteredResults = result
        .filter(x => targetExtensions.length > 0 ? targetExtensions.includes(x.extension) : true)
        .filter(x => x.linesOfCode >= parameters.linesOfCodeThreshold)

    logger.table(filteredResults);

    return filteredResults;
}

function printHeader(parameters: Parameters) {
    const logger: Logger = parameters.logger ?? new NullLogger();

    logger.log("\n\nMini Code Analyzer\n")

    logger.log("Directory:", parameters.rootDirectory);
    logger.log("Target Extensions:", parameters.targetExtensions);
    logger.log("Lines of Code Threshold:", parameters.linesOfCodeThreshold);

    logger.log("");
}

async function analyzeDirectoryAsync(parameters: Parameters, directoryPath: string): Promise<FileData[]> {

    const output: FileData[] = [];

    if (parameters.ignoreDirectories && parameters.ignoreDirectories.includes(path.basename(directoryPath)))
        return output;

    const logger: Logger = parameters.logger ?? new NullLogger();

    logger.log(`Analyzing ${directoryPath}...`);

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

