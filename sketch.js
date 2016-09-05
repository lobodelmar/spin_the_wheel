// advanced technology types
//"types": ["GPS", "proximity sensors", "computer vision", "telephone", "phone app", "AR/QR markers", "night vision", "accelerometer", "flexi", "touch", "microphone", "VR", "EEG headset", "motion capture"]

var data = {
  "locations": {
    "types": ["museum", "park", "castle", "club", "gallery", "music festival",
      "public square", "school/university", "public transport", "city streets"
    ],
    "d": 0.,
    "angle": 0,
    "counter": 0,
    "amount": 360.,
    "duration": 100.
  },
  "technologies": {
    "types": ["GPS", "camera", "phones/tablets", "touch interfaces", "buttons", "VR", "motion sensors", "wearables"],
    "d": 0.,
    "angle": 0,
    "counter": 0,
    "amount": 360.,
    "duration": 100.
  }
}

var canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight
var globalScale = canvasWidth / 1920
var c
var ellipseWidth = window.innerHeight * 0.8

var easeOutExpo = function(t, b, c, d) {
  return c * (-Math.pow(2, -10. * t / d) + 1) + b
}

function setup() {
  c = createCanvas(canvasWidth, canvasHeight)
  window.onresize = resCanvas
  background(255)
}

function draw() {
  colorMode(RGB)
  background(255)
  Wheel(data["locations"], "Locations", width / 4, height / 2)
  Wheel(data["technologies"], "Technologies", width / 4 * 3, height / 2)
}

var Wheel = function(d, title, locX, locY) {
  textAlign(CENTER, CENTER)
  strokeWeight(2)
  push()
  translate(locX, locY)
  scale(globalScale)
  fill(0)
  textSize(40)
  text(title, 0, -ellipseWidth / 2 * 1.1)
  colorMode(HSB, d["types"].length)
  textSize(30)
  var angleDiff = 2 * PI / d["types"].length
  d["angle"] = radians(easeOutExpo(
    d["counter"], d["d"], d["amount"], d["duration"]))
  for (var i = 0; i < d["types"].length; i++) {
    push()
    rotate(d["angle"])
    rotate(angleDiff * i)
    fill(i, d["types"].length, d["types"].length - 1)
    arc(0, 0, ellipseWidth, ellipseWidth, 0,
      2 * PI / d["types"].length, PIE)
    push()
    textOffset = (ellipseWidth) / 3.5
    rotate(angleDiff / 2)
    translate(textOffset, 0)
    fill(1, 0, d["types"].length)
    text(d["types"][i], 0, 0)
    pop()
    pop()
    fill(0)
    push()
    translate(ellipseWidth / 2, 0)
    triangle(-30, 0, 30, -30, 30, 30)
    pop()
  }
  d["counter"] += 1
  pop()
}

var spinWheels = function(d) {
  var minAngle = 500.
  var maxAngle = 1000.
  d["amount"] = random(minAngle, maxAngle)
  d["duration"] = map(
    d["amount"], minAngle, maxAngle, 200., 500.)
  d["counter"] = 0
}

var mousePressed = function() {
  spinWheels(data["locations"])
  spinWheels(data["technologies"])
}

var resCanvas = function() {
  console.log("hello is resized")
  globalScale = window.innerWidth / 1920
  resizeCanvas(window.innerWidth, window.innerHeight)
}
