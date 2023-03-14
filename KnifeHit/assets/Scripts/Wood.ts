
import { _decorator, Component, Node, Vec3, systemEvent, SystemEventType, EventKeyboard, macro, Prefab, instantiate, RichText, RichTextComponent, director } from 'cc';
import { Apple } from './Apple';
import { GameMN } from './GameMN';
import { Knife } from "./Knife";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Wood
 * DateTime = Sun Oct 24 2021 14:40:39 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Wood.ts
 * FileBasenameNoExtension = Wood
 * URL = db://assets/Wood.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Wood')
export class Wood extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type: Prefab})
    public knifePrefab: Prefab|null = null;

    
    @property({type: Node})
    public apple: Node|null = null;
    @property({type : Number})
    public speedInput;
    @property({type : Number})
    public random;
    @property({type: Node})
    public Won: Node|null = null;
    @property({type: RichText})
    public richText: RichText|null = null;
    public score : number = 0;
    public sprWoodRotation : number = 2.5;
    start () {
        // [3]
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    }

    update (deltaTime: number) {
    //     // [4]
        let newRotation = this.node.eulerAngles.z + this.sprWoodRotation * deltaTime;
        this.node.eulerAngles = new Vec3(0, 0, newRotation);
        this.richText.string = this.score.toString();
        if (GameMN.knifeLeft == -1)
        {
            director.loadScene("main1")
        }
        if(GameMN.knifeLeft == 0)
        {
            this.Won.active = true;
        }
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press a b key');
                GameMN.knifeLeft --;
                let newKnife = instantiate(this.knifePrefab);
                newKnife.parent = this.node.parent;
                newKnife.position = new Vec3(0, -250, 0);
                newKnife.getComponent(Knife).wood = this;
                this.score ++;
                break;
        }
    }
    changeSpeed(){
        let dir = Math.random() > 0.5 ? 1 : -1;
        let speed = this.speedInput + Math.random()*this.random;
        this.sprWoodRotation = dir * speed;
    };
    onLoad()
    {
        setInterval(() =>{
            this.changeSpeed();
        }, 250);
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
