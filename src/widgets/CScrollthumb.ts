// importing local code, code we have written
import {DragWindowState, EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";


class CScrollthumb extends Widget{
    private _circle: Circle;
    private _radius: number = 30;
    private isDragging = false;
    private x: number = 0;
    private y: number = 0;
    private startDragX = 0;
    private startDragY = 0;
    private _bary: number;
    private _h:number;

    constructor(parent:Window, h: number){
        super(parent);
        // set defaults
        this.isDraggable=true;
        this._h=h;
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
        this._circle = this._group.circle(this._radius);
        this._circle.stroke("black");
        this._circle.fill("#00FFCA");
        // Set the outer svg element 
        this.outerSvg = this._group;
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
            //const deltaX = event.clientX - this.startDragX; 
            const deltaY = event.clientY - this.startDragY; 
            if (this._bary<+this.y+deltaY && +this.y+deltaY<=this._bary+this._h-2*this._circle.attr("r")){
                this.move(+this.x, +this.y + deltaY);
            }
        });
    }

    scrollup(): void{
        if (this._bary<+this._circle.y()-20){
            this.move(+this._circle.x(), +this._circle.y() - 20);
        }
        else{
            this.move(+this._circle.x(), this._bary);
        }
        this.raise(new EventArgs(this), new DragWindowState());
    }

    scrolldown(): void{
        if (+this._circle.y()+20<+this._bary+this._h-2*this._circle.attr("r")){
            this.move(+this._circle.x(), +this._circle.y() + 20);
        }else{
            this.move(+this._circle.x(), +this._bary+this._h-2*this._circle.attr("r"));
        }
        this.raise(new EventArgs(this), new DragWindowState());
    }


    override update(): void {
        if(this._circle != null)
            this._circle.fill(this.backcolor);
        
        super.update();
    }

    set setbary(bary: number){
        this._bary=bary;
    }

    get getpos(){
        return [+this._circle.x(), +this._circle.y()];
    }


    set setRadius(r:number){
        this._radius = r;
        this.update();
    }

    get getRadiu(){
        return this._radius;
    }

    jump(e: MouseEvent){
        if (+this._bary<e.clientY && e.clientY<+this._bary+this._h){
            console.log(this.x);
            this.move(+this._circle.x(), e.clientY);
        }
    }

    onClick(callback:{(event?:any):void}):void{
       this.attach(callback, new PressedWidgetState())
    }

    onMove(callback:{(event?:any):void}):void{
        this.attach(callback, new DragWindowState())
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
        this.raise(new EventArgs(this), new PressedWidgetState());
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
                this.raise(new EventArgs(this), new DragWindowState());
            }
        }
        
        
    }
    keyupState(): void {
        
    }
}

export {CScrollthumb}