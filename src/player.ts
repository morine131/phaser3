import { Scene } from "phaser";

const ANIM_STAT = {
  IDLE: "idle",
  RIGHT: "right",
  LEFT: "left",
} as const;

export class Player extends Phaser.GameObjects.Sprite {
  private context: Scene;

  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyW: Phaser.Input.Keyboard.Key;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "hoge");
    this.context = scene;

    this.anims.create({
      key: ANIM_STAT.LEFT,
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: ANIM_STAT.IDLE,
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: ANIM_STAT.RIGHT,
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.keyA = this.context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keyS = this.context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.keyD = this.context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.keyW = this.context.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );

    this.play(ANIM_STAT.IDLE);

    this.context.add.existing(this);
    this.context.physics.add.existing(this);
  }

  protected preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.keyA.isDown) {
      this.anims.play(ANIM_STAT.LEFT, true);
      this.x -= 10;
    } else if (this.keyD.isDown) {
      this.anims.play(ANIM_STAT.RIGHT, true);
      this.x += 10;
    }
    if (this.keyW.isDown) {
      this.y -= 10;
    }
  }
}
