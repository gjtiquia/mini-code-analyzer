import path from "path"
import fsAsync from "fs/promises"
import { isDirectory, readLinesAsync } from "./utils";

const rootDirectoryPath = path.join(__dirname, "../__tests__/directory-to-test");

async function main() {

    console.log("Mini Code Analyzer\n")


    console.log("Directory:", rootDirectoryPath);
    console.log("");

    await analyzeDirectoryAsync(rootDirectoryPath, rootDirectoryPath);
}

main();

async function analyzeDirectoryAsync(rootPath: string, directoryPath: string) {

    const files = await fsAsync.readdir(directoryPath);

    files.forEach(async (fileName) => {

        const filePath = path.join(directoryPath, fileName);

        if (isDirectory(filePath)) {
            await analyzeDirectoryAsync(rootPath, filePath);
            return;
        }

        const lines = await readLinesAsync(filePath);

        const relativePath = path.relative(rootPath, filePath);

        console.log(`${relativePath}; Type: File, LOC: ${lines.length}`);
    });
}

