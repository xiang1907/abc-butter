let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let reSetCanvas = document.getElementById("clear");
let aColorBtn = document.getElementsByClassName("color-item");
// let save = document.getElementById("save");
let undo = document.getElementById("undo");
let range = document.getElementById("range");
let clear = false;
let activeColor = 'black';
let lWidth = 4;

autoSetSize(canvas);

setCanvasBg('RGBA(0,0,0,0)');

listenToUser(canvas);

getColor();


function autoSetSize(canvas) {
    canvasSetSize();

    function canvasSetSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }

    window.onresize = function () {
        canvasSetSize();
    }
}

function setCanvasBg(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
}

function listenToUser(canvas) {
    let painting = false;
    let lastPoint = {x: undefined, y: undefined};

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);//在这里储存绘图表面
            saveData(this.firstDot);
            painting = true;
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            lastPoint = {"x": x, "y": y};
            ctx.save();
            drawCircle(x, y, 0);
        };
        canvas.ontouchmove = function (e) {
            
            if (painting) {
                $('.bitou').hide();
                $('.sban').hide();
                isShowPen = false;
                isSban = false;
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                let newPoint = {"x": x, "y": y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        };

        canvas.ontouchend = function () {
            painting = false;
        }
    } else {
        canvas.onmousedown = function (e) {
            this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);//在这里储存绘图表面
            saveData(this.firstDot);
            painting = true;
            let x = e.clientX;
            let y = e.clientY;
            lastPoint = {"x": x, "y": y};
            ctx.save();
            drawCircle(x, y, 0);
        };
        canvas.onmousemove = function (e) {
            if (painting) {
                let x = e.clientX;
                let y = e.clientY;
                let newPoint = {"x": x, "y": y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,clear);
                lastPoint = newPoint;
            }
        };

        canvas.onmouseup = function () {
            painting = false;
        };

        canvas.mouseleave = function () {
            painting = false;
        }
    }
}

function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (clear) {
        ctx.clip();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    }
}

function drawLine(x1, y1, x2, y2) {
    console.log(clear);
    ctx.lineWidth = lWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (clear) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    }else{
        ctx.fillStyle = "#000000";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}

/*橡皮擦*/
function clearCur(){
    clear = true;
    lWidth = 8 ;
    ctx.fillStyle = "rgba(0,0,0,0)";
}

/*清除画布*/
reSetCanvas.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg('RGBA(0,0,0,0)');
};

// save.onclick = function () {
//     let imgUrl = canvas.toDataURL("image/png");
//     let saveA = document.createElement("a");
//     document.body.appendChild(saveA);
//     saveA.href = imgUrl;
//     saveA.download = "zspic" + (new Date).getTime();
//     saveA.target = "_blank";
//     saveA.click();
// };

function getColor(){
    for (let i = 0; i < aColorBtn.length; i++) {
        aColorBtn[i].onclick = function () {
            for (let i = 0; i < aColorBtn.length; i++) {
                aColorBtn[i].classList.remove("active");
                this.classList.add("active");
                activeColor = this.style.backgroundColor;
                ctx.fillStyle = activeColor;
                ctx.strokeStyle = activeColor;
            }
        }
    }
}



let historyDeta = [];

function saveData (data) {
    (historyDeta.length === 10) && (historyDeta.shift());// 上限为储存10步，太多了怕挂掉
    historyDeta.push(data);
}

// undo.onclick = function(){
//     if(historyDeta.length < 1) return false;
//     ctx.putImageData(historyDeta[historyDeta.length - 1], 0, 0);
//     historyDeta.pop()
// };

  var isShowPen = false;
  var isSban = false;
  function openPen(){
      clear = false;
      lWidth = 4 ;
  }
//   function seban(){
//     isSban =!isSban;
//     if(isSban){
//       $('.sban').show();
//       $('.bitou').hide();
//     }else{
//       $('.sban').hide();
//     }
//   }
  $('.bitou li').each(function(i,t){
    
    $(this).on('click',function(){
        clear = false;
        if(i==0){
            lWidth = 4
        }else if(i==1){
            lWidth = 6
        }else{
            lWidth = 8
        }
    })
  })
  