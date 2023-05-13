// importing local code, code we have written
import {EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";


class CScrollup extends Widget{
    private _circle: Circle;
    private _radius: number = 30;

    constructor(parent:Window){
        super(parent);
        // set defaults
        // set Aria role
        this.role = RoleType.button;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._circle = this._group.circle(this._radius);
        this._circle.stroke("black");
        this._circle.fill("#00FFCA");
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.circle(this._radius).opacity(0).attr('id', 0);
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }


    override update(): void {
        if(this._circle != null)
            this._circle.fill(this.backcolor);
        super.update();
    }

    onClick(callback:{(event?:any):void}):void{
       this.attach(callback, new PressedWidgetState())
    }


    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.backcolor="#00FFCA";
    }
    idledownState(): void {
    }
    pressedState(): void {
        this.backcolor="#088395";
    }
    pressReleaseState(): void {
        this.backcolor="#00FFCA";
        this.raise(new EventArgs(this), new PressedWidgetState());
    }
    hoverState(): void {
        this.backcolor="#05BFDB";
    }
    hoverPressedState(): void {
        this.backcolor="#088395";
    }
    pressedoutState(): void {
        this.backcolor="#00FFCA";
    }
    moveState(): void {
        
    }
    keyupState(): void {
        
    }
}

export {CScrollup}