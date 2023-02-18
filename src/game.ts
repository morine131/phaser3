import "phaser";
import Debug from "./debug";
import { Player } from "./player";

export default class Demo extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  private player: Player;

  private debug: Debug;

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
    //ゲームスピードの調整
    this.physics.world.timeScale = 1;
    this.tweens.timeScale = 1;
    this.time.timeScale = 1;

    this.add.image(400, 300, "sky").setScale(4, 1);
    // 静的グループで地面を作る
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "ground").setScale(8, 1).refreshBody();

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
    // this.cameras.main.startFollow(this.player);d

    // ステージの境界を設定する
    this.cameras.main.setBounds(stage.x, stage.y, stage.width, stage.height);

    this.debug = new Debug(this, 550, 350);
    this.debug.startDebugMode();
  }

  update(time: number, delta: number): void {
    this.debug.debugModeOn(this.player, stage.x);

    // 地面と空を伸ばす
    if (stage.x > stage.thresholdX - 1600) {
      this.platforms
        .create(stage.thresholdX, 568, "ground")
        .setScale(8, 1)
        .refreshBody();
      this.add.image(stage.thresholdX, 300, "sky").setScale(4, 1).setDepth(-1);

      stage.thresholdX += 2400;
    }
    //   this.platforms
    //     .create(this.thresholdOfScaleX - 400, 568, "ground")
    //     .setScale(8, 1)
    //     .refreshBody();
    //   this.add.image(stage.x - 400, 300, "sky").setScale(8, 1);

    //   this.thresholdOfScaleX += 1200;
    // }

    //強制スクロール
    this.cameras.main.scrollX++;
    stage.x++;
    this.physics.world.setBounds(stage.x, stage.y, stage.width, stage.height);
    this.cameras.main.setBounds(stage.x, stage.y, stage.width, stage.height);
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
      gravity: { y: 1000 },
      debug: false,
    },
  },
};

const stage = {
  x: 0,
  y: 0,
  width: config.width,
  height: config.height,
  thresholdX: 2400,
};

const game = new Phaser.Game(config);
