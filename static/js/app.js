// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == parseInt(sample));
    let result = resultArray[0];
    
    // Debug: Log the filtered result
    console.log("Filtered Result Array:", resultArray);
    console.log("Selected Result:", result);

    // Handle case when no metadata is found
    if (!result) {
      console.error(`No metadata found for sample ${sample}`);
      return;
    }

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    panel.html("");


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}


// function to build both charts - buildChart using buildMetadata
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;


    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];



    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build the Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth' // Optional: You can choose any colorscale
      }
    };
    
    let bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "OTU ID" },
      hovermode: 'closest'
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
    
    // For the Bar Chart, get the top 10 otu_ids and sample_values
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let topSampleValues = sample_values.slice(0, 10).reverse();
    let topOtuLabels = otu_labels.slice(0, 10).reverse();

    // Build the Bar Chart
    let barTrace = {
      x: topSampleValues,
      y: yticks,
      text: topOtuLabels,
      type: 'bar',
      orientation: 'h'
    };

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', [barTrace], barLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown element with id `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Loop through the sample names to populate the dropdown options
    sampleNames.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });
   
    // Get the first sample from the list to initialize charts and metadata
    let firstSample = sampleNames[0];
   
    // Build the initial charts and metadata with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample); 


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
