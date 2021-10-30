function saveNewSizeToPNG(layer, folderPath) {

    var doc = app.activeDocument;

    var fileName = layer.name;
    var newFilePath = folderPath + "/" + fileName + ".png";
    var pngFile = File(newFilePath);
    pngSaveOptions = new PNGSaveOptions();
    doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
}