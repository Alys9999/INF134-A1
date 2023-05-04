// importing local code, code we have written
import {EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
import {CheckBox} from "./checkBox";
// importing code from SVG.js library
import {Circle} from "../core/ui";


class CRadio extends Widget{
    private _fontSize: number = 8;
    private _inputArray: string[];
    private defaultFontSize: number = 12;
    private _isPressed: boolean = false;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this._fontSize = this.defaultFontSize;
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


        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor

        
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }


    override update(): void {

        
        super.update();
    }


    set setInput(text:string[]){
        this._inputArray = text;
        this.update();
    }

    get getInput(){
        return this._inputArray;
    }

    //can i do it like a ispressed getter method to notify the consuming code?
    onClick(callback:{(event?:any):void}):void{
       this.attach(callback)
    }


    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        if (this._isPressed===false){
            this.backcolor="#00FFCA"
        }else{
            this.backcolor="#525252";
        }
    }
    idledownState(): void {
    }
    pressedState(): void {
        this.backcolor="#088395";
    }



    //why the color dont update?
    //the roletype cant be none
    pressReleaseState(): void {
        if (this._isPressed===false){
            this._isPressed=true;
            this.backcolor="#525252"
        }else{
            this._isPressed=false;
            this.backcolor="#00FFCA";
        }
    }

    hoverState(): void {
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
        if (this._isPressed===false){
            this.backcolor="#00FFCA"
        }else{
            this.backcolor="#525252";
        }
    }
    moveState(): void {
        
    }
    keyupState(): void {
        
    }
}

export {CRadio}