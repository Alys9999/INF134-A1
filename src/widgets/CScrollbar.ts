// importing local code, code we have written
import {DragWindowState, EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect} from "../core/ui";
import {CScrollthumb} from "./CScrollthumb";
import { CScrolldown } from "./scrolldown";
import {CScrollup} from "./scrollup";
// importing code from SVG.js library


class CScrollbar extends Widget{
    private _bar: Rect;
    private _h: number = 400;
    private _thumb: CScrollthumb;
    private _scrollup: CScrollup;
    private _scrolldown: CScrolldown;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this._scrollup = new CScrollup(parent as Window);
        this._scrolldown = new CScrolldown(parent as Window);
        // set Aria role
        this.role = RoleType.scrollbar;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
        this._thumb = new CScrollthumb(this.parent as Window, this._h);
        this._thumb.onMove((event:any)=>{
            this.raise(new EventArgs(this), new DragWindowState());
        })
        
        // 
        // this._scrolldown.move(+this._bar.x, +this._bar.y+this._h-40);
        // this._scrollup.onClick((event:any)=>{
        //     this._thumb.move(+this._bar.x(), +this._bar.y()-20)
        // })
        // this._scrolldown.onClick((event:any)=>{
        //     this._thumb.move(+this._bar.x(), +this._bar.y()+20)
        // })
        
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
        this._thumb.setbary=(+this._bar.y());
        this._thumb.move(+this._bar.x(), +this._bar.y());
        this._scrollup.move(+this._bar.x(), +this._bar.y()-30);
        this._scrollup.onClick((event:any)=>{
                this._thumb.scrollup();
            })
        this._scrolldown.move(+this._bar.x(), +this._bar.y()+this._h);
        this._scrolldown.onClick((event:any)=>{
            this._thumb.scrolldown();
        })
        super.update();
    }
    onMove(callback:{(event?:any):void}):void{
        this.attach(callback, new DragWindowState())
     }

    get getthumbpos(){
        return this._thumb.getpos;
    }

    get getthumb(){
        return this._thumb;
    }

    onClick(callback:{(event?:any):void}):void{
       this.attach(callback, new PressedWidgetState());
       this._thumb.attach(callback, new PressedWidgetState());
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
        if (this.rawEvent!=null){
            let e = this.rawEvent as MouseEvent;
            this._thumb.jump(e);
        }
        this.raise(new EventArgs(this), new PressedWidgetState());
        this._thumb.raise(new EventArgs(this._thumb), new PressedWidgetState());
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