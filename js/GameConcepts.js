let startRight = document.querySelector(".startRight");
let dataConcept;
let htmlStar = new Array();

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
let stars = new Array(sizeConcepts);
var indices = [];
let i = 0;
let nextAnswer = 0
let ranConcepts = [];

function templateStartLeft(draggable) {
  return `
    <div id="drag${draggable.id}" data-id="${draggable.dataid}" class="hand-l">
      <div data-id="${draggable.dataid}" class="draggable">
        <img src="${draggable.image}">
      </div>
    </div>
  `
}

function templateStartRight(droppable) {
  return `
    <div id="drop${droppable.id}" data-id="${droppable.dataid}" class="hand-r">
      <div data-id="${droppable.dataid}" class="droppable">
        <img src="${droppable.image}">
      </div>
    </div>
  `
}

Render();

// let idTemplate, classTemplate, imgTemplate;


function Render() {
  
  // let countAnswers = concepts[0].draggable.length;

  // while(ranConcepts.length < countAnswers) {
  //   let randIndex = parseInt(Math.floor(Math.random() * countAnswers));
  //   ranConcepts.push(concepts[randIndex].draggable[0]);
  //   console.log("ranConcepts "+ JSON.stringify(ranConcepts));
  // }
  // concepts[0].draggable.forEach(function(on) {

  //   ranConcepts.push(on);
  //   console.log(ranConcepts);
  // })
  for(let i = 0; i < concepts[0].draggable.length; i++) {
    let num = 0;
    imgDrag = concepts[num].draggable[i];
    // idTemplate = i;
    // classTemplate = i;
    // imgTemplate = concepts[0].draggable[i].image[i];
    startRight.innerHTML += `${[imgDrag].map(templateStartLeft).join("")}`;
    // templateStartRight()
    // let ranConcepts = parseInt(Math.floor(Math.random() * [imgDrag]));
    // console.log(imgDrag);
    // console.log(ranConcepts)
    
    
  }

 
  var myArray = ['1','2','3','4','5'];

  var i,j,k;
  for (i = myArray.length; i; i--) {
    j = Math.floor(Math.random() * i);
    k = myArray[i - 1];
    myArray[i - 1] = myArray[j];
    myArray[j] = k;
  }
  // console.log(myArray);
    $('.hand-l').each(function(index) {
       $(this).addClass( "left-hands-0" + myArray[index]);
    });

  

  for(let i = 0; i < concepts[1].droppable.length; i++) {
    let num = 1;
    imgDrop = concepts[num].droppable[i];
    // idTemplate = i;
    // classTemplate = i;
    // imgTemplate = concepts[0].draggable[i].image[i];
    startRight.innerHTML += `${[imgDrop].map(templateStartRight).join("")}`;
    // templateStartRight()
  }

  var rightColumn = ['1','2','3','4','5'];

    var a,b,c;
    for (a = rightColumn.length; a; a--) {
      b = Math.floor(Math.random() * a);
      c = rightColumn[a - 1];
      rightColumn[a - 1] = rightColumn[b];
      rightColumn[b] = c;
    }
    $('.hand-r').each(function(index2) {
      console.log("hola")
      $(this).addClass( "right-hands-0" + rightColumn[index2]);
   });

  RenderStars();
  $(".game-wrapper-conceptos").toggleClass("noStars");

  // let countAnswers = concepts[0].draggable.length;

  // while(ranConcepts.length < countAnswers) {
  //   let randIndex = parseInt(Math.floor(Math.random() * countAnswers));
  //   ranConcepts.push(concepts[randIndex].draggable[0]);
  //   console.log("ranConcepts "+ JSON.stringify(ranConcepts));
  // }

  console.log(imgDrag);
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
                console.log(listConnections)
                // if (sizeConcepts == listConnections.length) {
                //     validateAnswerConcept(listConnections);
                // }
                // if (listConnections.length != 5) {
                //   ValidateOneAnswer(listConnections);
                //   // ValidateOneAnswer(1)
                // }

                if (sizeConcepts == listConnections.length) {
                  if(listConnections[nextAnswer].idAnswer === listConnections[nextAnswer].idConcept) {
                    correctAnswers = correctAnswers + 1;
                    console.log("es correcto")
                    fillStar();
                  }
                  // $('.footer-orange').attr('style','left: 100%; opacity: 0');
                  $(".game-wrapper-conceptos").toggleClass("noStars");
                  
                  validateAnswerConcept(correctAnswers);
                  
                  
                  $('#stage003, .connector').animate({
                    left: "-=100%",
                    opacity: "1"
                  }, 800);
                  $('#stage004, .noStars .footer-orange').animate({
                    left: "-=100%",
                    opacity: "1"
                  }, 800);
                }

                else {
                  ValidateOneAnswer(listConnections);
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

function ValidateOneAnswer(listRelationConcepts) {
  if(listRelationConcepts[nextAnswer].idAnswer === listRelationConcepts[nextAnswer].idConcept) {
    correctAnswers = correctAnswers + 1;
    console.log("es correcto")
    fillStar();
  }
  else {
    console.log("es incorrecto")
  }
  // else {
  //   incorrectAnswers = incorrectAnswers + 1;
  // }
  nextAnswer++;
  // fillStar();
  
}

function validateAnswerConcept(correctAnswers) {
    // if(listRelationConcepts[i].idAnswer == listRelationConcepts[i].idConcept) {
    //   correctAnswers = correctAnswers + 1;
    //   // fillStar();
    // }
    // else {
    //   incorrectAnswers = incorrectAnswers + 1;
    // }
    switch(correctAnswers) {
      case 0:
        $(".content-info").append("<h6>!No le diste ni a uno solo!</h6>");
        $(".content-info").append("<p>!No le diste ni a uno solo!</p>");
        
        break;
      case 1:
        $(".content-info").append("<h6>Te corchaste</h6>");
        $(".content-info").append("<p>Solo acertaste "+correctAnswers+" de 5 conceptos</p>");
        
        // fillStar();
        break;
      case 2:
        $(".content-info").append("<h6>Te corchaste</h6>");
        $(".content-info").append("<p>Solo acertaste "+correctAnswers+" de 5 conceptos</p>");
        
        // fillStar();
        break;
      case 3:
        $(".content-info").append("<h6>Pasaste Raspando</h6>");
        $(".content-info").append("<p>Solo acertaste "+correctAnswers+" de 5 conceptos</p>");
        
        // fillStar();
        break;
      case 4:
        $(".content-info").append("<h6>Pasaste Raspando</h6>");
        $(".content-info").append("<p>Solo acertaste "+correctAnswers+" de 5 conceptos</p>");
        
        // fillStar();
        break;
      case 5:
        $(".content-info").append("<h6>¡Felicitaciones!</h6>");
        $(".content-info").append("<p>Has relacionado "+correctAnswers+" de 5</p>");
        
        // fillStar();
        break;
      default:
        break;
    }

    $(".content-info").append("<a href='index.html'>Volver a jugar</a>");
}

function RenderStars() {
  for(let i = 0; i < stars.length; i++) {
    htmlStar.push("<img src='images/star-01.svg'>")
    document.querySelector(".stars-conceptos").innerHTML = htmlStar.join('');
  }
}

function fillStar() {
  console.log(htmlStar)
  var element = "<img src='images/star-01.svg'>";

  var idx = htmlStar.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = htmlStar.indexOf(element, idx + 1);
  }
  console.log(htmlStar)

  let posicion = indices[0 + i];
  
  if(htmlStar[posicion] === "<img src='images/star-01.svg'>") {
  	htmlStar[posicion] = "<img src='images/star-02.svg'>";
    console.log(htmlStar);
    i++;
    document.querySelector(".stars-conceptos").innerHTML = htmlStar.join('');
    
  }
  
  /* switch(htmlStar[posicion]) {
    case '0':
      htmlStar[posicion] = '1';
      
      console.log(htmlStar);
      i++;
      starsFooter.innerHTML = htmlStar.join('');
      htmlStar[posicion + 1];
      break;
     case '1':
       i++;
      console.log(htmlStar);
      break;
  }
   */
  console.log(i);
  console.log(htmlStar.length);
}