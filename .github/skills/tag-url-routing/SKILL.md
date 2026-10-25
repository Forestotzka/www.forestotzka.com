---
name: tag-url-routing
description: Astroの静的サイトで予約文字を含むタグを安全に検索URLへ変換する方法。
---

# タグURLルーティング

Astroの静的な動的ルート（`[tag].astro`）は、スラッシュを含む値を単一のパスパラメータとして扱えない。タグ名をそのままパスへ埋め込んだり、`encodeURIComponent`した値を`getStaticPaths`の`params`へ渡したりしても、ルート生成時の制約を回避できない。

タグ名に `/`、`?`、`#` のいずれかが含まれる場合はリンクを生成せず、タグ名だけを表示する。それ以外のタグは `/tags/${encodeURIComponent(tag)}/` へリンクし、`src/pages/tags/[tag].astro` の `getStaticPaths()` でビルド時に対象記事だけを生成する。クエリパラメータとクライアント側の全記事フィルタは使わない。
