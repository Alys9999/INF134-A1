// importing local code, code we have written
import {EventArgs, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
// importing code from SVG.js library
import {Circle} from "../core/ui";
import {SVG} from "../core/ui";



class Ctext extends Widget{
    private _circle: Circle;
    private _text: Text;
    private _fontSize: number;
    private _input: string;
    private _text_y: number;
    private _text_x: number;
    private _radius: number;
    private defaultText: string= "Write Here";
    private defaultFontSize: number = 12;
    private defaultRadius: number = 200

    constructor(parent:Window){
        super(parent);
        // set defaults
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._radius = this.defaultRadius;
        // set Aria role
        this.role = RoleType.window;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._circle = this._group.circle(this._radius);
        this._text = this._group.text(this._input);
        this.positionText();
        this._circle.stroke("black");
        this._circle.fill("white");







        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._circle.y() + ((+this._circle.attr("r"))) - (box.height/2));
        this._text_x = (+this._circle.x() + ((+this._circle.attr("r"))) - (box.width/2));
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
        if (this._text_x > 0){
            this._text.x(this._text_x)
        }
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText()

        if(this._circle != null)
            this._circle.fill(this.backcolor);
        if(this._radius != null)
            this._circle.radius(this._radius);
        
        super.update();
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    set setInput(text:string){
        this._input = text;
        this.update();
    }

    get getInput(){
        return this._input;
    }

    set setRadius(r:number){
        this._radius = r;
        this.update();
    }

    get getRadiu(){
        return this._radius;
    }

    onClick(callback:{(event?:any):void}):void{
       this.attach(callback, new PressedWidgetState())
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
        
        this.raise(new EventArgs(this), new PressedWidgetState());
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

export {Ctext}