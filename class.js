class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {

        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {

        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        //  console.log(newCell);
        if (newCell && this.multiply >= 8) {

            var newX = newCell[0]
            var newY = newCell[1]

            var gr = new Grass(newX, newY)
            grassArr.push(gr)

            matrix[newY][newX] = 1

            this.multiply = 0
        }


    }
}


class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 8
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 12) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 2
            var grEat = new GrassEater(newX, newY)
            grassEaterArr.push(grEat)


            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for(var i in grassArr){
                // console.log(grassArr);
                if (newX == grassArr[i].x  && newY == grassArr[i].y ) {
                            grassArr.splice(i, 1)
                               break
                }
            }


        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in grassEaterArr){
                    if(this.x ==  grassEaterArr[i].x &&  this.y == grassEaterArr[i].y){

                             grassEaterArr.splice(i,1)
                             break
                    }
           }
    }


}





class Predator{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char,char1) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 15) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 3
            var pre = new Predator(newX, newY)
            predatorArr.push(pre)


            this.multiply = 0
        }


    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }



    eat() {
        var emptyCells = this.chooseCell(1,2)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for(var i in grassArr){
                // console.log(grassArr);
                if (newX == grassArr[i].x  && newY == grassArr[i].y ) {
                            grassArr.splice(i, 1)
                               break
                }
            }

            for(var i in grassEaterArr){
                if (newX == grassEaterArr[i].x  && newY == grassEaterArr[i].y ) {
                            grassEaterArr.splice(i, 1)
                               break
                }
            }

        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in predatorArr){
                    if(this.x ==  predatorArr[i].x &&  this.y == predatorArr[i].y){

                            predatorArr.splice(i,1)
                             break
                    }
           }
    }

}

class boss{
    constructor(x,y){
        this.y=y
        this.x = x
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 10) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 4
            var bs = new boss(newX, newY)
            bossArr.push(bs)
            

            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
               this.die()
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(2)
        var emptyCells = this.chooseCell(3)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

           
            for(var i in grassEaterArr){
                if (newX == grassEaterArr[i].x  && newY == grassEaterArr[i].y ) {
                            grassEaterArr.splice(i, 1)
                               break
                }
            }

            for(var i in predatorArr){
                if (newX == predatorArr[i].x  && newY == predatorArr[i].y ) {
                    predatorArr.splice(i, 1)
                               break
                }
            }

            this.mul()

        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in bossArr){
                    if(this.x ==  bossArr[i].x &&  this.y == bossArr[i].y){

                             bossArr.splice(i,1)
                             break
                    }
           }
    }


}









class bossEater{
    constructor(x,y){
        this.y = y
        this.x = x
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }
    
    getNewCoordinates() {
        this.directions = [[this.x, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x, this.y + 1],   
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >=50) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 5
            var bser = new bossEater(newX, newY)
            bossEaterArr.push(bser)
            

            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            console.log(this.energy);
            
            if (this.energy < 0) {
               this.die()
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(4)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for(var i in bossArr){
                if (newX == bossArr[i].x  && newY == bossArr[i].y ) {
                    bossArr.splice(i, 1)
                               break
                }
            }

            

            

        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0
// console.log("meri");

           for(let i in bossEaterArr){
                    if(this.x ==  bossEaterArr[i].x &&  this.y == bossEaterArr[i].y){

                             bossEaterArr.splice(i,1)
                    }
           }
    }


}