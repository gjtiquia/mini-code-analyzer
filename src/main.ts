import path from "path";
import { ConsoleLogger } from "./loggers";
import { analyzeAsync } from ".";

analyzeAsync({
    rootDirectory: path.join(__dirname, "../__tests__/directory-to-test"),
    linesOfCodeThreshold: 10,
    targetExtensions: [".ts"],
    logger: new ConsoleLogger()
});
