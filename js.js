var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var colors = [
    '0079FF',
    '#46B29D',
    '#DE5B49',
    '#324D5C',
    '#F0CA4D'
]

var pen = canvas.getContext('2d');

var mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

})
var circleArray = [];

function Circle(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dx = dx;
    this.dy = dy;
    this.draw = function() {
        pen.beginPath();
        pen.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        pen.fillStyle = this.color ;
        pen.fill();
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < 40) {
                this.r += 1;
            }
        } else {
            if (this.r > 0) {
                this.r -= 1;
            }
        }
        this.draw();
    }
}

function beginApp() {
    requestAnimationFrame(beginApp);
    pen.clearRect(0, 0, canvas.width, canvas.height);
    var x = mouse.x;
    var y = mouse.y;
    var r = 5;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    circleArray.push(new Circle(x, y, r, dx, dy));
    for (var i = 0; i < circleArray.length; i++) {
        if(circleArray[i].r <= 0){
            circleArray.splice(i, 1);
        }
        circleArray[i].update();
    }
}

beginApp();