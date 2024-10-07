# Markdownとは？

> **Markdown**（マークダウン）とは、文書を記述する軽量マークアップ言語である。プレーンテキスト形式で手軽に書いた文書からHTMLを生成するために開発されたが、PowerPoint形式やLaTeX形式のファイルへ変換するソフトウェア（コンバータ）も開発されている。

[Markdown (Wikipedia)](https://ja.wikipedia.org/wiki/Markdown) より引用

---

# 見出し

```md
# 見出し１

## 見出し２

### 見出し３

#### 見出し４
```

↓ 実際の表示 ↓

# 見出し１

## 見出し２

### 見出し３

#### 見出し４

---

# 引用

```md
> 引用文のテスト。引用文のテスト。引用文のテスト。

> 引用文のテスト。
>
> > 入れ子の引用文のテスト。
```

↓ 実際の表示 ↓

> 引用文のテスト。引用文のテスト。引用文のテスト。

> 引用文のテスト。
>
> > 入れ子の引用文のテスト。

---

# リスト

```md
-   リストアイテム１
-   リストアイテム２
    -   リストアイテム２－１
        -   リストアイテム２－２

1. 番号アイテム１
2. 番号アイテム２
    1. 番号アイテム２－１
        1. 番号アイテム２－２
```

↓ 実際の表示 ↓

-   リストアイテム１
-   リストアイテム２
    -   リストアイテム２－１
        -   リストアイテム２－２

1. 番号アイテム１
2. 番号アイテム２
    1. 番号アイテム２－１
        1. 番号アイテム２－２

---

# チェックボックス

```md
-   [ ] 空欄チェックボックス
-   [x] 記入済チェックボックス
```

↓ 実際の表示 ↓

-   [ ] 空欄チェックボックス
-   [x] 記入済チェックボックス

---

# 水平線

```md
---
---
```

↓ 実際の表示 ↓

---

---

---

# リンク

```md
<https://www.forestotzka.com/>

https://www.forestotzka.com/
```

↓ 実際の表示 ↓

<https://www.forestotzka.com/>

https://www.forestotzka.com/

---

# インラインリンク

```md
[エアリプの森トップページ](https://www.forestotzka.com/)

[エアリプの森トップページ](/)

[エアリプの森ニュース一覧](/news)
```

↓ 実際の表示 ↓

[エアリプの森トップページ](https://www.forestotzka.com/)

[エアリプの森トップページ](/)

[エアリプの森ニュース一覧](/news)

---

# 強調・斜体

```md
_斜体_

**強調**

**_強調・斜体_**
```

↓ 実際の表示 ↓

_斜体_

**強調**

**_強調・斜体_**

---

# 打ち消し

```md
~~打ち消し~~
```

↓ 実際の表示 ↓

~~打ち消し~~

---

# 外部の画像

```md
![検索虫眼鏡のイラスト - いらすとや](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhZof730mrjOz5V7uKnP6I7WHry7hAdRVFTuEvTIDTnty5Vjrm6JHqh5jfCJp7VRE4TubG8EDyYT-loxD9q3z1rtyLxNEo51yXcePHsM41xaf2Fp54Ibmj1NlxjVDZcoVS3a1jI0y22uo/s800/search_mushimegane.png)
```

↓ 実際の表示 ↓

![検索虫眼鏡のイラスト - いらすとや](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhZof730mrjOz5V7uKnP6I7WHry7hAdRVFTuEvTIDTnty5Vjrm6JHqh5jfCJp7VRE4TubG8EDyYT-loxD9q3z1rtyLxNEo51yXcePHsM41xaf2Fp54Ibmj1NlxjVDZcoVS3a1jI0y22uo/s800/search_mushimegane.png)

---

# 内部の画像

```
root/
  markdown.md
  image.png
```

のようなディレクトリ構造の場合で

```md
![画像タイトル](image.png)
```

↓ 実際の表示 ↓

![画像タイトル](image.png)

---

# インラインコード

```md
文中に `hogeFunction()` のようにコードを記入できます。
```

↓ 実際の表示 ↓

文中に `hogeFunction()` のようにコードを記入できます。

---

# コードブロック

````md
```
ABC = 12345
```
````

↓ 実際の表示 ↓

```
ABC = 12345
```

また、コードブロックでは以下のオプションが使用できます

## シンタックスハイライト

````
```json
{
    "title": "タイトル",
    "description": "説明"
}
```
````

↓ 実際の表示 ↓

```json
{
    "title": "タイトル",
    "description": "説明"
}
```

## コードブロックタイトル

````
```js title="main.js"
function main() {
    console.log('Hello World');
}
```
````

↓ 実際の表示 ↓

```js title="main.js"
function main() {
    console.log('Hello World');
}
```

## コードブロックキャプション

````
```py caption="ここにキャプションを記入"
def main(x):
    print("Hello World")
```
````

↓ 実際の表示 ↓

```py caption="ここにキャプションを記入"
def main(x):
    print("Hello World")
```

## 行番号

````
```java showLineNumbers
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```
````

↓ 実際の表示 ↓

```java showLineNumbers
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

---

# テーブル

```md
| Left  | Center | Right |
| :---- | :----: | ----: |
| 1     |   2    |     3 |
| 4     |   5    |     6 |
| **7** | **8**  | **9** |
```

| Left  | Center | Right |
| :---- | :----: | ----: |
| 1     |   2    |     3 |
| 4     |   5    |     6 |
| **7** | **8**  | **9** |
