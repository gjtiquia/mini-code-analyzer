# Mini Code Analyzer

A simple CLI tool to analyze the lines of code of scripts if it reaches a maximum threshold.

## Quick Start

Analyze current working directory with default parameters.

```bash
npx mini-code-analyzer
```

Analyze directory with arguments.

```bash
npx mini-code-analyzer --directory ./src --lines-of-code 200 --extensions js,jsx,ts,tsx
```

Sample Output

```txt
Mini Code Analyzer

Directory: ./src
Target Extensions: [ '.ts' ]
Lines of Code Threshold: 5

[Relative Path] | [Lines Of Code]
analyzeAsync.ts | 108
bin.ts          | 24
interfaces.ts   | 19
loggers.ts      | 43
utils.ts        | 24

Total number of files: 5
```

## Arguments

- --directory, -d
  - Root Directory to begin analysis
  - Default: Current working directory
  - Eg. `npx mini-code-analyzer -d "C:\Users\YourName\Documents\Projects\YourProject"`

- --lines-of-code, -l
  - Lines of code threshold
  - Default: 500
  - Eg. `npx mini-code-analyzer -l 500`

- --extensions, --extension, -e
  - Extensions to include in analysys
  - Default: All extensions
  - Eg. `npx mini-code-analyzer -e js,jsx,ts,tsx`

## Planned Features

- Ignore files from `.gitignore`
