# Raq.Store 兑换店预告页面 - 技术架构文档

## 1. 技术栈选型

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| HTML5 | 页面结构 | 语义化标签，SEO 友好 |
| CSS3 (Variables + Grid/Flexbox) | 样式设计 | 现代 CSS 特性，支持主题切换和响应式布局 |
| Vanilla JavaScript (ES6+) | 交互逻辑 | 无框架依赖，轻量高效 |
| Google Fonts | 字体 | 多语言兼容，加载性能优化 |

## 2. 页面架构

### 2.1 组件结构
```
App
├── Header
│   ├── Logo
│   └── LanguageSwitcher
├── Main
│   ├── HeroSection
│   │   ├── Title
│   │   └── Subtitle
│   ├── CountdownSection
│   │   └── CountdownTimer
│   ├── ContractInfo
│   │   ├── ContractLabel
│   │   └── ContractAddress (copyable)
│   └── TechInfo
│       └── Description
└── Footer
    └── Copyright
```

### 2.2 多语言架构
- 使用 JavaScript 对象存储所有翻译文本
- 通过 `data-i18n` 属性标记需要翻译的元素
- 语言切换时动态更新 DOM 内容
- 语言偏好存储在 `localStorage`

### 2.3 语言配置
```javascript
const LANGUAGES = {
  'zh-CN': '中文',
  'en': 'English',
  'zh-TW': '繁體中文',
  'ja': '日本語',
  'ru': 'Русский',
  'fr': 'Français'
};
```

## 3. 样式架构

### 3.1 CSS 变量体系
```css
:root {
  /* 颜色系统 */
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-tertiary: #1A1A1A;
  --text-primary: #FFFFFF;
  --text-secondary: #888888;
  --text-tertiary: #555555;
  --accent-primary: #D4AF37;
  --accent-secondary: #F4D03F;
  --border-color: #2A2A2A;
  
  /* 间距系统 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 64px;
  
  /* 字体系统 */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Noto Sans SC', sans-serif;
  
  /* 动画 */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### 3.2 响应式断点
| 断点 | 宽度 | 适用设备 |
|------|------|----------|
| 移动端 | < 768px | 手机 |
| 平板 | 768px - 1024px | 平板 |
| 桌面 | > 1024px | 桌面/笔记本 |

### 3.3 动画效果
- 页面加载: 元素依次渐入 (fade-in-up)
- 语言切换: 内容淡入淡出过渡
- 倒计时: 数字变化时有微妙缩放效果
- 合约地址悬停: 边框高亮 + 提示"点击复制"
- 背景: 使用 CSS 伪元素创建微妙的渐变光晕效果

## 4. 多语言实现方案

### 4.1 翻译数据结构
```javascript
const translations = {
  'zh-CN': {
    'title': '兑换店即将上线',
    'subtitle': '安全、高效的跨链兑换服务',
    'launch_date': '预计上线时间',
    'launch_date_value': '2026年6月18日 UTC',
    'contract_address': 'BSC 合约地址',
    'tech_desc': '基于 BNB Chain 的 1:1 跨链兑换',
    'copy_success': '已复制',
    'footer': '© 2026 Raq.Store. All rights reserved.'
  },
  // 其他语言...
};
```

### 4.2 切换逻辑
1. 用户点击语言切换器
2. 显示下拉语言列表
3. 选择语言后:
   - 更新页面所有 `data-i18n` 元素
   - 保存选择到 `localStorage`
   - 关闭下拉菜单

## 5. 倒计时实现

### 5.1 目标时间
```javascript
const TARGET_DATE = new Date('2026-06-18T00:00:00Z');
```

### 5.2 显示格式
```
XX 天 XX 时 XX 分 XX 秒
```

### 5.3 更新频率
每秒更新一次，使用 `setInterval`

## 6. 合约地址复制功能

### 6.1 交互流程
1. 用户点击合约地址
2. 调用 `navigator.clipboard.writeText()`
3. 显示"已复制"提示
4. 2秒后恢复原始显示

### 6.2 降级方案
对于不支持 Clipboard API 的浏览器，使用 `document.execCommand('copy')` 降级方案

## 7. 部署方案

### 7.1 GitHub Pages 部署流程
1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支的 `/ (root)` 目录
4. 配置自定义域名（可选）

### 7.2 自定义域名配置
1. 在域名服务商添加 CNAME 记录指向 `username.github.io`
2. 在仓库根目录创建 `CNAME` 文件
3. 在 GitHub Pages 设置中配置自定义域名

## 8. 性能优化

| 优化项 | 实现方案 |
|--------|----------|
| 字体加载 | 使用 `font-display: swap` 避免闪烁 |
| 图片优化 | LOGO 使用 WebP 格式或压缩 PNG |
| CSS 优化 | 使用 CSS 变量，避免重复代码 |
| JS 优化 | 使用事件委托，减少 DOM 操作 |
| 缓存策略 | 静态资源设置长期缓存 |

## 9. 文件结构
```
raq.store/
├── index.html              # 主页面
├── css/
│   └── style.css           # 全局样式
├── js/
│   └── main.js             # 交互逻辑（多语言、倒计时、复制）
└── assets/
    └── logo.png            # LOGO图片
```