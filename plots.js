// function init() {                                               // init() renders default initial visualization
//     data = [{
//         x: [1,2,3,4,5],
//         y: [1,2,4,8,16]
//     }];

//     Plotly.newPlot("plot", data);
// };

// d3.selectAll("#dropdownMenu").on("change", updatePlotly);

// function updatePlotly() {
//     var dropdownMenu = d3.select("#dropdownMenu");              // get the current input for dropdown and store as variable
//     var dataset = dropdownMenu.property("value");               // get value (from HTML option tag) of dropdown variable

//     console.log(dropdownMenu);
//     console.log(dataset);

//     var xdata = [1,2,3,4,5];
//     var ydata = [];                                             // leave ydata blank to be defined later depending on user input

//     if(dataset === 'dataset1') {                                // syntax: if(condition) { code to execute if condition is true }
//         ydata = [1,2,4,8,16];
//     }

//     if(dataset === 'dataset2')  {
//         ydata = [1,10,100,1000,10000];
//     }

//     var trace = {                                               // xdata and ydata arrays are assembled inside trace object 
//         x: [xdata],
//         y: [ydata],
//     };

//     Plotly.restyle("plot", trace);                              // .restyle() accepts HTML <div> as first argument and JS object as second argument instead array, more efficient as it modifies previously displayed chart with new info
// };

// init();

function init() {
    var selector = d3.select("#selDataset");                                // select and store dropdown menu in var selector

    d3.json("samples.json").then((data) => {                                // load JSON then do the following function:
        console.log(data);                                                  // print-check if data loaded ok
        var sampleNames = data.names;                                       // dot notation to access and store sample names in var (numbers from 940 to 1601)
        sampleNames.forEach((sample) => {                                   // apply anon function to sampleNames array. for each sample/number...
            selector                                                        // ...selector (aka dropdown menu) will have...
                .append("option")                                           // a menu option appended
                .text(sample)                                               // where the text for this new option = sample that forEach is currently on
                .property("value", sample);                                 // and has "value" property equal to the sample name that forEach is currently on
    });
})};

init();

function optionChanged(newSample) {                                         // function only called when index.html <select /> detects change and passes this.value to the optionChanged function (aka newSample)
    buildMetadata(newSample);                                               // separating the functions we need to occur per change keeps the code modular
    // buildCharts(newSample);
};

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); // remember .filter() returns its result (the object whose id matches the sample selected from dropdown and passed to optionChanged) as an array 
        console.log(resultArray);                                               
        var result = resultArray[0];                                            // use zero-index to access array and store object in var result
        console.log(result);
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        PANEL.append("h6").text(result.location);
    });
}