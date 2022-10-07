function matrixGenerator(matrixSize, grassCount,grassEaterCount,predatorCount,boss,bossEater) {

    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
         matrix[i] = []
         for (let j = 0; j < matrixSize; j++) {
              matrix[i][j] = 0

         }
         
    }
   

    for (let i = 0; i < grassCount; i++) {

         let x = Math.floor(Math.random() * matrixSize)
         let y = Math.floor(Math.random() * matrixSize)

         if (matrix[y][x] == 0) {
              matrix[y][x] = 1
         }
    }


    for (let i = 0; i < grassEaterCount; i++) {

         let x = Math.floor(Math.random() * matrixSize)
         let y = Math.floor(Math.random() * matrixSize)

         if (matrix[y][x] == 0) {
              matrix[y][x] = 2
         }
    }


    for (let i = 0; i < predatorCount; i++) {

         let x = Math.floor(Math.random() * matrixSize)
         let y = Math.floor(Math.random() * matrixSize)

         if (matrix[y][x] == 0) {
              matrix[y][x] = 3
         }
    }



    for (let i = 0; i < boss; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
             matrix[y][x] = 4
        }
   }



   for (let i = 0; i < bossEater; i++) {

    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)

    if (matrix[y][x] == 0) {
         matrix[y][x] = 5
    }
}


    return matrix
}

let matrix = matrixGenerator(15, 25, 10,20,12,11)
console.log(matrix);

var side = 50


var grassArr = []
var grassEaterArr = []
var predatorArr = []
var bossArr = []
var bossEaterArr=[]


function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side)
    frameRate(10)
    for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix[y].length; x++) {
              if (matrix[y][x] == 1) {
                   var gr = new Grass(x, y);
                   grassArr.push(gr);
              }
              else if (matrix[y][x] == 2) {

                   var grEat = new GrassEater(x, y);
                   grassEaterArr.push(grEat);
              } else if (matrix[y][x] == 3) {

                   var pre = new Predator(x, y);
                   predatorArr.push(pre);
              }else if (matrix[y][x] == 4){
                  var bs = new boss(x,y);
                  bossArr.push(bs);
              }else if (matrix[y][x] == 5){
                var bser = new bossEater(x,y);
                bossEaterArr.push(bser);

         }
    }
}

}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix[y].length; x++) {

              
              if (matrix[y][x] == 1) {
                   fill("green")
              }else  if (matrix[y][x] == 2) {
                   fill("yellow")
              }else  if (matrix[y][x] == 3) {
                   fill("red")
              }else if (matrix[y][x]==4){
                  fill("black")
              }else if (matrix[y][x]==5){
                fill("white")}
              
              
              else {
                   fill("gray")
              }

              rect(x * side, y * side, side, side)
         }
    }


    for( var i in grassArr){
         grassArr[i].mul()
        
    }

    for(let i in grassEaterArr){
         grassEaterArr[i].mul()
         grassEaterArr[i].eat()
    }

    for(let j in predatorArr){
         predatorArr[j].mul()
         predatorArr[j].eat()
    }

for(var i in bossArr){
//     bossArr[i].mul()
    bossArr[i].eat()

}
for(var j in bossEaterArr){
    bossEaterArr[j].mul()
    bossEaterArr[j].eat()
}
console.log(bossEaterArr.length);

}

