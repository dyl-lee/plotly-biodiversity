function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;
    console.log(data)

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleFiltered = sampleArray.filter( (sampleObj) => sampleObj.id == sample);
    console.log(sampleFiltered);

    // 4a. create variable that filters the metadata array for object with the desired sample number
    var metadataFiltered = data.metadata.filter( (obj) => obj.id == sample);
    console.log(metadataFiltered);

    // 5. Create a variable that holds the first sample in the array.
    var samplefirstFiltered = sampleFiltered[0];
    console.log(samplefirstFiltered);    

    // 5a. Create variable that holds first set of metadata in metadata array
    var metadatafirstFiltered = metadataFiltered[0];
    console.log(metadatafirstFiltered);

    var washFreq = metadatafirstFiltered.wfreq;
    console.log(washFreq);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = samplefirstFiltered.otu_ids;
    var otu_labels = samplefirstFiltered.otu_labels;
    var sample_values = samplefirstFiltered.sample_values;

    // console.log(otu_ids);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_ids.slice(0,10).map(id => "OTU "+id).reverse();
    console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: 'h',
      text: otu_labels.slice(0,10).reverse(),
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: "Sample Frequency"},
      yaxis: {title: "OTU ID number"},
      font: {
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif'
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);
    
    // Bar and Bubble charts
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker:{
        size: sample_values,
        color: otu_ids,
        colorscale: 'YlGnBu'
      },
      text: otu_labels,
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {title: 'OTU ID'},
      height: 500,
      font: {
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif'
      }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
    // washing frequency
    var washfreqFloat = parseFloat(washFreq);
    console.log(washFreq);
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: washfreqFloat,
      title: {text: "Handwashing Frequency"},
      type: 'indicator',
      mode: 'gauge+number',
      gauge: {
        axis: { range: [null, 10], tickwidth:1, tickcolor:"black"},
        bar: { 
          color: 'rgb(119,171,89)',
          thickness: 0.3
        },
        steps: [
          {range: [0,2], color: 'rgb(1,31,75)'},
          {range: [2,4], color: 'rgb(3,57,108)'},
          {range: [4,6], color: 'rgb(0,91,150)'},
          {range: [6,8], color: 'rgb(100,151,177)'},
          {range: [8,10], color: 'rgb(179,205,224)'}
        ]
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 400,
      height: 400,
      margin: { t: 0, r: 25, l: 25, b: 25 },
      font: {color: "black", family:'Helvetica Neue, Helvetica, Arial, sans-serif', size: 12}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};