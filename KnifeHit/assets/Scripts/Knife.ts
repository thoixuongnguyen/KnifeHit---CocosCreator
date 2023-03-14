
import { _decorator, Component, Node, RigidBody, director, RigidBody2D, Vec3, Collider2D, IPhysics2DContact, Contact2DType, cclegacy, tween, RichText } from 'cc';
import { Apple } from './Apple';
import { GameMN } from './GameMN';
import { Wood } from "./Wood";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Knife
 * DateTime = Sun Oct 24 2021 14:41:15 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Knife.ts
 * FileBasenameNoExtension = Knife
 * URL = db://assets/Knife.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Knife')
export class Knife extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: RigidBody2D})
    public BodyAnim: RigidBody2D|null = null;

    @property({type: Wood})
    public wood: Wood|null = null;

    

    
    public getApple : boolean = false;
    @property
    public trangthai: number = 10;
    static score : number = 0;

    angle: number = 0;

    start () {
        // [3]
        Knife.score = 0;
        this.trangthai = 2;
        this.angle = -this.wood.node.eulerAngles.z;
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update (deltaTime: number) {
    //     // [4]
        if (this.trangthai == 1)
        {
            let newPosition = new Vec3(100 * Math.cos((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 100 * Math.sin((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 0);
            this.node.position = newPosition;
            this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z + this.angle + 90));
        }
        else if (this.trangthai == 2)
        {
            let newY = this.node.position.y + deltaTime * 500;
            if (newY > -100)
            {
                newY = -100;
                this.trangthai = 1;
            }
            this.node.position = new Vec3(0, newY, 0);
            this.angle = -this.wood.node.eulerAngles.z - 90;
        }
    }
    AddApplePoint(){
        this.wood.score += 30;
    }
    
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (this.trangthai == 2)
        {
            console.log('onBeginContact');
            director.loadScene("main1");
        }
        if(otherCollider.tag == 2)
        {
            if (this.getApple == false)
            {
                tween(this.wood.apple)
                    .to(0.5, {position : new Vec3 (1000, 1000,1000)})
                    .start();
                this.AddApplePoint();
                this.getApple = true;
            }
            
        }

    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
