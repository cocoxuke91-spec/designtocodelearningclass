# Pmagic AI · 建工领域超级工程大脑

基于原始设计截图还原的响应式落地页，当前以 HTML/React + CSS 实现，后续可直接在此基础上接入真实业务接口和 CMS 内容。

## 本地开发

要求 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

打开 <http://localhost:3000/> 查看页面。

## 目录约定

- `app/`：页面、组件与全局样式
- `public/assets/`：生产静态资源；指标图标位于 `icons/metrics/`
- `docs/source-of-truth/`：原始截图、切片、视觉规格和决策记录
- `scripts/`：资源处理与动画生成脚本
- `.openai/hosting.json`：部署平台配置

## 质量检查

```bash
npm run build
npx tsc --noEmit
```

当前项目的 Cloudflare Worker 类型依赖需要在部署环境中提供；如果本地类型检查只报告 `cloudflare:workers`、`Fetcher` 或 `D1Database`，属于环境类型缺失，不是页面代码错误。

## 资源与事实源

请先阅读 [source-of-truth README](docs/source-of-truth/README.md)。所有设计还原判断、素材来源和替换规则都记录在该目录中。图标资产说明见 [public/assets/icons/README.md](public/assets/icons/README.md)。

## 下一步研发建议

1. 将 `LandingPage.tsx` 中的静态数组迁移到内容配置或 CMS。
2. 为预约演示按钮接入表单 API 和数据校验。
3. 将案例、白皮书和 CTA 的占位素材替换为正式图片。
4. 接入真实分析事件，并补充移动端和键盘交互测试。
