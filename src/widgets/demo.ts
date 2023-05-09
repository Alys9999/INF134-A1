// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text} from "../core/ui";

class Demo extends Widget{
    private _rect: Rect;
    private _body: Rect;
    private _text: Text;
    // private defaultWidth: number = 50;
    private defaultWidth: number = 150;
    private defaultHeight: number = 50;
    private isDragging = false;
    private x: number = 0;
    private y: number = 0;
    private startDragX = 0;
    private startDragY = 0;
    private startThumbY = 0;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        // set Aria role
        this.role = RoleType.none;
        //mark widget as draggable
        this.isDraggable = true;
        // set default or starting state
        this.setState(new IdleUpWidgetState());

        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();

        //Drag demo
        this._body = this._group.rect(this.defaultWidth,this.defaultHeight).fill("silver").move(1,25);

        //Text demo

        // this._body = this._group.rect(this.defaultWidth,this.defaultHeight).fill("white").stroke("black")//.move(1,25);
        // this._text = this._group.text("").move(4, 20);
        // this._text.font({
        //     family:   'Helvetica'
        //   , size:     20
        //   , anchor:   'left'
        //   , leading:  '0.0em'
        //   })

        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        //this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this._body);
    }
    
    private initMove(clientX:number, clientY:number){
        this.isDragging = true;
        this.x = +this.outerSvg.x();
        this.y = +this.outerSvg.y();
        this.startDragX = clientX;
        this.startDragY = clientY;
    }
    
    private moveObj(event: MouseEvent){
        window.requestAnimationFrame(() => {
            const deltaX = event.clientX - this.startDragX; 
            const deltaY = event.clientY - this.startDragY; 
            this.move(this.x + deltaX, this.y + deltaY);
        });
    }

    private insertChar(char: string): void{

    }

    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {
        if (this.rawEvent != null){
            let e = this.rawEvent as MouseEvent;
            this.initMove(e.clientX, e.clientY);
        }
    }
    pressReleaseState(): void {
        
    }
    hoverState(): void {
        this.isDragging = false;
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
    }
    moveState(): void {
        if (this.isDragging){
            if (this.rawEvent != null){
                let e = this.rawEvent as MouseEvent;
                this.moveObj(e);
            }
        }
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        console.log(keyEvent)
        this._text.text(this._text.text() + keyEvent.key)
    }
}

export {Demo}