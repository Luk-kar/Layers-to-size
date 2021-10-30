function isPSDDoc() {
    var docName = app.activeDocument.name;
    var extensionPSD = /\.psd$/g; // https://regex101.com/r/NNe9X7/1
    var isPSD = docName.match(extensionPSD);
    return isPSD;
}
