// importing local code, code we have written
import {EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect} from "../core/ui";
import {CScrollthumb} from "./";
// importing code from SVG.js library


class CScrollbar extends Widget{
    private _bar: Rect;
    private _h: number = 400;

    constructor(parent:Window){
        super(parent);
        // set defaults
        
        // set Aria role
        this.role = RoleType.scrollbar;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._bar = this._group.rect(30,this._h);
        this._bar.fill("#dad7cd")
        // Set the outer svg element 
        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }


    override update(): void {
        super.update();
    }


    onClick(callback:{(event?:any):void}):void{
       this.attach(callback)
    }


    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {
    }
    pressReleaseState(): void {
    }
    hoverState(): void {
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
    }
    moveState(): void {
    }
    keyupState(): void {
        
    }
}

export {CScrollbar}