// importing local code, code we have written
import {EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";


class CScrollbar extends Widget{
    private _circle: Circle;
    private _bar: Rect;
    private _h: number = 400;
    private _radius: number = 30;
    private isDragging = false;
    private x: number = 0;
    private y: number = 0;
    private startDragX = 0;
    private startDragY = 0;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.isDraggable=true;
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
        this._circle = this._group.circle(this._radius);
        this._circle.stroke("black");
        this._circle.fill("#00FFCA");
        this._bar.fill("#dad7cd")
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.circle(this._radius).opacity(0).attr('id', 0);
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    private initMove(clientX:number, clientY:number){
        this.isDragging = true;
        this.x = +this._circle.x();
        this.y = +this._circle.y();
        this.startDragX = clientX;
        this.startDragY = clientY;
    }
    
    private moveObj(event: MouseEvent){
        window.requestAnimationFrame(() => {
            const deltaX = event.clientX - this.startDragX; 
            const deltaY = event.clientY - this.startDragY; 
            this.move(+this._circle.x + deltaX, +this._circle.y + deltaY);
        });
    }


    override update(): void {
        if(this._circle != null)
            this._circle.fill(this.backcolor);
        
        super.update();
    }


    set setRadius(r:number){
        this._radius = r;
        this.update();
    }

    get getRadiu(){
        return this._radius;
    }

    onClick(callback:{(event?:any):void}):void{
       this.attach(callback)
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
        if (this.rawEvent != null){
            let e = this.rawEvent as MouseEvent;
            this.initMove(e.clientX, e.clientY);
        }
    }
    pressReleaseState(): void {
        this.backcolor="#00FFCA";
        this.raise(new EventArgs(this));
    }
    hoverState(): void {
        this.isDragging = false;
        this.backcolor="#05BFDB";
    }
    hoverPressedState(): void {
        this.backcolor="#088395";
    }
    pressedoutState(): void {
        this.backcolor="#00FFCA";
    }
    moveState(): void {
        if (this.isDragging){
            if (this.rawEvent != null){
                let e = this.rawEvent as MouseEvent;
                this.moveObj(e);
            }
        }
        
    }
    keyupState(): void {
        
    }
}

export {CScrollbar}