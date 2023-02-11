import "phaser";
import Debug from "./debug";
import { Player } from "./player";

export default class Demo extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  private player: Player;

  private thresholdOfScaleX: number = 1200;

  private debug: Debug;

  //   /** デバッグ表示領域 */
  //   private __debugDisplayArea?: Phaser.GameObjects.Container;
  //   /** デバッグ表示内容 */
  //   private __debugText: Phaser.GameObjects.Text[] =
  //     Array<Phaser.GameObjects.Text>(10);
  //   /** デバッグ内の文字スタイル */
  //   private __debugStyle: object = {
  //     fontSize: "14px",
  //     color: "white",
  //     wordWrap: {
  //       width: 720,
  //       useAdvancedWrap: true,
  //     },
  //   };
  //   /** デバッグ表示インターバル */
  //   private __debugInterval: number = 100;

  //   /**
  //    * デバッグモードを開始（create()から呼び出し）
  //    */
  //   private startDebugMode(): void {
  //     this.__debugDisplayArea = this.add.container(550, 350).setScrollFactor(0);

  //     for (var i = 0; i < 10; i++) {
  //       this.__debugText[i] = this.add.text(
  //         0,
  //         -300 + 20 * i,
  //         "",
  //         this.__debugStyle
  //       );
  //     }
  //     this.__debugDisplayArea.add([...this.__debugText]);
  //     this.__debugDisplayArea.setVisible(true);
  //   }

  //   /**
  //    * デバッグモード（update()から呼び出し）
  //    */
  //   private debugModeOn(): void {
  //     if (this.__debugInterval === 0) {
  //       this.__debugText[0].setText(`player.x = ${this.player.x}`);
  //       this.__debugText[1].setText(
  //         `thresholdOfScaleX = ${this.thresholdOfScaleX}`
  //       );
  //       this.__debugDisplayArea.setVisible(true);
  //       this.__debugInterval = 50;
  //     } else {
  //       this.__debugInterval--;
  //     }
  //   }

  constructor() {
    super("demo");
  }
  //画像などを事前に読み込む処理
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  // シーンに要素を作成する
  create() {
    this.add.image(400, 300, "sky").setScale(4, 1);
    // 静的グループで地面を作る
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "ground").setScale(4, 1).refreshBody();

    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    // プレイヤーキャラクターの追加
    this.player = new Player(
      this,
      this.cameras.main.centerX,
      this.cameras.main.height * 0.8
    );

    // //衝突判定を設定する
    this.physics.add.collider(this.player, this.platforms);

    //カメラがプレイヤーを追跡するようにする
    this.cameras.main.startFollow(this.player);

    // ステージの境界を設定する
    const stage = {
      x: 0,
      y: 0,
      width: config.width * 3,
      height: config.height,
    };

    this.cameras.main.setBounds(stage.x, stage.y, stage.width, stage.height);
    this.physics.world.setBounds(stage.x, stage.y, stage.width, stage.height);

    this.debug = new Debug(this, 550, 350);

    this.debug.startDebugMode();
  }

  update(time: number, delta: number): void {
    this.debug.debugModeOn(this.player, this.thresholdOfScaleX);

    //ステージを伸ばしたい
    // プレイヤーのx位置判定？ → 結果はあってる //背景と画面
    if (this.player.x > this.thresholdOfScaleX) {
      this.platforms
        .create(this.thresholdOfScaleX, 568, "ground")
        .setScale(10, 1)

        .refreshBody();
      this.thresholdOfScaleX += 1200;
    }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: Demo,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
