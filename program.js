//инициализация svg элемента 
const width = 600; 
const height = 600; 
let svg = d3.select("svg")     
    .attr("width", width)     
    .attr("height", height);  
// создаем изображение смайлик 
// рисуем его относительно точки (0, 0) 
// function drawSmile() {     
//     let smile = svg.append("g")         
//         .style("stroke", "brown")         
//         .style("stroke-width", 2)         
//         .style("fill", "brown");     //лицо    

//     smile.append("circle")
//         .attr("cx", 0)         
//         .attr("cy", 0)         
//         .attr("r", 50)         
//         .style("fill","yellow");     //левый глаз   

//     smile.append("circle")          
//         .attr("cx", -20)         
//         .attr("cy", -10)         
//         .attr("r", 5);     //правый глаз    

//     smile.append("circle")          
//         .attr("cx", 20)         
//         .attr("cy", -10)         
//         .attr("r", 5);     // улыбка    

//     let arc = d3.arc()        
//         .innerRadius(35)        
//         .outerRadius(35);
                          
//     smile.append("path")        
//         .attr("d", arc({startAngle: Math.PI /3 * 2, endAngle: Math.PI/3 * 4}))        
//         .style("stroke", "brown") 
//     return smile   
// }


function drawSmile() {
    let checkInSquare = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "none");

    checkInSquare.append("rect")
        .attr("x", -25)
        .attr("y", -25)
        .attr("width", 50)
        .attr("height", 50)
        .style("fill", "lightgrey");

    checkInSquare.append("line")
        .attr("x1", -15)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 15)
        .style("stroke", "green")
        .style("stroke-width", 4);

    checkInSquare.append("line")
        .attr("x1", 0)
        .attr("y1", 15)
        .attr("x2", 15)
        .attr("y2", -15)
        .style("stroke", "green")
        .style("stroke-width", 4);

    return checkInSquare;
}


// function drawSmile() {
//     let checkInSquare = svg.append("g")
//         .style("stroke", "black")
//         .style("stroke-width", 2)
//         .style("fill", "none");

//     checkInSquare.append("rect")
//         .attr("x", -25)
//         .attr("y", -25)
//         .attr("width", 50)
//         .attr("height", 50)
//         .style("fill", "lightgrey");

//     checkInSquare.append("line")
//         .attr("x1", 5)
//         .attr("y1", -15)
//         .attr("x2", -15)
//         .attr("y2", 15)
//         .style("stroke", "green")
//         .style("stroke-width", 4);

//     checkInSquare.append("line")
//         .attr("x1", 15)
//         .attr("y1", 0)
//         .attr("x2", 5)
//         .attr("y2", -15)
//         .style("stroke", "green")
//         .style("stroke-width", 4);

//     return checkInSquare;
// }




//рисуем смайлик 
// let pict = drawSmile(); 
// pict.attr("transform", `translate(${width / 2}, ${height / 2})`)

// pict.attr("transform", `translate(${width / 2}, ${height / 2})
//                         scale(1.5, 1.5)                           
//                         rotate(180)`);

let draw = (dataForm) => {     
    let pict = drawSmile()     
    pict.attr("transform", `translate(${dataForm.cx.value}, 
        ${dataForm.cy.value}) scale(${dataForm.mx.value}, 
            ${dataForm.my.value}) rotate(${dataForm.ang.value})`); 
}

let clean = () => svg.selectAll('*').remove();

function showProp(checkbox){
    let animat = document.getElementsByClassName("animat");

    if(checkbox.checked){
        for(let i=0; i<animat.length;i++){
            animat[i].classList.remove("hidden");
        }
        document.getElementById("drawButt").classList.add("hidden");
    }
    else{
        for(let i=0; i<animat.length;i++){
            animat[i].classList.add("hidden");
        }
        document.getElementById("drawButt").classList.remove("hidden");
    }
}

let runAnimation = (dataForm) => {    
    let pict = drawSmile()
    let modus = options[document.getElementById("animateOption").value];
    if(!document.getElementById("onMove").checked){ 
   
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.mx.value}, ${dataForm.my.value}) rotate(${dataForm.ang.value})`)     
    .transition()     
    .duration(6000)     
    .ease(modus)     
    .attr("transform",  `translate(${dataForm.cx2.value}, ${dataForm.cy2.value}) scale(${dataForm.mx2.value}, ${dataForm.my2.value}) rotate(${dataForm.ang2.value})`); 
    }
    else{
        drawPath(d3.select("select").node().value);
        let path = drawPath(d3.select("select").node().value);                  
        pict.transition()         
            .ease(modus) // установить в зависимости от настроек         
            .duration(6000)         
            .attrTween('transform', translateAlong(path.node()));
    }
} 

let options={"0":d3.easeLinear, "1":d3.easeElastic, "2":d3.easeBounce}

function showMove(checkbox){
    let form = d3.selectAll("div.dataForm").nodes();
    

    let forms = form[0].children;

    if(checkbox.checked){
        forms[0].classList.add("hidden");
        forms[1].classList.add("hidden");
        forms[2].classList.remove("hidden");
        form[1].classList.add("hidden");
        form[2].classList.add("hidden");

    }
    else{
        forms[0].classList.remove("hidden");
        forms[1].classList.remove("hidden");
        forms[2].classList.add("hidden");
        form[1].classList.remove("hidden");
        form[2].classList.remove("hidden");
    }

}

function createPathEl() {
    let data = [];
    const padding = 50; // начальное положение рисунка
    const h = 5; // шаг

    const radiusX = (width - 2 * padding) / 2.5; // радиус эллипса по оси X
    const radiusY = (height - 2 * padding) / 2.5; // радиус эллипса по оси Y
    const centerX = (width - padding) / 2; // смещение центра эллипса левее на половину его длины
    const centerY = height / 2; // центр эллипса по оси Y

    // рисуем правую часть полуовала
    for (let theta = -Math.PI / 2; theta <= Math.PI / 2; theta += 0.05) {
        let posX = centerX + radiusX * Math.cos(theta);
        let posY = centerY + radiusY * Math.sin(theta);
        data.push({x: posX, y: posY});
    }

    return data;
}

// function createPathG() {     
//     let data = [];     
//     const padding = 100;     //начальное положение рисунка     
//     let posX = padding;     
//     let posY = height - padding;     
//     const h = 5;     // координаты y - уменьшаются, x - постоянны     
//     while (posY > padding) {         
//         data.push( {x: posX, y: posY});         
//         posY -= h;     
//     } 
//     while (posX < width - padding) {         
//         data.push( {x: posX, y: posY});         
//         posX += h;     
//     }     
//     return data 
// }  

// создаем массив точек, расположенных по кругу 
function createPathCircle() {     
    let data = [];     // используем параметрическую форму описания круга     // центр асположен в центре svg-элемента, а радиус равен трети высоты/ширины     
    for (let t = 0 ; t <= Math.PI * 2 + 0.1; t += 0.1) {         
        data.push(             
            {x: width / 2 + width / 3 * Math.sin(t),              
             y: height / 2 + height / 3 * Math.cos(t)}         
        );     
    }     
    return data 
}

let drawPath =(typePath) => {     // создаем массив точек пути в зависимости от параметра   
    //const dataPoints = (typePath == 0)? createPathG() : createPathCircle();  
    const dataPoints = (typePath == 0)? createPathEl() : createPathCircle();      
    const line = d3.line()         
        .x((d) => d.x)         
        .y((d) => d.y);      // создаем путь на основе массива точек         
    const path = svg.append('path')         
        .attr('d', line(dataPoints))         
        .attr('stroke', 'none')         
        .attr('fill', 'none');              
    return path;     
} 



function translateAlong(path) {     
    const length = path.getTotalLength();     
    return function() {         
        return function(t) {             
            const {x, y} = path.getPointAtLength(t * length);             
            return `translate(${x},${y})`;         
        }     
    } 
} 