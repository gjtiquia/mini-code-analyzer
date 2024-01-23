import path from "path";
import { ConsoleLogger } from "./loggers";
import { analyzeAsync } from ".";

analyzeAsync({
    rootDirectory: "C:\\Users\\gersh\\Documents\\Repo\\9cat-2d\\Assets\\Scripts",
    linesOfCodeThreshold: 500,
    targetExtensions: [".cs"],
    logger: new ConsoleLogger()
});

// analyzeAsync({
//     rootDirectory: path.join(__dirname, "../__tests__/directory-to-test"),
//     linesOfCodeThreshold: 10,
//     targetExtensions: [".ts"],
//     logger: new ConsoleLogger()
// });
