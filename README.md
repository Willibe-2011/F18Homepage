# F18 Homepage

F18 Homepage 是一个基于 Next.js App Router 的官网项目，用于展示「18 岁以下创业者」的精选档案。  
站点数据主要来自 Notion 数据库，首页、探索页和个人详情页都会基于 Notion 内容实时/准实时渲染。

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS v4
- Notion API（作为内容源）
- Vercel Analytics（仅生产环境启用）

## 核心功能

- 首页展示品牌 Hero、核心指标（来自 Notion 统计库）与精选人物
- `Explore` 页面支持按行业、年龄、关键词筛选与排序
- 动态个人页 `profile/[id]`，包含故事正文、证据链接、OG 预览图抓取
- `About` 页面展示平台定位与受众价值
- `Get Featured` 页面提供申请表单 UI（当前为前端模拟提交）

## 项目结构

```text
app/
  page.tsx                 # 首页
  explore/                 # 探索页（含筛选客户端组件）
  profile/[id]/            # 创业者详情页（按 slug）
  about/                   # 关于页
  get-featured/            # 申请页
components/                # 页面组件与 UI 组件
lib/
  notion.ts                # Notion 数据拉取与映射逻辑
  data.ts                  # Profile 类型与 mock 数据
  og.ts                    # 外链 OG 图抓取工具
```

## 环境变量

在项目根目录创建 `.env.local`：

```bash
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_profiles_database_id
# 可选：首页统计条使用的数据库 ID（不填则使用代码内默认值）
NOTION_LATEST_DATABASE_ID=your_stats_database_id
```

说明：

- `NOTION_DATABASE_ID`：用于读取人物档案（已发布条目）。
- `NOTION_LATEST_DATABASE_ID`：用于读取首页统计快照（取最新一条）。

## 本地开发

推荐 Node.js 20.x（`package.json` 已声明 engine）。

```bash
npm install
npm run dev
```

开发服务默认启动在 [http://localhost:3000](http://localhost:3000)。

## 可用脚本

- `npm run dev`：启动开发环境
- `npm run build`：构建生产包
- `npm run start`：运行生产包
- `npm run lint`：执行 ESLint

## 数据流简述

1. `lib/notion.ts` 通过 Notion API 查询数据库；
2. 将 Notion Page 属性映射为 `F18Profile`；
3. 页面层按需消费：
   - 首页与探索页读取已发布列表；
   - 详情页按 slug 查单条数据；
   - 首页统计条读取独立统计库最新记录。

## 部署建议

- 推荐部署到 Vercel；
- 将上述环境变量配置到部署平台；
- 若使用 ISR / 缓存策略，发布后可根据内容更新频率调整 `revalidate` 参数。

## 备注

- 仓库中 `lib/data.ts` 保留了 `mockProfiles`，但生产数据路径以 Notion 为主。
- `app/get-featured/page.tsx` 目前仅为前端表单交互示例，未接入后端持久化。
