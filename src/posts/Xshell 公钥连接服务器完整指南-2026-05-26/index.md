---
title: Xshell 公钥连接服务器完整指南
date: 2026-05-26
tags: [SSH, Linux, 开发笔记,服务器运维]
categories: []
cover: ""
excerpt: ""
featured: true
---

> 2025-05-26 · 实践记录

---

## 一、为什么要用公钥认证？

密码登录有两个硬伤：

- **暴力破解风险**：只要 SSH 端口暴露在公网，每分钟都有机器人在撞库。
- **密码泄露**：弱密码、重复密码、被钓鱼，任一环节出问题就是灾难。

公钥认证从根本上解决这两个问题——**没有密码可撞，私钥永不离开本机**。

---

## 二、核心原理

### 2.1 非对称加密简介

公钥认证基于非对称加密（又称公钥密码体制）。核心思想是：

> 一对密钥，一把锁、一把钥匙。锁（公钥）可以分发到任何地方，钥匙（私钥）永远留在自己手里。

数学上，这对密钥有以下性质：

| 特性 | 私钥 | 公钥 |
|------|------|------|
| 保密性 | **必须保密**，任何人拿到即等于控制权 | 可以公开发放 |
| 加密能力 | 可以加密 / 签名 | 可以加密 / 验证签名 |
| 推导关系 | 可以推导出公钥 | **无法**从公钥推导出私钥 |

常用的非对称算法：
- **RSA**：经典算法，基于大整数分解难题。推荐 3072+ 位。
- **Ed25519**：现代椭圆曲线算法，密钥短、速度快、安全性高。目前最推荐。

### 2.2 SSH 公钥认证流程（握手过程）

整个握手分为 4 个阶段：

```
┌──────────────┐                         ┌──────────────┐
│   客户端      │                         │   服务器      │
│  (Xshell)    │                         │  (sshd)      │
└──────┬───────┘                         └──────┬───────┘
       │                                        │
       │  【阶段1：发起认证请求】                   │
       │  "我是 user，我想用公钥登录"              │
       │────────────────────────────────────────>│
       │                                        │
       │  【阶段2：质询-响应（Challenge-Response）】 │
       │                                        │ ① 读取 ~/.ssh/authorized_keys
       │                                        │   中该用户的公钥
       │                                        │ ② 生成随机字符串 challenge
       │  challenge (随机字符串)                  │ ③ 用公钥加密 challenge
       │<────────────────────────────────────────│
       │                                        │
       │  【阶段3：回复签名】                      │
       │ ① 用本地私钥对 challenge 签名             │
       │ ② 返回签名结果                           │
       │  signature ────────────────────────────>│
       │                                        │
       │                                        │  【阶段4：验证】 
       │                                        │ 用公钥验证签名 == challenge
       │                                        │ ✓ 验证通过 → 建立会话
       │                                        │ ✗ 验证失败 → 拒绝连接
       │                                        │
       │  【会话建立，开始加密通信】                 │
       │<════════════════════════════════════════>│
       │                                        │
```

**关键安全性分析：**

1. **私钥从未离开客户端**——全程只在本地做签名运算，不传输私钥本身。
2. **每次 challenging 随机**——即使被嗅探，截获的 challenge 和 signature 也无法用于下一次连接（重放攻击无效）。
3. **服务器只存公钥**——就算服务器被攻破，攻击者也只能拿到一堆公钥，没有私钥什么都做不了。

### 2.3 为什么私钥可以证明身份

这是整个体系中最容易被误解的地方。不是"用私钥解密"，而是**数字签名**：

- 服务器发出随机质询 `challenge`
- 客户端用私钥对 `challenge` **签名**得到 `signature`
- 服务器用对应公钥**验签**：如果 `verify(公钥, challenge, signature) == true`，就证明客户端确实持有该私钥

类比：服务器扔给你一张白纸，让你盖上只有你自己有的印章。任何看到印章的人都能验证章是真的（公钥），但只有你能盖这个章（私钥）。

---

## 三、密钥生成

### 3.1 在 Xshell 中生成密钥

1. 打开 Xshell → **工具** → **新建用户密钥生成向导**
2. 密钥类型选择 **Ed25519**（优先，速度快、安全性高、密钥最短）
   - 兼容旧系统可选 RSA，位数至少 3072
3. 点击下一步，等待随机数据采集完成
4. 为密钥设置名称（建议：`id_ed25519_服务器名`）
5. **设置密码短语（Passphrase）**——强烈建议设置
   - 这就是给私钥再加一层密码保护
   - 即使私钥文件泄露，没有 Passphrase 也无法使用
   - 权衡：安全 vs 便利（每次都输入）
6. 保存为文件，完成

> 不设置 Passphrase 的私钥 = 把存折放在家门口，上面还写着密码。

### 3.2 在服务器上用命令行生成（Linux/macOS）

```bash
# Ed25519（推荐）
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_myhost

# RSA 4096（备用）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/id_rsa_myhost
```

---

## 四、部署公钥到服务器

### 方法一：Xshell 自带功能（最简单）

1. Xshell 连接服务器（先用密码登录一次）
2. 菜单栏 → **工具** → **用户密钥管理者**
3. 选中你的密钥 → 点击 **属性**
4. 在 **公钥** 标签页中 **复制公钥**
5. SSH 到服务器，执行：
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   echo "粘贴复制的公钥" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

### 方法二：手动复制公钥

#### 如果你有公钥文件（`*.pub`）：

打开公钥文件（用记事本），内容类似：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... your_email@example.com
```

复制整行内容，在服务器上执行：
```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI..." >> ~/.ssh/authorized_keys
```

#### 如果是从 `ssh-keygen` 生成的：

```bash
# 一条命令搞定（本地执行）
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@your_server_ip
```

### 权限检查（服务器端）

`.ssh` 目录和 `authorized_keys` 文件的权限**必须正确**，否则 sshd 会拒绝公钥认证：

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

验证：
```bash
ls -la ~/.ssh/
# drwx------  .ssh/
# -rw-------  authorized_keys
```

---

## 五、Xshell 会话配置

### 5.1 创建公钥认证会话

1. **新建会话**或编辑已有会话
2. 左侧选择 **连接 → 用户身份验证**
3. 方法选择 **Public Key**
4. 用户名填写服务器的登录用户
5. 用户密钥 → 浏览 → 选择你生成的 Ed25519 密钥
6. 回到 **连接** 标签页，填写主机和端口

### 5.2 测试连接

保存后直接连接：

- 如果设置了 Passphrase，会弹出输入框
- 如果一切正常，应该**直接登录**，不再提示密码
- 如果失败，检查登录日志（见下一节）

---

## 六、常见问题排查

### 问题1：提示 "Server refused our key"

最可能的原因是**服务器端权限错误**。检查：

```bash
# 服务器端查看 sshd 日志
sudo tail -f /var/log/auth.log        # Debian/Ubuntu
sudo tail -f /var/log/secure           # CentOS/RHEL/Rocky
```

常见关键日志：
```
Authentication refused: bad ownership or modes for directory /home/user/.ssh
Authentication refused: bad ownership or modes for file /home/user/.ssh/authorized_keys
```

### 问题2：提示输入密码，公钥彻底没生效

检查 `/etc/ssh/sshd_config`：

```bash
PubkeyAuthentication yes           # 必须为 yes
AuthorizedKeysFile .ssh/authorized_keys  # 确认路径
PasswordAuthentication yes          # 关闭密码前先确认公钥能登录
```

修改后记得重启 sshd：
```bash
sudo systemctl restart sshd
```

> **警告**：在公钥认证完全 OK 之前，不要关闭 `PasswordAuthentication`！否则可能把自己锁在服务器外面。

### 问题3：提示 "No supported authentication methods available"

Xshell 会话配置中的"用户身份验证"方法里，`Public Key` 没有被勾选，或者顺序不对。

### 问题4：Windows 下密钥文件权限太宽

Xshell 用户通常不受此影响（Xshell 自己管理密钥），但如果你手动复制了私钥文件到 `C:\Users\你的用户名\.ssh\`，可能需要收紧权限：

```powershell
# 右键 → 属性 → 安全 → 高级 → 禁用继承 → 仅当前用户有完全控制权限
```

### 问题5：公钥内容不完整

复制公钥时注意：

- `ssh-ed25519` 后面**有且只有一个空格**
- 公钥是一行，中间**没有换行**
- 末尾的注释 `your_email@example.com` 可有可无，前面部分不能缺

---

## 七、安全强化（进阶）

### 7.1 关闭密码登录

确认公钥登录没问题后：

```bash
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

### 7.2 关闭 root 密码登录

```bash
sudo sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
```

效果：root 只能用公钥登录，不能密码登录。

### 7.3 私钥管理建议

| 建议 | 说明 |
|------|------|
| 不同服务器用不同密钥对 | 避免一处泄露全部沦陷 |
| 设置 Passphrase | 私钥文件的最后一道防线 |
| 定期轮换 | 建议 6-12 个月更换一次密钥对 |
| 旧公钥及时删除 | 离职、换电脑后从 authorized_keys 中移除 |

### 7.4 一个手势记住全部：

```
生成密钥 → 公钥放服务器 → 私钥配 Xshell → 测通 → 关密码
```

---

## 八、原理速查卡片

| 概念 | 一句话解释 |
|------|-----------|
| **非对称加密** | 用公钥加密，用私钥解密；从公钥推不出私钥 |
| **SSH 握手** | 服务器用公钥加密随机数 → 客户端用私钥签名 → 服务器验签 |
| **私钥** | 身份的唯一凭证，永不离开本机 |
| **公钥** | 公开的锁，放服务器 `authorized_keys` 里 |
| **Passphrase** | 给私钥文件再加一层密码保护 |
| **authorized_keys** | 服务器上存放允许登录的公钥列表 |

---

*实践日：2025-05-26*

