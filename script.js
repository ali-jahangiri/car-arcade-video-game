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
            this.vehicle.attacheKeyboardEvent();
            this.vehicle.moveToXAxisTangent();


            const crosswalk = `
                <div class="crosswalk">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;

        const roadTemplate = `
            <div class="road">

            </div>
        `;
        

        document.getElementById("gameContainer").innerHTML += roadTemplate;
        document.getElementById("gameContainer").innerHTML += roadTemplate;


        const timeoutByMillisecond = 3000;

        setTimeout(function named() {
                const [firstRoadBox , secondeRoadBox] = Array.from(document.querySelectorAll(".road"));
                
                function timingLifecycle(element) {
                    element.classList.add("comeInside");
                    element.style.transitionDuration = `${timeoutByMillisecond}ms`

                    let timer = setTimeout(() => {
                        element.classList.remove("comeInside");
                        element.style.transitionDuration = `${0}ms`
                        clearTimeout(timer);
                    } , timeoutByMillisecond);
                }
                
                timingLifecycle(firstRoadBox);
                
                setInterval(() => {
                    timingLifecycle(firstRoadBox)
                } , timeoutByMillisecond + 10);
                
                setTimeout(() => {
                    timingLifecycle(secondeRoadBox)
                    setInterval(() => {
                        timingLifecycle(secondeRoadBox)
                    } , timeoutByMillisecond + 10);
                } , timeoutByMillisecond / 2);

        } , 1);





        })
    }
}


class Vehicle {
    constructor(container) {
        
        this.speed = 1;
        this.position = 0;

        this.STATIC = {
            placementNameOperator : { 
                39 : "+",
                37  : "-",
            },
        }
        

        const vehicleContainer = document.createElement("div");
        vehicleContainer.classList.add("vehicleContainer")
        const carImageTemplate = `<img class="vehicleImage" src="./assets/car.png" alt="car-thumbnail" />`;
        vehicleContainer.innerHTML = carImageTemplate;
        container.appendChild(vehicleContainer);
        this.vehicleContainer = document.querySelector(".vehicleContainer");
    }

    attacheKeyboardEvent() {
        window.addEventListener("keyup" , this.keyboardArrowEvent.bind(this));
    }

    keyboardArrowEvent(e) {
        const targetNewPlacementOperator = this.STATIC.placementNameOperator[e.keyCode];
        if(targetNewPlacementOperator) 
            this.move(targetNewPlacementOperator);
    }

    move(operator) {
        let prevPosition = this.position;
        const newPosition = operator === "-" ? --prevPosition : ++prevPosition;
        
        
        const percentageElementPos = `${(newPosition + 1) * 50}%`;
        const tolerancePercentageElement = newPosition !== 0 ? (newPosition < 0 ? "+ 10%" : "- 10%") : "";
        document.querySelector(".vehicleContainer")
            .style
            .left = `calc(${percentageElementPos} ${tolerancePercentageElement})`;
        
        this.position = newPosition;
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