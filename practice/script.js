d3.json("samples.json").then(data => console.log(data));

d3.json("samples.json").then(data =>
    // firstPerson = data.metadata[0];
    Object.entries(data.metadata[0]).forEach(([key, value]) => console.log(key + ":" + value))
); 

d3.selectAll("body").on("change", updatePage);                          // call updatePage on events that change <body />

function updatePage() {
    var dropdownMenu = d3.selectAll("#selectOption").node();            // selection.node() returns first element in the selection, in this case the dropdown menu with HTML id selectOption
    var dropdownMenuID = dropdownMenu.id;                               // store id of dropdown menu in var
    var selectedOption = dropdownMenu.value;                            // store value of dropdown menu in var

    console.log(dropdownMenuID);                                        // on each change to the dropdown a (likely) different option (hence id and value grabbed) is selected and printed to console
    console.log(selectedOption);
};

