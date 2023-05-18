import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { Template } from "./widgets/template";
import { CButton } from "./widgets/cButton";
import { CheckBox } from "./widgets/checkBox";
import { CRadio } from "./widgets/cradio";
import { CScrollbar } from "./widgets/CScrollbar";
import { CScrollthumb } from "./widgets/CScrollthumb";
import { Ctext } from "./widgets/Ctext";
import { CNovel } from "./widgets/novel";


let w = new Window(window.innerHeight-10,'100%');


let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(100,50);


let btn2 = new CNovel(w);
btn2.tabindex = 2;
btn2.move(100, 100);
btn2.nextfunction((event:any)=>{
    lbl1.text="task one triggered";
}, "blahblah");

btn2.nextfunction((event:any)=>{
    lbl1.text="task two triggered";
}, "hello world");

btn2.nextfunction((event:any)=>{
    lbl1.text="task three triggered";
}, "yahoooooo!");
btn2.onClick();

