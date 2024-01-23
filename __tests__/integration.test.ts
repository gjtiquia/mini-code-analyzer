import path from "path"
import { analyzeAsync } from "../src";

describe("Integration Test", () => {
    it("should count the lines of code correctly", async () => {

        const results = await analyzeAsync({
            rootDirectory: path.join(__dirname, "./directory-to-test"),
            linesOfCodeThreshold: 10,
            targetExtensions: [".ts"]
        });

        expect(results).toHaveLength(3);
    })
})