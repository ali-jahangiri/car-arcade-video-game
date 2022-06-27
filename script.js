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

        this.vehicleContainer = document.createElement("div");
        const carImageTemplate = `<img class="vehicle" src="./assets/car.png" alt="car-thumbnail" />`;
        this.vehicleContainer.innerHTML = carImageTemplate;
        container.appendChild(this.vehicleContainer);
    }

    

    keyboardArrowEvent(e) {
        const targetNewPlacement = this.STATIC_PLACEMENT_NAME[e.keyCode];

        if(this.placement === "center") {
            this.move(targetNewPlacement)
        }
    }

    move(newPlacement) {
        
    }

}


class ControllerUi {
    constructor() {}

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
            controllerContainer.classList.add("controllerHide")
        });

    }
}


const playgroundIns = new Playground();