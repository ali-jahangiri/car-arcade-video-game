const appEntry = document.getElementById("container");

class Playground {
    constructor(containerUi) {
        this.controllerUi = containerUi;
        const gameContainer = document.createElement("div");
        gameContainer.id = "gameContainer";
        
        
        appEntry.appendChild(gameContainer);


        this.controllerInstance = new ControllerUi();
        this.vehicle = new Vehicle(gameContainer);

        this.controllerInstance.initializerControllerRender(gameContainer);

        this.controllerInstance.onStartBtnClicked(() => {
            this.vehicle.moveToXAxisTangent();
        })
    }
}


class Vehicle {
    constructor(container) {
        this.moveEvent = window.addEventListener("keyup" , this.keyboardArrowEvent.bind(this));
        
        this.speed = 1;
        this.placement = "center";
        this.STATIC_PLACEMENT_NAME = {
            39 : "right",
            37  : "left",
        }

        const vehicleContainer = document.createElement("div");
        vehicleContainer.classList.add("vehicleContainer")
        const carImageTemplate = `<img class="vehicleImage" src="./assets/car.png" alt="car-thumbnail" />`;
        vehicleContainer.innerHTML = carImageTemplate;
        container.appendChild(vehicleContainer);
        this.vehicleContainer = vehicleContainer;
    }

    

    keyboardArrowEvent(e) {
        const targetNewPlacement = this.STATIC_PLACEMENT_NAME[e.keyCode];

        if(this.placement === "center") {
            this.move(targetNewPlacement)
        }
    }

    move(newPlacement) {

    }

    moveToXAxisTangent() {
        console.log(this.vehicleContainer);
        document.querySelector(".vehicleContainer").classList.add("onXTangent")
    }
}


class ControllerUi {
    constructor() {
        this.onStartBtnClickedCallback = () => {};
    }

    initializerControllerRender(container) {
        const controllerTemplate = `
            <div id="controller">
                <h2>Car Arcade Game</h2>
                <p>Aliquid repellendus et incidunt provident rem sed earum quo. In culpa nobis. Eos ad .</p>
                <button id="startBtn">
                    Start
                </button>
            </div>
        `;

        container.innerHTML += controllerTemplate;
        
        
        const startBtn = document.getElementById("startBtn");
        const controllerContainer = document.getElementById("controller");

        startBtn.addEventListener("click" , e => {
            controllerContainer.classList.add("controllerHide");
            this.onStartBtnClickedCallback();
        });

    }

    onStartBtnClicked(callback) {
        this.onStartBtnClickedCallback = callback;
    }
}


const playgroundIns = new Playground();