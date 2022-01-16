let a = document.getElementById("a");
let context = a.getContext("2d");
let b = document.getElementById("b");
let context2 = b.getContext("2d");
let c = document.getElementById("c");
let context3 = c.getContext("2d");
let d = document.getElementById("d");
let context4 = d.getContext("2d");

let loadImg = (source, callback) => {
    let myImg = document.createElement("img")
    myImg.src = source
    myImg.onload = () => callback(myImg)
}

let imagePath = (frameNumber, animation) => {
    return "images/" + animation + "/" + frameNumber + ".png"
}

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
}

let movements = ["idle", "kick", "punch", "backward", "block", "forward"]
let movementsExcludingIdle = movements.filter(i => i !== "idle")

let loadImages = (callback) => {
    let images = { kick: [], punch: [], idle: [], backward: [], block: [], forward: [] };
    let imagesToLoad = 0;

    movements.forEach((animation) => {
        let animationFrames = frames[animation]
        imagesToLoad = imagesToLoad + animationFrames.length

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation)
            loadImg(path, (image) => {
                images[animation][frameNumber - 1] = image
                imagesToLoad -= 1
                if (imagesToLoad === 0) {
                    callback(images)
                }
            })
        })
    })
}

let animate = (context, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            context.clearRect(0, 0, c.width, c.height)
            context.drawImage(image, 0, 0, 200, 200);
            context2.clearRect(0, 0, c.width, c.height)
            context2.drawImage(image, 0, 0, 200, 200);
            context3.clearRect(0, 0, c.width, c.height)
            context3.drawImage(image, 0, 0, 200, 200);
            context4.clearRect(0, 0, c.width, c.height)
            context4.drawImage(image, 0, 0, 200, 200);
        }, index * 100)
    })

    setTimeout(callback, images[animation].length * 100)
}

let selectedAnimation
let queuedAnimation = []

let chooseAnimation = (animation) => {
    document.getElementById(animation).onclick = () => {
        queuedAnimation.push(animation)
    }
}

loadImages((images) => {

    let aux = () => {

        if (queuedAnimation.length === 0) {
            selectedAnimation = "idle"
        } else {
            selectedAnimation = queuedAnimation.shift()
        }

        animate(context, images, selectedAnimation, aux)
    }

    aux()

    // Button clicks
    movementsExcludingIdle.forEach(move => chooseAnimation(move))

    // Key presses
    document.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase()

        switch (key) {
            case 'w':
                queuedAnimation.push("kick")
                break;
            case 's':
                queuedAnimation.push("punch")
                break;
            case 'd':
                queuedAnimation.push("forward")
                break;
            case 'a':
                queuedAnimation.push("backward")
                break;
            case 'x':
                queuedAnimation.push("block")
                break;
        }

    })
})