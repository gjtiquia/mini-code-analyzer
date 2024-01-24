# Mini Code Analyzer

## Quick Start

```bash
npx mini-code-analyzer --directory ./src --lines-of-code 200
```

## Arguments

- --directory, -d
  - Root Directory to begin analysis
  - Default: `pwd` (present working directory)
  - Eg. `npx mini-code-analyzer -d "C:\Users\YourName\Documents\Projects\YourProject"`

- --extensions, --extension, -e
  - Extensions to include in analysys
  - Default: All extensions
  - Eg. `npx mini-code-analyzer -e js,jsx,ts,tsx`

- --lines-of-code, -l
  - Lines of code threshold
  - Default: 500
  - Eg. `npx mini-code-analyzer -l 500`
