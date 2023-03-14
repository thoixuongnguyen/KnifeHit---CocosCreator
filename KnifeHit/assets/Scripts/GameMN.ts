import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameMN')
export class GameMN extends Component {
    @property({type: RichText})
    public richText: RichText|null = null;

    @property({type : Number, serializable : true})
    public knifeStart : number;
    @property({type : Number, serializable : true})
    static knifeLeft : number;
    start() {
        GameMN.knifeLeft = this.knifeStart;
    }

    update(deltaTime: number) {
        this.richText.string = "left : "+GameMN.knifeLeft.toString();
    }
}


