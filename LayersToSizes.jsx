function LayersToSizes() {

    // set app configuration to run script
    var appOptionsToRestore = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    var fileData = getFileData(doc)
    doc.close();

    setFileToPngs(fileData);

    app.open(new File(fileData.filePath))
    app.displayDialogs = appOptionsToRestore;
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
        var width = newSize[1];
        var height = newSize[2];

        var unit = "px";

        reopenedFile.resizeImage(UnitValue(width, unit), UnitValue(height, unit), undefined, ResampleMethod.BICUBICSHARPER);

        var layers = reopenedFile.artLayers;


        //save as in folder
        for (k = 0; k < layers.length; k++) {
            // make all layers invible
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                layer.visible = false;
            }
            // layer name
            var layer = layers[k];

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

            reopenedFile.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
        }

        reopenedFile.close(SaveOptions.DONOTSAVECHANGES);
    }
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