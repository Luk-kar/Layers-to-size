function getConfigValues(configFile) {

    var columsNamesRow = "type size,width,height";

    var values = [];

    while (!configFile.eof) {

        var line = configFile.readln();

        if (line.search(columsNamesRow) !== 0) {
            values.push(line.split(","));
        }
    }

    return values;
}