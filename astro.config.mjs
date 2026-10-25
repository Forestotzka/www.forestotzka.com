import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Markdown数式とmcfunctionコードをAstroのビルド時に変換する。
const mcfunction = {
  name: 'mcfunction',
  scopeName: 'source.mcfunction',
  patterns: [
    { match: '#.*$', name: 'comment.line.number-sign.mcfunction' },
    { match: '"(?:\\\\.|[^"\\\\])*"', name: 'string.quoted.double.mcfunction' },
    { match: '\\b(?:advancement|attribute|ban|ban-ip|banlist|bossbar|clear|clone|data|datapack|debug|defaultgamemode|deop|difficulty|effect|enchant|execute|experience|fill|forceload|function|gamemode|gamerule|give|help|item|kick|kill|list|locate|loot|me|msg|particle|playsound|recipe|reload|save-all|say|scoreboard|seed|setblock|setworldspawn|spawnpoint|spectate|spreadplayers|stopsound|summon|tag|team|teleport|tell|time|title|trigger|weather|whitelist|worldborder|xp)\\b', name: 'keyword.control.mcfunction' },
    { match: '\\b(?:true|false)\\b', name: 'constant.language.boolean.mcfunction' },
    { match: '-?\\b\\d+(?:\\.\\d+)?\\b', name: 'constant.numeric.mcfunction' },
    { match: '@[aespr](?:\\[[^\\]]*\\])?', name: 'variable.language.selector.mcfunction' },
  ],
};

// Shikiがコードブロックへ追加する不要なtabindexを取り除く。
const removePreTabIndex = () => ({
  name: 'remove-pre-tabindex',
  pre(node) {
    if (node.properties) delete node.properties.tabindex;
  },
});

export default defineConfig({
  site: 'https://www.forestotzka.com',
  compressHTML: true,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      langs: [mcfunction],
      transformers: [removePreTabIndex()],
    },
  },
});
