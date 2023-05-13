
// importing local code, code we have written
import {EventArgs, G, IdleUpWidgetState, PressedWidgetState, SVG } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";
import { CheckBox } from "./checkBox";


class CRadio extends Widget{
    private _fontSize: number = 10;
    private _radius: number = 16;
    private _rmap: Map<string,G> = new Map();
    private _namelist:Array<string>;
    private _pressednum: number = null;

    constructor(parent:Window, namelist:Array<string>){
        super(parent);
        // set defaults
        this._namelist=namelist;
        // set Aria role
        this.role = RoleType.group;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        for(let i = 0; i<this._namelist.length; i++){
            let currentgroup = this._group.group();
            let currentCircle=currentgroup.circle(this._radius);
            let currenttext = currentgroup.text(this._namelist[i]);
            currenttext.font('size', this._fontSize);
            currentCircle.fill("#00FFCA");
            currentCircle.stroke("black");
            currentCircle.attr("stroke-width",5);
            currentCircle.y(+currentCircle.y()+25*i)
            let box:Box = currenttext.bbox()
            currenttext.y(+currentCircle.y()+(+currentCircle.attr("r"))-(box.height/2))
            currenttext.x(+currentCircle.x()+(+currentCircle.attr("r"))*2.5)
            currentCircle.attr("id", i);
            this.registerEvent(currentgroup);
            this._rmap.set(this._namelist[i], currentgroup);
        }
        


        //this.positionText()
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        //this._group.circle(this._radius).opacity(0).attr('id', 0);
        
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    // private positionText(){
    //     let box:Box = this._text.bbox();
    //     // in TS, the prepending with + performs a type conversion from string to number
    //     this._text_y = (+this._circle.y() + ((+this._circle.attr("r"))) - (box.height/2));
    //     this._text_x = (+this._circle.x() + ((+this._circle.attr("r")*2.5)));
    //     if (this._text_y > 0){
    //         this._text.y(this._text_y);
    //     }
    //     if (this._text_x > 0){
    //         this._text.x(this._text_x)
    //     }
    // }

    override update(): void {
        // if(this._text != null)
        //     this._text.text(this._input);
        // if(this._circle != null)
        //     this._circle.fill(this.backcolor);
        super.update();
    }


    // set setInput(text:string){
    //     this._input = text;
    //     this.update();
    // }

    // get getInput(){
    //     return this._input;
    // }

    get getPressednum(){
        return this._pressednum;
    }

    //can i do it like a ispressed getter method to notify the consuming code?
    onClick(callback:{(event?:any):void}):void{
       this.attach(callback, new PressedWidgetState())
    }


    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        // if(this._pressednum!=null){
        //     this._rmap.get(this._namelist[this._pressednum]).get(0).fill("#525252");
        //     let unpressedlist = [...this._namelist];
        //     delete unpressedlist[this._pressednum];
        //     for (let item of unpressedlist){
        //         this._rmap.get(item).get(0).fill("#00FFCA");
        //     }
        // }
        // if (this._isPressed===false){
        //     this.backcolor="#00FFCA"
        // }else{
        //     this.backcolor="#525252";
        // }
    }
    idledownState(): void {
    }
    pressedState(): void {
        
        this.backcolor="#088395";
    }

    //why the color dont update?
    //the roletype cant be none
    pressReleaseState(): void {
        let x = (this.rawEvent as MouseEvent).target;
        if (x!=undefined){
            let id = (SVG(x) as Circle).attr("id");
            console.log(id);
        }
        
        this.raise(new EventArgs(this), new PressedWidgetState());
        // if (this._isPressed===false){
        //     this._isPressed=true;
        //     this.backcolor="#525252"
        //     this.raise(new EventArgs(this), new PressedWidgetState());
        // }else{
        //     this._isPressed=false;
        //     this.backcolor="#00FFCA";
        //     this.raise(new EventArgs(this), new PressedWidgetState());
        // }
    }

    hoverState(): void {
        this._rmap.get(this._namelist[this._pressednum]).get(0).fill("#525252");
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
        // if (this._isPressed===false){
        //     this.backcolor="#00FFCA"
        // }else{
        //     this.backcolor="#525252";
        // }
    }
    moveState(): void {
        
    }
    keyupState(): void {
        
    }
}

export {CRadio}