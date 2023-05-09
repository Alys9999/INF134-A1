import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"
import { Template } from "./widgets/template";
import { CButton } from "./widgets/cButton";
import { CheckBox } from "./widgets/checkBox";
import { CRadio } from "./widgets/cradio";
import { CScrollbar } from "./widgets/CScrollbar";


let w = new Window(window.innerHeight-10,'100%');


let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(100,50);


let btn2 = new CButton(w);
btn2.tabindex = 2;
btn2.fontSize = 12;
btn2.setInput="Setted Label";
btn2.move(100, 100);

btn2.onClick((event:any)=>{
    lbl1.text="Fire";
})

let lbl2= new Heading(w);
lbl2.text = "CheckBox Demo";
lbl2.tabindex = 3;
lbl2.fontSize = 16;
lbl2.move(200,50);

let checkB = new CheckBox(w);
checkB.tabindex=4;
checkB.move(200,100);
checkB.onClick((event:any)=>{
    if (checkB.getIsPressed){
        lbl2.text="checked";
    }else{
        lbl2.text="Unchecked";
    }
})

let lbl3= new Heading(w);
lbl3.text = "Radio Demo";
lbl3.tabindex = 5;
lbl3.fontSize = 16;
lbl3.move(300,50);

let crad = new CRadio(w,new Array("1","2","3"));
crad.tabindex=6;
crad.move(300,100);
crad.onClick((event:any)=>{

})

let scrollbar = new CScrollbar(w);
scrollbar.tabindex=7;
scrollbar.move(400,100);
