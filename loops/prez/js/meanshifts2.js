var ms2Dat = {};

async function meanshift2Graph() {
    await Promise.all([
        moonPromise,
        moonMS2Promise]);
    await Promise.all(moonMS2Promises);

    var iterations = moonMS2Csvs.map(row => row[0]);
    var canvas_id = "meanshifts2-canvas";
    var canvas = document.getElementById(canvas_id);
    var parent_section = getClosest(canvas, "section");

    // Create scale functions
    var xScale = d3.scaleLinear()  // xScale is width of graphic
                    .domain([-2, 2])
                    .range([0,1]); // output range

    var yScale = d3.scaleLinear()  // yScale is height of graphic
                    .domain([-2, 2])
                    .range([1,0]);  // remember y starts on top going down so we flip

    // Create SVG element
    var svg = d3.select("#" + canvas_id)  // This is where we put our vis
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1 1")
        .classed("svg-content", true);

    // Create Data circles
    svg.append("g")
        .attr("id", "data")
        .selectAll("circle")
        .data(moons_xy)
        .enter()
        .append("circle")  // Add circle svg
        .attr("cx", function(d) {
            return xScale(d[0]);  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return yScale(d[1]);
        })
        .attr("r", ".01");  // radius

    svg.append("g")
        .attr("id", "iterate")
        .selectAll("circle")
        .data(moonMS2Pts[0])
        .enter()
        .append("circle")  // Add circle svg
        .attr("stroke", "#ff0000")
        .attr("fill", "#ff0000")
        .attr('stroke-width',0.002)
        .attr("cx", function(d) {
            return xScale(d[0]);  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return yScale(d[1]);
        })
        .attr("r", ".002");  // radius

    ms2Dat.iteration = 0;
    var gui = new dat.GUI();
    slide_hider(parent_section, gui.domElement);
    gui.add(ms2Dat, 'iteration', 0, iterations.length - 1, 1)
       .onChange(updateGraph)
       .listen();

    function WASDlistener(e) {
        if (e.code === "KeyA") {
            if (ms2Dat.iteration === 0) { return; }
            ms2Dat.iteration -= 1;
            updateGraph(ms2Dat.iteration);
        }
        else if (e.code === "KeyD") {     
            if (ms2Dat.iteration === iterations.length - 1) { return; }
            ms2Dat.iteration += 1;
            updateGraph(ms2Dat.iteration);
        }
    }

    function addWASD() {
        console.log("adding event");
        document.addEventListener('keydown', WASDlistener);
    }
    function removeWASD() {
        console.log("removing event");
        document.removeEventListener('keydown', WASDlistener);
    }
    slide_observer(parent_section, addWASD, removeWASD);

    function initializeGraph() {
        console.log("initializing!");
        that.iteration = -1;
        // Update Circles
        svg.selectAll("#iterate")
            .selectAll("circle")
            .data(moonMS2Pts[0])
            .attr("stroke", "#ff0000")
            .attr("fill", "#ff0000")
            .attr('stroke-width',0.002)
            .attr("cx", function(d) {
                return xScale(d[0]);  // Circle's X
            })
            .attr("cy", function(d) {  // Circle's Y
                return yScale(d[1]);
            })
            .attr("r", ".002");  // radius
    }
    //slide_observer(parent_section, initializeGraph);
   
    var previous_update = + new Date();
    function updateGraph(i) {
        var now = + new Date();
        var delay = Math.min(now - previous_update, 600);
        previous_update = now;
        svg.selectAll("#iterate")
            .selectAll("circle")
            .data(moonMS2Pts[i])
            .transition()
            .duration(delay)
            .attr("stroke", "#ff0000")
            .attr("fill", "#ff0000")
            .attr('stroke-width',0.002)
            .attr("cx", function(d) {
                return xScale(d[0]);  // Circle's X
            })
            .attr("cy", function(d) {  // Circle's Y
                return yScale(d[1]);
            })
            .attr("r", ".002");  // radius
    }
}

$(document).ready(meanshift2Graph);
