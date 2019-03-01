function renderRain(amount = 500, options = {}) {

    options = defaultRainOptions(options);


    let w = 960,
        h = 500;


    let container = d3.select("body")
        .append("div")
        .attr("class", "effect")
        .attr("id", "rain");

    container
        .append("div")
        .attr("id", "wind")
        .append("input")
        .attr("class", "slider")
        .attr("id", "windSlider")
        .attr("type", "range")
        .attr("min", -20)
        .attr("max", 20)
        .attr("value", 0)

    let windSlider = document.getElementById("windSlider");
    let wind = Number(windSlider.value);

    windSlider.oninput = function () {
        wind = Number(windSlider.value);
    }

    let canvas = container
        .append("canvas")
        .attr("class", "rainCanvas")
        .attr("width", w)
        .attr("height", h)
        .style("position", "absolute");

    let context = canvas.node().getContext('2d');

    

    let rainDrops = d3.range(amount).map(function () {
        let zIndex = getRandomArbitrary(0, 10);
        return {
            x: getRandomArbitrary(-10, w),
            y: getRandomArbitrary(-100, -600),
            z: zIndex,
            d: map(zIndex, 0, 10, 3, 10),
            length: map(zIndex, 0, 10, options.minLength, options.maxLength),
        }
    })

    console.log(rainDrops);


    d3.timer(function () {
        
        context.clearRect(0, 0,w,h);

        for (let i = 0, length = rainDrops.length; i < length; i++) {
            let x = rainDrops[i].x
            let oldx = rainDrops[i].x;
            let y = rainDrops[i].y
            let dropLength = rainDrops[i].length;

            x += wind
            

            y += rainDrops[i].d;
            if (y > h) {
                y = getRandomArbitrary(-100, -600);
                x = getRandomArbitrary(-100, w+100);
            }

            
            rainDrops[i].y = y;

            
            context.beginPath();
            context.moveTo(rainDrops[i].x,y);
            context.lineTo(x,y+dropLength);
            context.stroke();
            context.closePath();

            if (x > w) {
                x = getRandomArbitrary(-100, w+100);
            } else if (x < 0) {
                x = getRandomArbitrary(-100, w+100);
            }

            rainDrops[i].x = x;
        }

       
    })
}



function defaultRainOptions(options) {
    const MINLENGTH = 5,
        MAXLENGTH = 20;

    if (!("minLength" in options)) {
        options.minLength = MINLENGTH;
    }

    if (!("maxLength" in options)) {
        options.maxLength = MAXLENGTH;
    }




    return options;
}


renderRain(500);