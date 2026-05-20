# Roadmap: ChromaDB 向量检索

## 目标

对历史 `## REVIEW`、`OKR` 段落建立向量索引，支持 QQ 自然语言查询：「上次类似卡住是什么时候」「Q1 KR2 相关复盘」。

## 架构（草案）

```
Vault (md) ──watch──▶ indexer (sidecar)
                          │
                          ▼
                    ChromaDB (data/chromadb/)
                          │
                          ▼
                    Gateway tool: vector_search
```

## 切片策略

- 按 `##` 二级标题切分
- metadata: `date`, `type` (review|okr|fragment), `path`

## 非目标（v1）

- 不替代 Obsidian 全文搜索
- 不同步 Chroma 到 Gitee（仅 VPS 本地 `data/chromadb/`）

## 状态

规划中，见 CHANGELOG Unreleased。
