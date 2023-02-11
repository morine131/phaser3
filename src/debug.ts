import { Scene } from "phaser";
import { Player } from "./player";

export default class Debug extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    children?: Phaser.GameObjects.GameObject[]
  ) {
    super(scene, x, y);
    this.context = scene;
    this.context.add.existing(this);
    this.context.add.existing(this).setScrollFactor(0);
  }

  private context: Scene;
  /** デバッグ表示内容 */
  private __debugText: Phaser.GameObjects.Text[] =
    Array<Phaser.GameObjects.Text>(10);
  /** デバッグ内の文字スタイル */
  private __debugStyle: object = {
    fontSize: "14px",
    color: "white",
    wordWrap: {
      width: 720,
      useAdvancedWrap: true,
    },
  };
  /** デバッグ表示インターバル */
  private __debugInterval: number = 50;

  /**
   * デバッグモードを開始（create()から呼び出し）
   */
  public startDebugMode(): void {
    for (var i = 0; i < 10; i++) {
      this.__debugText[i] = this.context.add.text(
        0,
        -300 + 20 * i,
        "",
        this.__debugStyle
      );
    }
    this.add([...this.__debugText]);
    this.setVisible(true);
  }

  /**
   * デバッグモード（update()から呼び出し）
   */
  public debugModeOn(player: Player, thresholdOfScaleX: number): void {
    if (this.__debugInterval === 0) {
      this.__debugText[0].setText(`player.x = ${player.x}`);
      this.__debugText[1].setText(`thresholdOfScaleX = ${thresholdOfScaleX}`);
      this.setVisible(true);
      this.__debugInterval = 50;
    } else {
      this.__debugInterval--;
    }
  }
}
