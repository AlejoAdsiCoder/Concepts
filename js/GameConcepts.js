let startRight = document.querySelector(".startRight");
let dataConcept;

const concepts = [{
    draggable: [
      {
        image: "images/hand01.png",
        id: 0,
        class: 1,
        dataid: 01,
      },
      {
        image: "images/hand02.png",
        id: 1,
        class: 2,
        dataid: 02,
      },
      {
        image: "images/hand03.png",
        id: 2,
        class: 3,
        dataid: 03,
      },
      {
        image: "images/hand04.png",
        id: 3,
        class: 4,
        dataid: 04,
      },
      {
        image: "images/hand05.png",
        id: 4,
        class: 5,
        dataid: 05,
      },
    ]
  },
  {
    droppable: [
      {
        image: "images/hand01-right.png",
        id: 0,
        class: 1,
        dataid: 02,
      },
      {
        image: "images/hand02-right.png",
        id: 1,
        class: 2,
        dataid: 01,
      },
      {
        image: "images/hand03-right.png",
        id: 2,
        class: 3,
        dataid: 04,
      },
      {
        image: "images/hand04-right.png",
        id: 3,
        class: 4,
        dataid: 05,
      },
      {
        image: "images/hand05-right.png",
        id: 4,
        class: 5,
        dataid: 03,
      },
    ]
  },
];

let sizeConcepts = concepts[0].draggable.length;
let imgDrag, imgDrop;
let correctAnswers = 0;
let incorrectAnswers = 0;

function templateStartLeft(draggable) {
  return `
    <div id="drag${draggable.id}" data-id="${draggable.dataid}" class="left-hands-0${draggable.class} hand-l">
      <div data-id="${draggable.dataid}" class="draggable">
        <img src="${draggable.image}">
      </div>
    </div>
  `
}

function templateStartRight(droppable) {
  return `
    <div id="drop${droppable.id}" data-id="${droppable.dataid}" class="right-hands-0${droppable.class} hand-r">
      <div data-id="${droppable.dataid}" class="droppable">
        <img src="${droppable.image}">
      </div>
    </div>
  `
}

Render();

// let idTemplate, classTemplate, imgTemplate;


function Render() {
  for(let i = 0; i < concepts[0].draggable.length; i++) {
    let num = 0;
    imgDrag = concepts[num].draggable[i];
    // idTemplate = i;
    // classTemplate = i;
    // imgTemplate = concepts[0].draggable[i].image[i];
    startRight.innerHTML += `${[imgDrag].map(templateStartLeft).join("")}`;
    // templateStartRight()
  }

  for(let i = 0; i < concepts[1].droppable.length; i++) {
    let num = 1;
    imgDrop = concepts[num].droppable[i];
    // idTemplate = i;
    // classTemplate = i;
    // imgTemplate = concepts[0].draggable[i].image[i];
    startRight.innerHTML += `${[imgDrop].map(templateStartRight).join("")}`;
    // templateStartRight()
  }
}

// $('#stage003').animate({
//   left: "-=100%",
//   opacity: "1"
// }, 800)

var connections = [];
var listConnections = [];
var bitCorrect = false;
var colors = ['red', 'green', 'white', 'orange', 'black'];
// var sizeConcepts = ;
var isDragDropConcept = false;

$(document).ready(function () {
    var idDroppable = '';
    $(".draggable").draggable({
        revert: true,
        stop: function (event) {
            if (isDragDropConcept) {
                $(this).draggable("disable");
                $(this).draggable("destroy");
                var idConcept = $(this).data("id");
                var idRespuesta = $(idDroppable).data("id");
                var idDraggable = '#' + $(this).parent().attr('id');
                var colorIndex = Math.floor(Math.random() * colors.length);
                var color = colors[colorIndex];
                var removeColor = colors.splice(colorIndex, 1);
                connections.push(new $.connect(idDroppable, idDraggable, { leftLabel: '', rightLabel: '' }, color));
                bitCorrect = false;
                listConnections.push({ idConcept: idConcept, idAnswer: idRespuesta });
                isDragDropConcept = false;
                // if (sizeConcepts == listConnections.length) {
                //     validateAnswerConcept(listConnections);
                // }
                if (sizeConcepts == listConnections.length) {
                  validateAnswerConcept(listConnections)
                }
            }
        }

    });
    $(".droppable").droppable({
        drop: function (event, ui) {
            idDroppable = '#' + $(this).parent().attr("id");
            var idRespuesta = $(this).data("id");
            var idConcept = $(ui.draggable).data("id");
            var idElementDrag = $(ui.draggable).attr("id");
            isDragDropConcept = true;
        }
    });
    $('#stage003').animate({
        left: "-=100%",
        opacity: "1"
    }, 800)
})

function validateAnswerConcept(listRelationConcepts) {
  
  for(i = 0; i < listRelationConcepts.length; i++) {
    if(listRelationConcepts[i].idAnswer === listRelationConcepts[i].idConcept) {
      correctAnswers = correctAnswers + 1;
    }
    else {
      incorrectAnswers = incorrectAnswers + 1;
    }
  }
  console.log(incorrectAnswers)
}