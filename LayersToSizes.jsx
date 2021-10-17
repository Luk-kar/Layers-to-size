function LayersToSizes() {
    var doc = app.activeDocument;
    var docPath = doc.path;
    
    var sizes = []

    //readconfig
}

function getConfigPath() {
    var configFileName = "config.ini";
    var root = (new File($.fileName)).toString().replace(/\\/g, '/') + "/";

    var congiFilePath = root + configFileName;
    return congiFilePath;
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
            values.push(line)
        }
    }

    return values
}

LayersToSizes()