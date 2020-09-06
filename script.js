
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 900;

let painting = false;
let startshape = false;

ctx.strokeStyle = "black"
ctx.lineWidth = 16;

function startpaint(e){
    painting = true;
    draw(e);
}

function stoppaint(){
    painting = false;
    ctx.beginPath();
}

function draw(e){
    if(!painting) return;
    ctx.lineCap = "round";
    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(e.pageX, e.pageY)
}
canvas.addEventListener("mousedown", startpaint);
canvas.addEventListener("mouseup", stoppaint);
canvas.addEventListener("mousemove", draw);


function updatewidth(val) {
    document.getElementById('textwidth').value=val; 
    ctx.lineWidth = val;
}

// will look into this later, doesn't work properly
// window.addEventListener('resize', ()=>{
//     canvas.height = innerHeight;
//     canvas.width = innerWidth;  
//     v = document.getElementById('textwidth').value
//     updatewidth(v) 
// })

function updatecolor(val){
    if (val == 0) ctx.strokeStyle = "black";
    else if (val == 1) ctx.strokeStyle = "red";
    else if (val == 2) ctx.strokeStyle = "yellow";
    else if (val == 3) ctx.strokeStyle = "green";
    else if (val == 4) ctx.strokeStyle = "blue";
}

function drawcircle(){
    console.log("Hello in circle");
    let currwidth = ctx.lineWidth;
    console.log("curr", currwidth)
    ctx.lineWidth = 1;
    console.log("line", ctx.lineWidth)
    let startx = -1;
    let starty = -1;
    radius = -1;
    function getval(e) {
        console.log("hello inside")
        if (startx != -1 && starty != -1){
            ex = e.pageX;
            ey = e.pageY;
            radius = Math.sqrt((ex-startx)*(ex-startx) + (ey-starty)*(ey-starty));
            console.log(startx, starty, radius);
            ctx.beginPath();
            ctx.arc(startx,starty,radius,0,2*Math.PI);
            ctx.lineWidth = currwidth;
            ctx.stroke();
            ctx.beginPath();
            canvas.removeEventListener('click', getval);
            return;
        }
        startx = e.pageX;
        starty = e.pageY;
        console.log(startx,  starty);
    }

    canvas.addEventListener('click', getval);
}

function drawtriangle(){
    var a = []
    function getval(e){
        a.push(e.pageX);
        a.push(e.pageY);
        if (a.length > 5){
            canvas.removeEventListener('click', getval);
            console.log(a);
            console.log(typeof(a[0]));
            // the triangle
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(a[2], a[3]);
            ctx.lineTo(a[4], a[5]);
            ctx.closePath();
            // the outline
            ctx.stroke();
            ctx.beginPath();
            return;
        }
    }
    canvas.addEventListener('click', getval);
}

function drawrectangle(){
    var a = []
    function getval(e){
        a.push(e.pageX);
        a.push(e.pageY);
        if (a.length > 3){
            canvas.removeEventListener('click', getval);
            console.log(a);
            console.log(typeof(a[0]));
            // the square
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(a[2], a[1]);
            ctx.lineTo(a[2], a[3]);
            ctx.lineTo(a[0], a[3]);
            ctx.closePath();
            // the outline
            ctx.stroke();
            ctx.beginPath();
            return;
        }
    }
    canvas.addEventListener('click', getval);
}

function drawshape(c){
    if (c == 1) drawcircle();
    else if (c == 2) drawtriangle();
    else if (c == 3) drawrectangle();
    else if (c == 4) drawrectangle();
}