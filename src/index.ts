import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { Template } from "./widgets/template";
import { CButton } from "./widgets/cButton";
import { CheckBox } from "./widgets/checkBox";


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);


let btn2 = new CButton(w);
btn2.tabindex = 3;
btn2.fontSize = 12;
btn2.setInput="Setted Label";
btn2.move(100, 100);

btn2.onClick((event:any)=>{
    lbl1.text="Fire";
})

let checkB = new CheckBox(w);
checkB.tabindex=4;
checkB.move(200,100);

