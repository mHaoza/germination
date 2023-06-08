---
tags:
  - git
---

# husky迁移到simple-git-hooks不生效
直接更换npm包从husky迁移到simple-git-hooks后，遇到问题

## 原因及解决
husky 修改了core.gitHooks的值，导致simple-git-hooks失效，改回来即可

### 查看配置
如果输出 `.husky`则说明 `husky` 可能改变了 `core.gitHooks` 的值
``` shell
git config core.hooksPath
```

### 修改配置
使用以下指令修改，此时输出 `.git/hooks/`
``` shell
git config core.hooksPath .git/hooks/
```
