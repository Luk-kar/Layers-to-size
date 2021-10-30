function LayersToSizes() {

    var appOptionsToRestore = setAppConfigurationToRunScript();

    var doc = app.activeDocument;
    var fileData = getFileData(doc)
    doc.close();

    setFileToPngs(fileData);

    restoreStartingConfiguration(fileData, appOptionsToRestore);
    informClientAboutSuccess();
}

function informClientAboutSuccess() {
    var doc = app.activeDocument
    var docDir = decodeURI(doc.path)
    alert("You have successfully saved layers to desired pngs\n" + docDir);
}

function restoreStartingConfiguration(fileData, appOptionsToRestore) {

    app.open(new File(fileData.filePath));
    app.displayDialogs = appOptionsToRestore;
}

function setAppConfigurationToRunScript() {

    var appOptionsToRestore = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    return appOptionsToRestore;
}

function getFileData(doc) {
    return {
        docDir: doc.path,
        filePath: doc.fullName
    };
}

function setFileToPngs(file) {

    var sizes = getConfigValue();

    for (var j = 0; j < sizes.length; j++) {

        var reopenedFile = app.open(new File(file.filePath));
        var newSize = sizes[j];

        var folderSizeName = newSize[0];

        setNewSize(reopenedFile, newSize);

        saveLayersToPngs(folderSizeName);

        reopenedFile.close(SaveOptions.DONOTSAVECHANGES);
    }
}

function saveLayersToPngs(folderSizeName) {

    var doc = app.activeDocument
    var file = getFileData(doc)
    var layersToPngs = doc.artLayers;

    for (k = 0; k < layersToPngs.length; k++) {
        // make all layers invible
        for (var i = 0; i < layersToPngs.length; i++) {
            var layer = layersToPngs[i];
            layer.visible = false;
        }
        // layer name
        var layer = layersToPngs[k];

        layer.visible = true;
        var fileName = layer.name;

        //create folder
        var newFolder = new Folder(file.docDir + "/" + folderSizeName);

        if (!newFolder.exists) {
            newFolder.create();
        } else {
            newFolder.remove();
        }

        // layer visible = true
        var newFilePath = file.docDir + "/" + folderSizeName + "/" + fileName + ".png";

        var pngFile = File(newFilePath);
        pngSaveOptions = new PNGSaveOptions();

        doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
    }
}

function setNewSize(reopenedFile, newSize) {

    var width = newSize[1];
    var height = newSize[2];
    var unit = "px";

    reopenedFile.resizeImage(UnitValue(width, unit), UnitValue(height, unit), undefined, ResampleMethod.BICUBICSHARPER);
}

function getConfigPath() {
    var configFileName = "config.csv";
    var filePath = decodeURI(($.fileName));
    var root = filePath.match(/(.*)[\/\\]/)[1]||'';

    var configFilePath = root + "/" + configFileName;

    return configFilePath;
}

function getConfigFile() {
    var configFilePath = getConfigPath();
    var configFile = new File(configFilePath);

    return configFile;
}

function getConfigValue() {

    var configFile = getConfigFile();

    configFile.open("r");

    return getValues(configFile);
}

function getValues(FileIni) {

    var columsNamesRow = "type size,width,height";

    var values = []

    while (!FileIni.eof) {

        var line = FileIni.readln();

        if (line.search(columsNamesRow) !== 0) {
            values.push(line.split(","))
        }
    }

    return values
}

LayersToSizes()