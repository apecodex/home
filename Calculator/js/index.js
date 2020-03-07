var result = document.getElementById("result").querySelector("input");
var algorithm = document.querySelector(".cal-select-algorithm").querySelectorAll("span");
var number = document.querySelector(".cal-number-btn").querySelectorAll(".num-btn");
var empty = document.querySelector(".empty-btn");
var entry = document.querySelector(".entry-btn");

var indexN = 0;   // 数字坐标
var algsIndex = 0;   // 符号坐标
var algs = [];
for (var i=0;i<number.length;i++) {
    empty.onclick = function() {
        result.value = "";
        indexN = 0;
        algs = [];
        
    }
    number[i].onclick = function() {
        result.style.color = "#569875";
        result.value = result.value + this.innerText;  

    }
    for (var x=0;x<algorithm.length;x++) {
        algorithm[x].setAttribute("index",x);
        algorithm[x].onclick = function() {
            if (result.value[result.value.length-1] != "+" && result.value[result.value.length-1] != "-" && result.value[result.value.length-1] != "*" && result.value[result.value.length-1] != "/") {
                var index = this.getAttribute("index");
                var alg = index === "0" ? "+":(index === "1" ? "-":(index === "2" ? "*":"/"));
                result.value = result.value + alg;
                algs[algsIndex++] = alg;

            }
        }
    }
    entry.onclick = function() {
        var algArr = handleAlg(algs);
        var numberArr = handleData(result.value, algArr);
        var calresult = Caluculator(numberArr, algArr);
        result.value = calresult;
    }
}

// 处理运算符 
var handleAlg = function(algList) {
    // 删除运算符的empty
    var arrAlg = [];
    for (var i=0;i<algList.length;i++) {
        if (algList[i] !== undefined) {
            arrAlg.push(algList[i]);
        }
    }
    return arrAlg;
}

// 处理数字
var handleData = function(resultStr, algs) {
    var numArr = new Array();
    var numStr = resultStr;
    var tempStr = "";

    // 进行切割
    for (var i=0;i<=algs.length;i++) {
        tempStr = numStr.slice(0, numStr.indexOf(algs[i]));
        numStr = numStr.slice(numStr.indexOf(algs[i])+1);
        if (i <= algs.length-1) {
            numArr.push(parseInt(tempStr));
        } else numArr.push(parseInt(numStr));
    }
    return numArr;
}

var Caluculator = function(numArr, algArr) {
    var resultStr = ""
    for (var n=0;n<numArr.length;n++) {
        if (isNaN(numArr[n])) {
            return "输入有误！请清零后重新输入";
        }
    }
    for (var i=0;i<algArr.length;i++) {
        resultStr += numArr[i] + algArr[i];
    }
    resultStr += numArr[algArr.length];
    return eval(resultStr);    
}