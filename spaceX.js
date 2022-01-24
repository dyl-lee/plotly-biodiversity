// const url = "https://api.spacexdata.com/v2/launchpads";

d3.json("samples.json").then(data => console.log(data));

d3.json("samples.json").then(data =>
    // firstPerson = data.metadata[0];
    Object.entries(data.metadata[0]).forEach(([key, value]) => console.log(key + ":" + value))
    ); 
