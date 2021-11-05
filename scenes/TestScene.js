import Phaser from "phaser";

const FLOOR_KEY = 'FLOOR_KEY'
const BACKGROUND_KEY = 'BACKGROUND_KEY'

const BIKER_KEY = 'BIKER_KEY'
const BIKER_RUN_KEY = 'BIKER_RUN_KEY'
const BIKER_JUMP_KEY = 'BIKER_JUMP_KEY'
const BIKER_ATTACK1_KEY = 'BIKER_ATTACK1_KEY'

const WIDTH_RESCALE = 800/1920
const HEIGHT_RESCALE = 600/1080

export default class TestScene extends Phaser.Scene{

    constructor(){
        super('test-scene')
    }

    preload(){

        //stage 1
        this.load.image(FLOOR_KEY, 'Stage1/floor.png')
        this.load.image(BACKGROUND_KEY, 'Stage1/bg.png')

        //Biker
        this.load.spritesheet(BIKER_KEY,'Biker/Biker_idle.png', {frameWidth: 48, frameHeight: 48})
        this.load.spritesheet(BIKER_RUN_KEY,'Biker/Biker_run.png', {frameWidth: 48, frameHeight: 48})
        this.load.spritesheet(BIKER_JUMP_KEY,'Biker/Biker_jump.png', {frameWidth: 48, frameHeight: 48})
        this.load.spritesheet(BIKER_ATTACK1_KEY,'Biker/Biker_attack1.png', {frameWidth: 48, frameHeight: 48})
    }

    create(){

        this.createStage1()
        this.biker = this.createBiker()

        this.physics.add.collider(this.biker, this.floor)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.attackKey = this.input.keyboard.addKey('a')

    }

    createStage1(){

        this.bg = this.physics.add.staticImage(400,300,BACKGROUND_KEY)
    


        this.floor = this.physics.add.staticSprite(400,600, FLOOR_KEY)
        this.floor.scaleX = WIDTH_RESCALE
        this.floor.body.immovable = true
        this.floor.refreshBody()

        
    }
    createBiker(id = 1){
        this.id = id
        const biker = this.physics.add.sprite(100,450,BIKER_KEY);
        biker.setScale(3)
        biker.setBounce(0)
        biker.setCollideWorldBounds(true)
        biker.body.setSize(2)
        

        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers(BIKER_KEY, {start:0, end: 3}),
            frameRate: 10,
            repeat: 1
        })

        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers(BIKER_RUN_KEY, {start:0, end: 5}),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers(BIKER_RUN_KEY, {start:0, end: 5}),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key:'jump',
            frames: this.anims.generateFrameNumbers(BIKER_JUMP_KEY, {start:0, end: 3}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key:'attack1',
            frames: this.anims.generateFrameNumbers(BIKER_ATTACK1_KEY, {start:0, end: 5}),
            frameRate: 20,
            repeat: -1
        })

        return biker
    }
    
    update(){

        let playerGrounded = this.biker.body.touching.down
        
        if (this.cursors.right.isDown)
		{
			this.biker.setVelocityX(400)

			if(playerGrounded)this.biker.anims.play('right', true)
            this.biker.flipX = false
		}else if (this.cursors.left.isDown)
		{
			this.biker.setVelocityX(-400)

			if(playerGrounded)this.biker.anims.play('left', true)
            this.biker.flipX = true

		}else if(this.attackKey.isDown){

            if(playerGrounded)this.biker.anims.play('attack1', true)
            this.biker.setVelocityX(0)

        }else{

            if(playerGrounded)this.biker.anims.play('idle', true)
            this.biker.setVelocityX(0)
        }
        
        if(this.cursors.up.isDown && playerGrounded){
            this.biker.setVelocityY(-400)
            this.biker.anims.play('jump')
        }
            
    }
}