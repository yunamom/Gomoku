const kans = Array.from(new Array(14), (_, r) =>
  Array.from(new Array(14), (_, c) => `r${r}c${c}`)
);
let spaces = Array.from(new Array(15), (_, r) =>
  Array.from(new Array(15), (_, c) => 0)
);
const kanSize = 40;
let turn = 1;
const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];

function getRC(element, top, left) {
  const kanR = +element.id.split("c")[0].slice(1);
  const kanC = +element.id.split("c")[1];
  const spaceR = kanR + (top === 0 ? 0 : 1);
  const spaceC = kanC + (left === 0 ? 0 : 1);
  return {
    r: spaceR,
    c: spaceC,
  };
}

function getTopLeft(event) {
  let top = 0;
  let left = 0;
  const [x, y] = [event.layerX, event.layerY];
  if (x < kanSize / 2) left = 0;
  else left = 100;
  if (y < kanSize / 2) top = 0;
  else top = 100;
  return { top, left };
}
/* 오목판 생성 */
function initPan() {
  const pan = document.querySelector("#pan");
  pan.innerHTML = "";
  spaces = Array.from(new Array(15), (_, r) =>
    Array.from(new Array(15), (_, c) => 0)
  );
  turn = 1;
  kans.forEach((arr, r) => {
    const line = document.createElement(`div`);
    line.id = `line${r}`;
    line.classList.add("line");

    arr.forEach((kanId, c) => {
      const dots = [2, 6, 10];
      const kan = document.createElement("div");
      kan.id = kanId;
      kan.classList.add("kan");
      if (dots.includes(r) && dots.includes(c)) {
        const dot = document.createElement("div");
       dot.classList.add("dot");
        kan.appendChild(dot);
      }
      line.appendChild(kan);
    });
    pan.appendChild(line);
  });
}


initPan();
addMouseOverEvent();
addMouseClickEvent();