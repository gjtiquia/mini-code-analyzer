#!/usr/bin/env node

import yargs from "yargs"
import { analyzeAsync } from "./analyzeAsync";
import { ConsoleLogger } from "./loggers";

(async () => {

    const args: any = yargs.argv;

    const rootDirectory = (args.directory ?? args.d ?? process.cwd()) as string;

    const targetExtensionsInput = (args.extensions ?? args.extension ?? args.e ?? "") as string; // eg. "ts,tsx,js"
    const targetExtensions = targetExtensionsInput.length > 0 ? targetExtensionsInput.split(",").map(x => "." + x) : [];

    const linesOfCodeThreshold = (args["lines-of-code"] ?? args.l ?? 500) as number;

    await analyzeAsync({
        rootDirectory,
        targetExtensions,
        linesOfCodeThreshold,
        logger: new ConsoleLogger(),
    });
})();
