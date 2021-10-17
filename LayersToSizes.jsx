function LayersToSizes() {

    var sevedAppOptions = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    var docDir = doc.path;
    var filePath = doc.fullName

    var sizes = getConfigValue();

    doc.close();

    for (var j = 0; j < sizes.length; j++) {
        var reopenedFile = app.open(new File(filePath))

        var newSize = sizes[j]

        var folderSizeName = newSize[0]
        var width = newSize[1]
        var height = newSize[2]

        var unit = "px"

        reopenedFile.resizeImage(UnitValue(width, unit), UnitValue(height, unit), undefined, ResampleMethod.BICUBICSHARPER)

        var layers = reopenedFile.artLayers;


        //save as in folder
        for (k = 0; k < layers.length; k++) {
            // make all layers invible
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i]
                layer.visible = false;
            }
            // layer name
            var layer = layers[k]

            layer.visible = true;
            var fileName = layer.name

            //create folder
            var newFolder = new Folder(docDir + "/" + folderSizeName)

            if (!newFolder.exists) {
                newFolder.create();
            }

            // layer visible = true
            var newFilePath = docDir + "/" + folderSizeName +"/" + fileName + ".png"

            var pngFile = File(newFilePath);
            pngSaveOptions = new PNGSaveOptions();

            // alert("stop")

            reopenedFile.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
        }

        reopenedFile.close()
    }

    app.open(new File(filePath))
    app.displayDialogs = sevedAppOptions;
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