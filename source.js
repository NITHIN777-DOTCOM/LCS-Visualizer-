var text1, text2;
var functionsCalls = [];
var Interval;
var ANIMATION_SECONDS = 7 / 6;
var isPaused = false;
var CODE_LINE_IDS = [
    "line-if", "line-if-lcs", "line-if-dir",
    "line-else", "line-else-lcs", "line-gt", "line-gt-dir", "line-lt", "line-lt-dir"
];

function blinkCodeLines(ids) {
    for (var i = 0; i < CODE_LINE_IDS.length; i++) {
        var node = document.getElementById(CODE_LINE_IDS[i]);
        if (node) {
            node.classList.remove("visited-line");
        }
    }

    for (var j = 0; j < ids.length; j++) {
        var line = document.getElementById(ids[j]);
        if (line) {
            void line.offsetWidth;
            line.classList.add("visited-line");
        }
    }
}

function getSpeedSeconds() {
    return ANIMATION_SECONDS;
}

function animationsCaller() {
    if (isPaused) {
        return;
    }

    if (functionsCalls.length > 0) {
        functionsCalls[0]();
        functionsCalls.splice(0, 1);
    } else {
        clearInterval(Interval);
        isPaused = false;
        document.getElementById("text1").disabled = false;
        document.getElementById("text2").disabled = false;
        document.getElementById("viso").disabled = false;
        document.getElementById("pause-btn").disabled = true;
        document.getElementById("pause-btn").innerHTML = "Pause";
    }
}

function togglePause() {
    if (functionsCalls.length === 0) {
        return;
    }

    var pauseBtn = document.getElementById("pause-btn");
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(Interval);
        pauseBtn.innerHTML = "Resume";
    } else {
        pauseBtn.innerHTML = "Pause";
        Interval = setInterval(animationsCaller, getSpeedSeconds() * 1000);
    }
}

function uniOutline(x, y) {
    functionsCalls.push(function () {
        document.getElementById("box" + (x - 1) + "_" + (y - 1)).classList.remove("checked", "current");
        void document.getElementById("box" + (x - 1) + "_" + (y - 1)).offsetWidth;

        document.getElementById("box" + x + "_" + y).classList.remove("checked", "current");
        void document.getElementById("box" + x + "_" + y).offsetWidth;

        document.getElementById("box" + (x - 1) + "_" + (y - 1)).classList.add("checked");
        document.getElementById("box" + x + "_" + y).classList.add("current");
        blinkCodeLines(["line-if", "line-if-lcs", "line-if-dir"]);
    });
}

function biOutline(x, y, branchType) {
    functionsCalls.push(function () {
        document.getElementById("box" + (x - 1) + "_" + y).classList.remove("checked", "current");
        void document.getElementById("box" + (x - 1) + "_" + y).offsetWidth;

        document.getElementById("box" + x + "_" + (y - 1)).classList.remove("checked", "current");
        void document.getElementById("box" + x + "_" + (y - 1)).offsetWidth;

        document.getElementById("box" + x + "_" + y).classList.remove("checked", "current");
        void document.getElementById("box" + x + "_" + y).offsetWidth;

        document.getElementById("box" + (x - 1) + "_" + y).classList.add("checked");
        document.getElementById("box" + x + "_" + (y - 1)).classList.add("checked");
        document.getElementById("box" + x + "_" + y).classList.add("current");
        if (branchType === "east") {
            blinkCodeLines(["line-else", "line-else-lcs", "line-gt", "line-gt-dir"]);
        } else {
            blinkCodeLines(["line-else", "line-else-lcs", "line-lt", "line-lt-dir"]);
        }
    });
}

function last(x, y, incommon) {
    functionsCalls.push(function () {
        document.getElementById("box" + x + "_" + y).classList.remove("checked", "current");
        void document.getElementById("box" + x + "_" + y).offsetWidth;
        document.getElementById("box" + x + "_" + y).classList.add("visited-box");

        if (!(x === 0 || y === 0) && incommon === true) {
            var character = document.createElement("div");
            character.innerHTML = text1[y - 1];
            document.getElementById("letters").prepend(character);
            character.style.setProperty("display", "inline-block");
            character.style.setProperty("--animate-duration", getSpeedSeconds() + "s");
            character.style.setProperty("--animation-delay", (getSpeedSeconds() + 1) + "s");
            character.style.setProperty("transform", "translateZ(0)");
            character.classList.add("animate__animated", "animate__slideInRight");
        }
    });
}

function fillHeaderRow(gridId, l1) {
    var newRow = document.createElement("div");
    newRow.className = "row";
    document.getElementById(gridId).appendChild(newRow);

    var spacer = document.createElement("div");
    spacer.className = "box";
    newRow.appendChild(spacer);
    spacer.style.background = "transparent";
    spacer.style.color = "white";

    var jj = document.createElement("div");
    jj.className = "box";
    var jjinner = document.createElement("div");
    jjinner.className = "inner innered";
    jjinner.innerHTML = "j";
    jj.appendChild(jjinner);
    newRow.appendChild(jj);
    jj.style.background = "transparent";
    jj.style.color = "white";

    for (var i = 0; i <= l1; i++) {
        var cell = document.createElement("div");
        cell.className = "box";
        var inner = document.createElement("div");
        inner.className = "inner innered";
        inner.innerHTML = i;
        cell.appendChild(inner);
        newRow.appendChild(cell);
        cell.style.background = "transparent";
        cell.style.color = "white";
    }
}

function fillLettersRow(gridId, l1, topText) {
    var newRow = document.createElement("div");
    newRow.className = "row";
    document.getElementById(gridId).appendChild(newRow);

    var ii = document.createElement("div");
    ii.className = "box";
    var iinn = document.createElement("div");
    iinn.className = "inner innered";
    iinn.innerHTML = "i";
    ii.appendChild(iinn);
    newRow.appendChild(ii);
    ii.style.background = "transparent";
    ii.style.color = "white";

    for (var j = 0; j < 2; j++) {
        var spacer = document.createElement("div");
        spacer.className = "box";
        spacer.style.background = "transparent";
        spacer.style.color = "white";
        newRow.appendChild(spacer);
    }

    for (var i = 0; i < l1; i++) {
        var cell = document.createElement("div");
        cell.className = "box";
        var inner = document.createElement("div");
        inner.className = "inner innered";
        inner.innerHTML = topText[i];
        cell.appendChild(inner);
        newRow.appendChild(cell);
        cell.style.background = "transparent";
        cell.style.color = "white";
    }
}

function fillDataRow(newRow, l1, r, isValueGrid) {
    for (var i = 0; i < 2; i++) {
        var lead = document.createElement("div");
        lead.className = "box";
        var leadInner = document.createElement("div");
        leadInner.className = "inner";
        lead.appendChild(leadInner);
        newRow.appendChild(lead);
    }

    for (var col = 0; col <= l1; col++) {
        var cell = document.createElement("div");
        cell.className = "box";
        var inner = document.createElement("div");
        inner.className = "inner";

        if (isValueGrid) {
            cell.id = "box" + r + "_" + col;
            inner.id = "inner" + r + "_" + col;
        } else {
            cell.id = "abox" + r + "_" + col;
            inner.id = "ainner" + r + "_" + col;
        }

        cell.appendChild(inner);
        newRow.appendChild(cell);
    }
}

function createGrid(gridId, l1, l2, topText, leftText, isValueGrid) {
    var grid = document.getElementById(gridId);
    grid.innerHTML = "";

    fillHeaderRow(gridId, l1);
    fillLettersRow(gridId, l1, topText);

    for (var i = 0; i <= l2; i++) {
        var row = document.createElement("div");
        row.className = "row";
        row.id = (isValueGrid ? "row" : "arow") + i;
        grid.appendChild(row);
        fillDataRow(row, l1, i, isValueGrid);
    }

    for (var r = 0; r <= l2; r++) {
        var rowNode = document.getElementById((isValueGrid ? "row" : "arow") + r).childNodes;
        var iBox = rowNode[0];
        iBox.childNodes[0].innerHTML = r;
        iBox.childNodes[0].classList.add("innered");
        iBox.style.background = "transparent";
        iBox.style.color = "white";

        var letterBox = rowNode[1];
        letterBox.style.background = "transparent";
        letterBox.style.color = "white";

        if (r > 0) {
            letterBox.childNodes[0].innerHTML = leftText[r - 1];
            letterBox.childNodes[0].classList.add("innered");
        }
    }
}

function assignPair(x, y, val, arrow) {
    functionsCalls.push(function () {
        var numberCell = document.getElementById("inner" + x + "_" + y);
        var arrowCell = document.getElementById("ainner" + x + "_" + y);

        numberCell.innerHTML = val;
        arrowCell.innerHTML = renderDirectionIcon(arrow);

        numberCell.classList.add("innered");
        arrowCell.classList.add("innered");
    });
}

function initializeBaseCells(l1, l2) {
    document.getElementById("inner0_0").innerHTML = "0";
    document.getElementById("inner0_0").classList.add("innered");
    document.getElementById("ainner0_0").innerHTML = '<span class="dir-icon dir-empty">•</span>';
    document.getElementById("ainner0_0").classList.add("innered");

    for (var x = 1; x <= l1; x++) {
        document.getElementById("inner0_" + x).innerHTML = "0";
        document.getElementById("inner0_" + x).classList.add("innered");
        document.getElementById("ainner0_" + x).innerHTML = renderDirectionIcon("east");
        document.getElementById("ainner0_" + x).classList.add("innered");
    }

    for (var y = 1; y <= l2; y++) {
        document.getElementById("inner" + y + "_0").innerHTML = "0";
        document.getElementById("inner" + y + "_0").classList.add("innered");
        document.getElementById("ainner" + y + "_0").innerHTML = renderDirectionIcon("north");
        document.getElementById("ainner" + y + "_0").classList.add("innered");
    }
}

function renderDirectionIcon(direction) {
    if (direction === "northEast") {
        return '<img class="dir-icon-img" src="icons/diag.png" alt="north-east arrow" title="Diagonal match">';
    }
    if (direction === "east") {
        return '<img class="dir-icon-img" src="icons/left.png" alt="east arrow" title="Horizontal move">';
    }
    if (direction === "north") {
        return '<img class="dir-icon-img" src="icons/up.png" alt="north arrow" title="Vertical move">';
    }
    return '<span class="dir-icon dir-empty">•</span>';
}

function LCS() {
    clearInterval(Interval);
    functionsCalls = [];
    isPaused = false;

    text1 = document.getElementById("text1").value.toLowerCase();
    text2 = document.getElementById("text2").value.toLowerCase();

    var l1 = text1.length;
    var l2 = text2.length;
    if (l1 === 0 || l2 === 0) {
        return 0;
    }

    document.getElementById("grid").style.display = "block";
    document.getElementById("arrow-grid").style.display = "block";
    document.getElementById("grid").classList.add("animate__animated", "animate__slideInLeft");
    document.getElementById("arrow-grid").classList.add("animate__animated", "animate__slideInLeft");
    document.getElementsByClassName("code")[0].style.display = "block";
    document.getElementsByClassName("code")[0].classList.add("animate__animated", "animate__slideInRight");

    document.getElementById("result").style.display = "block";
    document.getElementById("letters").innerHTML = "";
    document.getElementById("desc").style.display = "none";

    document.getElementById("text1").disabled = true;
    document.getElementById("text2").disabled = true;
    document.getElementById("viso").disabled = true;
    document.getElementById("pause-btn").disabled = false;
    document.getElementById("pause-btn").innerHTML = "Pause";

    createGrid("grid", l1, l2, text1, text2, true);
    createGrid("arrow-grid", l1, l2, text1, text2, false);

    var DP_table = new Array(l2 + 1);
    for (var i = 0; i <= l2; i++) {
        DP_table[i] = new Array(l1 + 1);
    }

    initializeBaseCells(l1, l2);
    DP_table[0][0] = 0;
    for (var c = 1; c <= l1; c++) {
        DP_table[0][c] = 0;
    }
    for (var r = 1; r <= l2; r++) {
        DP_table[r][0] = 0;
    }

    for (var row = 1; row <= l2; row++) {
        for (var col = 1; col <= l1; col++) {
            var arrow = "";
            if (text1[col - 1] === text2[row - 1]) {
                uniOutline(row, col);
                DP_table[row][col] = DP_table[row - 1][col - 1] + 1;
                arrow = "northEast";
            } else {
                if (DP_table[row - 1][col] > DP_table[row][col - 1]) {
                    DP_table[row][col] = DP_table[row - 1][col];
                    arrow = "east";
                    biOutline(row, col, "east");
                } else if (DP_table[row - 1][col] < DP_table[row][col - 1]) {
                    DP_table[row][col] = DP_table[row][col - 1];
                    arrow = "north";
                    biOutline(row, col, "north");
                } else {
                    DP_table[row][col] = DP_table[row - 1][col];
                    arrow = "east";
                    biOutline(row, col, "east");
                }
            }
            assignPair(row, col, DP_table[row][col], arrow);
        }
    }

    var i = l2;
    var j = l1;
    while (i >= 0 && j >= 0) {
        if (i === 0 || j === 0) {
            last(i, j, false);
            break;
        }
        if (DP_table[i][j] !== Math.max(DP_table[i - 1][j], DP_table[i][j - 1])) {
            last(i, j, true);
            i--;
            j--;
        } else {
            last(i, j, false);
            if (DP_table[i][j] === DP_table[i - 1][j]) {
                i--;
            } else {
                j--;
            }
        }
    }

    Interval = setInterval(animationsCaller, getSpeedSeconds() * 1000);
}
