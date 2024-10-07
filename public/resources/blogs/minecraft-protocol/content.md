# マインクラフトのプロトコル

マインクラフトでは、独自のTCPベースのプロトコルが使用されており、ゲーム内の通信が行われています。今回はこのプロトコルの概要と、いくつかの細かな仕様について紹介します。 

## プロトコルとは？

プロトコルとは、通信を行うための「手順」や「規約」を意味します。たとえば、今あなたが見ているこのWebページは、HTTPというプロトコルを使用して、サーバーから情報を読み込んでいます。

## TCPって？

TCP（Transmission Control Protocol）は、データを確実に送受信するために使用される通信プロトコルです。主にインターネットで使われ、信頼性の高いデータ転送を保証します。よく比較されるUDPとは異なり、TCPは安定した通信を重視しますが、UDPは遅延や処理の効率に優れています。  
  
マインクラフトでは、Java版でTCPが、統合版ではUDPが使われており、両者のプロトコルには互換性がありません。  

## TCPとマインクラフトのプロトコルの関係性
TCPはあくまでデータ転送の信頼性を提供するもので、マインクラフトの独自プロトコルがその上で動いています。データ転送はTCPを使いますが、実際のゲームデータのやり取りには独自の規格が必要です。

# 具体的な例を見てみよう！ プレイヤーの移動（クライアント→サーバー）

プレイヤーが移動したときなどに、クライアントはサーバーに座標などを含むパケットを送信します。移動関連のパケットだけでも4種類存在します。  

| データ名 | データ型 | 説明 |
| ---- | ---- | ---- |
| X | Double | プレイヤーのX軸の絶対座標 |
| Y | Double | プレイヤーのY軸の絶対座標 |
| Z | Double | プレイヤーのZ軸の絶対座標 |
| Yaw | Float | プレイヤーの横向きの回転 |
| Pitch | Float | プレイヤーの縦向きの回転 |
| On Ground | Boolean | プレイヤーが地面の上にいるかどうか |
  
基本はこのパケットで、座標の情報がないバージョン、向きの情報がないバージョン、座標も向きもなくOnGroundのみのバージョンを合わせて4種類です。  
  
## パケットが送信されるタイミング

これらのパケットは、プレイヤーが動いたり、視点を動かしたときに送信されます。マイクラは20ticks毎秒ですから、1秒で最大20個の移動パケットが送信されます。逆に、動きや視点に変化がない場合は情報は含まれません。これは無駄な通信を減らし、帯域幅を節約するためです。  
  
動かさないと何も送信されないのかというと、実はそうではありません。クライアントは、プレイヤーが動いていなくても、1秒に一度、座標を含むパケットをサーバーに送信します。これは「アイドルパケット」と呼ばれ、プレイヤーが動いていないことを示します。

## 特殊な通信仕様
ここでは、移動に関するパケットの恐ろしい特殊仕様をご紹介します。    
ここで紹介する物以外にも、いくつか特殊仕様は存在します。それらは別の記事で紹介できればと思います。  

### 0.03 (バージョン1.18.2以前)
「0.03」と呼ばれているこの特殊仕様は、マンクラフトに存在する同期ズレの一つです。  
クライアントは、0.03ブロック以下の動きをサーバー側に**送信しません**。先述した1秒に一回送信されるパケットでようやく同期されます。  
  
幸いなことに、1.18.2でこの問題は緩和され、送信する基準は「0.0002」になりましたが、問題そのものは未だに残っています。  
  
プレイヤーの無操作状態を検知したいときなどに、この仕様のせいで面倒を強いられます。プレイヤーがゆっくり停止したあと、実際には動いていないのにもかかわらず、サーバーからはプレイヤーが1秒後に再び動いているように見えます。  
1.8では毎tick座標が送信されるので、この問題を心配する必要はありません。  

### 1.17 duplicate (バージョン1.17～1.20.6)
「1.17 duplicate」と呼ばれているこの特殊仕様は、名前から推測できるように「移動パケットが二重に送信される」という仕様です。  
  
本来であれば、同一座標のパケットは送信しません。送っても意味が無いからです。ところが、この仕様のせいで移動パケットが1tickに2回送信されることがあるのです。  
ではなぜこんな仕様が生まれてしまったのか。...それはとあるバグ修正に起因しています。  
  
「バケツの同期ズレバグ」( https://bugs.mojang.com/browse/MC-12363 )  
  
このバグは、プレイヤーが視点を急に大きく動かしながらバケツを水に対して使用した場合、ブロック状態の同期ズレが生じてしまうバグです。これを修正するために、Mojangは移動パケットを二重に送信するようにしてしまいました。他にも修正する方法はあったと思うのですが、、、  
  
なんと愚かな実装なことか、と一部では「愚かなパケット」とも呼ばれていたりします。  
幸いなことに1.21でこの問題は完全に修正されました。  

## テレポート時に送信される移動パケット

### テレポートの後には同期のために移動パケットが送信される
マインクラフトのテレポートは、以下の流れに沿って動いています。  
  
1. サーバーがテレポート後の座標とテレポートIDを含むパケットをクライアントに送信する（テレポートパケット）。座標は絶対位置と相対位置の二種類の指定方法がある。
2. クライアントがテレポートIDを含むパケットをサーバーに送る（テレポート確認パケット）。
3. クライアントが、サーバー側が指定した座標と同じ座標を含む移動パケットをサーバーに送る（通常の移動パケット）。
  
バニラのサーバーは、2の確認パケットを受信したときにクライアントがテレポートを受け入れたとみなします。3で受信した座標の検証は行いません。改造クライアントは、3の座標を変更することでテレポートを無視できる場合があることに注意が必要です。  
  
バニラのサーバーは、テレポートが送信された後にクライアントから確認パケットを受信するまで、クライアントからの移動パケットを全て無視します。高Pingプレイヤーに対して連続してテレポートを送信すると、同期ズレを起こしてしまうというバグがあります。( https://bugs.mojang.com/browse/MC-197855 )

# まとめ
マインクラフトのプロトコルは、[有志によってこちらのサイトにまとめられています](https://wiki.vg/Protocol)。興味を深めたい人はぜひそちらもご覧ください！  
  
このサイトでは、他にもマインクラフトに関する技術関係の記事を投稿しています。そちらもぜひご覧ください！