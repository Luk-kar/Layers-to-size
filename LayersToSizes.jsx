function LayersToSizes() {

    var sevedAppOptions = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    var docPath = doc.path;
    var filePath = doc.fullName

    var sizes = getConfigValue();

    doc.close();

    for (var i = 0; i < sizes.length; i++) {
        var reopenedFile = app.open(new File(filePath))

        var newSize = sizes[i]

        var folderSizeName = newSize[0]
        var width = newSize[1]
        var height = newSize[2]

        var unit = "px"

        reopenedFile.resizeImage(UnitValue(width, unit), UnitValue(height, unit), undefined, ResampleMethod.BICUBICSHARPER)
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