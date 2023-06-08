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
import { GridLayoutManager } from "./core/grid";
import { CNovel } from "./widgets/novel";


let w = new Window(window.innerHeight-10,'100%');
let width=window.innerWidth/4;
let height=(window.innerHeight-10)/3;

let GLM = new GridLayoutManager(3, 4, width, height, w);

//GLM.createGridVisualization();

let username = new Ctext(w);
username.tabindex = 1;
username.defaulttext="Username: ";
if (width<height){
    username.setRadius=width/2;
}else{
    username.setRadius=height/2;
};
let usernameObj = {element: username, col: 1, row:1};
GLM.addWidget(usernameObj);

let password = new Ctext(w);
password.tabindex = 2;
password.defaulttext="Password: ";
if (width<height){
    password.setRadius=width/2;
}else{
    password.setRadius=height/2;
};
let passwordObj = {element: password, col: 2, row:1};
GLM.addWidget(passwordObj);

let saveInfo_checkbox = new CheckBox(w);
saveInfo_checkbox.tabindex=3;
saveInfo_checkbox.setInput="save account information";
let saveInfo_checkboxObj = {element: saveInfo_checkbox, col: 1, row:2};
GLM.addWidget(saveInfo_checkboxObj);

let login_button = new CButton(w);
login_button.tabindex = 4;
login_button.fontSize = 12;
login_button.setInput="Login";
login_button.onClick((event:any)=>{
    lbl1.text="You have logged in!\nYour " + username.getInput;
})
let login_buttonObj = {element: login_button, col: 2, row:2};
GLM.addWidget(login_buttonObj);

let lbl1= new Heading(w);
lbl1.text = "Have not log in yet";
lbl1.tabindex = 1;
lbl1.fontSize = 32;
lbl1.backcolor = "#ff8080";
let h1Obj={element: lbl1, row: 0, col: 1};
GLM.addWidget(h1Obj);

let loginType= new Heading(w);
loginType.text = "Logging in as student";
loginType.tabindex = 1;
loginType.fontSize = 32;
loginType.backcolor = "#809fff";
let loginTypeObj={element: loginType, row: 1, col: 3};
GLM.addWidget(loginTypeObj);

let novel = new CNovel(w);
if (width<height){
    novel.setRadius=width/2;
}else{
    novel.setRadius=height/2;
};

novel.setInput="Change to Instructor";
novel.nextfunction((event:any)=>{
    loginType.text = "Logging in as Instructor";
    loginType.backcolor="#00FFCA";
}, "Change to Student");
novel.nextfunction((event:any)=>{
    loginType.text = "Logging in as Student";
    loginType.backcolor="#809fff";
}, "Change to Instructor");
let novelObj={element: novel, row: 2, col: 3};
GLM.addWidget(novelObj);


// let btn2 = new CButton(w);
// btn2.tabindex = 2;
// btn2.fontSize = 12;
// btn2.setInput="Setted Label";
// btn2.move(100, 100);

// btn2.onClick((event:any)=>{
//     lbl1.text="Fire";
// })

// let lbl2= new Heading(w);
// lbl2.text = "CheckBox Demo";
// lbl2.tabindex = 3;
// lbl2.fontSize = 16;
// lbl2.move(300,50);

// let checkB = new CheckBox(w);
// checkB.tabindex=4;
// checkB.move(300,100);
// checkB.onClick((event:any)=>{
//     if (checkB.getIsPressed){
//         lbl2.text="checked";
//     }else{
//         lbl2.text="Unchecked";
//     }
// })

// let lbl3= new Heading(w);
// lbl3.text = "Radio Demo";
// lbl3.tabindex = 5;
// lbl3.fontSize = 16;
// lbl3.move(500,50);

// let crad = new CRadio(w,new Array("1","2","3"));
// crad.tabindex=6;
// crad.move(500,100);
// crad.setname(0, "alyssa");
// crad.onClick((event:any)=>{
//     lbl3.text="the item of index "+crad.getPressednum +" is clicked";
// })

// let bartext = new Heading(w);
// bartext.tabindex=10;
// bartext.move(700,50);
// bartext.text="bar thumb position";


// //the click of scrollthumb does not trigger the onCLick of scollbar
// let scrollbar = new CScrollbar(w);
// scrollbar.tabindex=7;
// scrollbar.move(700,100);
// scrollbar.onClick((event:any)=>{
//     bartext.text=String(scrollbar.getthumbpos);
// })
// scrollbar.onMove((event:any)=>{
//     bartext.text=String(scrollbar.getthumbpos);
// })


// let lbl4 = new Heading(w);
// lbl4.text = "Ctext";
// lbl4.tabindex = 8;
// lbl4.move(900, 500);

// let ctext = new Ctext(w);
// ctext.tabindex = 9;
// ctext.move(900,100);
// ctext.onClick((event:any)=>{
//     lbl4.text="typing: " +ctext.getInput;
// });
