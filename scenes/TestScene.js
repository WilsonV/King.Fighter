import Phaser from "phaser";

const FLOOR_KEY = 'FLOOR_KEY'
const BACKGROUND_KEY = 'BACKGROUND_KEY'

const BIKER_KEY = 'BIKER_KEY'
const BIKER_RUN_KEY = 'BIKER_RUN_KEY'
const BIKER_JUMP_KEY = 'BIKER_JUMP_KEY'
const BIKER_DOUBLE_JUMP_KEY = 'BIKER_DOUBLE_JUMP_KEY'
const BIKER_ATTACK1_KEY = 'BIKER_ATTACK1_KEY'
const BIKER_ATTACK2_KEY = 'BIKER_ATTACK2_KEY'
const BIKER_RUN_ATTACK_KEY = 'BIKER_RUN_ATTACK_KEY'


const WIDTH_RESCALE = 800 / 1920
//const HEIGHT_RESCALE = 600/1080

export default class TestScene extends Phaser.Scene {

    constructor() {
        super('test-scene')
    }

    preload() {

        //stage 1
        this.load.image(FLOOR_KEY, 'Stage1/floor.png')
        this.load.image(BACKGROUND_KEY, 'Stage1/bg.png')

        //Biker
        this.load.spritesheet(BIKER_KEY, 'Biker/Biker_idle.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_RUN_KEY, 'Biker/Biker_run.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_JUMP_KEY, 'Biker/Biker_jump.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_DOUBLE_JUMP_KEY, 'Biker/Biker_doublejump.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_ATTACK1_KEY, 'Biker/Biker_attack1.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_ATTACK2_KEY, 'Biker/Biker_attack2.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet(BIKER_RUN_ATTACK_KEY, 'Biker/Biker_run_attack.png', { frameWidth: 48, frameHeight: 48 })
    }

    create() {

        this.createStage1()
        this.biker = this.createBiker()

        this.physics.add.collider(this.biker, this.floor)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.attackKey = this.input.keyboard.addKey('a')
        this.attackKey2 = this.input.keyboard.addKey('s')

        this.biker.on('animationcomplete', function (anim,frame){
            this.emit("animationcomplete_" + anim.key, anim, frame)
        },this.biker)
        
        this.biker.on("animationcomplete_attack1", function(){
            this.anims.play("idle")
        })

        this.biker.on("animationcomplete_attack2", function(){
            this.anims.play("idle")
        })

        this.biker.on("animationcomplete_run_attack", function(){
            this.anims.play("idle")
        })

        // this.cursors.right.on("down",()=>{
        //     let playerGrounded = this.biker.body.touching.down
        //     this.biker.setVelocityX(10)

        //     if (playerGrounded) this.biker.anims.play('right', true)
        //     this.biker.flipX = false
        // })

        this.cursors.up.on("down",()=>{
            let currentAnim = this.biker.anims.getName()
            if(!currentAnim.includes("jump")){
                this.biker.setVelocityY(-400)
                this.biker.anims.play('jump')
            }else{
               if(currentAnim == "jump"){
                 this.biker.setVelocityY(-400)
                 this.biker.anims.play('doublejump')
               }
            }
        })

        this.attackKey.on("down",()=>{
            let currentAnim = this.biker.anims.getName()
            let playerGrounded = this.biker.body.touching.down
            console.log("about to punch...")

            if(playerGrounded && !currentAnim.includes("attack")){
                //console.log("previous anim is:",currentAnim)
                this.biker.setVelocityX(this.biker.body.velocity.x / 2)
                if(currentAnim == "right" || currentAnim == "left"){
                    this.biker.anims.play("run_attack")
                    this.biker.anims.on
                }else{
                    this.biker.anims.play("attack1")
                    this.biker.anims.on
                }
            }
        })

        this.attackKey2.on("down",()=>{
            let currentAnim = this.biker.anims.getName()
            let playerGrounded = this.biker.body.touching.down
            console.log("about to punch2...")

            if(playerGrounded && currentAnim != "attack2"){
                console.log("punch2!")
                this.biker.anims.play("attack2")
                this.biker.anims.on
                this.biker.setVelocityX(this.biker.body.velocity.x / 2)
                
            }
        })
    }

    createStage1() {

        this.bg = this.physics.add.staticImage(400, 300, BACKGROUND_KEY)



        this.floor = this.physics.add.staticSprite(400, 600, FLOOR_KEY)
        this.floor.scaleX = WIDTH_RESCALE
        this.floor.body.immovable = true
        this.floor.refreshBody()


    }
    createBiker(id = 1) {
        this.id = id
        const biker = this.physics.add.sprite(100, 450, BIKER_KEY);
        biker.setScale(3)
        biker.setBounce(0)
        biker.setCollideWorldBounds(true)
        biker.body.setSize(2)


        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(BIKER_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(BIKER_RUN_KEY, { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(BIKER_RUN_KEY, { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers(BIKER_JUMP_KEY, { start: 0, end: 3 }),
            frameRate: 4,
            repeat: 1
        })

        this.anims.create({
            key: 'doublejump',
            frames: this.anims.generateFrameNumbers(BIKER_DOUBLE_JUMP_KEY, { start: 0, end: 5 }),
            frameRate: 6,
            repeat: 0
        })

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers(BIKER_ATTACK1_KEY, { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers(BIKER_ATTACK2_KEY, { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'run_attack',
            frames: this.anims.generateFrameNumbers(BIKER_RUN_ATTACK_KEY, { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        })

        return biker
    }

    update() {

        let playerGrounded = this.biker.body.touching.down;
        let currentAnim = this.biker.anims.getName();

        //console.log("frame name",this.biker.anims.getFrameName())
        if(!currentAnim.includes("attack")){
            if (this.cursors.right.isDown) {
                this.biker.setVelocityX(400)

                if (playerGrounded) this.biker.anims.play('right',true)
                this.biker.flipX = false
            } else if (this.cursors.left.isDown) {
                this.biker.setVelocityX(-400)

                if (playerGrounded) this.biker.anims.play('left', true)
                this.biker.flipX = true


            } else {

                if (playerGrounded){
                    this.biker.anims.play('idle', true)
                    this.biker.setVelocityX(0)
                }
            }
        }

    }
}