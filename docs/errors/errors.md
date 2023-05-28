# 报错汇总
收集自己遇到过的报错


## 1. node
### 1.1 package.js
#### 1.1.1 Error [ERR_REQUIRE_ESM]: require() of ES Module
**起因**：`package.js`中设置了`"type": "module"`，而项目中使用的`commitlint.config.js`为`commonjs`,而非`esm`导致模块引入失败。  
___
**解决**：将`commitlint.config.js`改名为`commitlint.config.cjs`，即使用cjs后缀
___
``` shell
D:\project\blogProject\germination\node_modules\.pnpm\ts-node@10.9.1_@types+node@18.14.1_typescript@4.9.5\node_modules\ts-node\dist\index.js:851
            return old(m, filename);
                   ^
Error [ERR_REQUIRE_ESM]: require() of ES Module D:\project\blogProject\germination\commitlint.config.js from D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\loaders.js not supported.
commitlint.config.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead rename commitlint.config.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in D:\project\blogProject\germination\package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).

    at Object.require.extensions.<computed> [as .js] (D:\project\blogProject\germination\node_modules\.pnpm\ts-node@10.9.1_@types+node@18.14.1_typescript@4.9.5\node_modules\ts-node\dist\index.js:851:20)
    at module.exports (D:\project\blogProject\germination\node_modules\.pnpm\import-fresh@3.3.0\node_modules\import-fresh\index.js:32:59)        
    at loadJs (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\loaders.js:16:18)
    at Explorer.loadFileContent (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:90:20)
    at Explorer.createCosmiconfigResult (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:98:36)
    at Explorer.loadSearchPlace (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:75:23)
    at async Explorer.searchDirectory (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:60:27)
    at async run (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:41:22)       
    at async cacheWrapper (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\cacheWrapper.js:16:18)
    at async Explorer.search (D:\project\blogProject\germination\node_modules\.pnpm\cosmiconfig@8.1.0\node_modules\cosmiconfig\dist\Explorer.js:3
```
