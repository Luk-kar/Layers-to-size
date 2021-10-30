function getConfigPath() {
    var configFileName = "config.csv";
    var activeScriptPath = decodeURI(new File($.fileName).parent.parent.parent.toString());
    var root = activeScriptPath.match(/(.*)[\/\\]/)[1] || '';

    var configFilePath = root + "/" + configFileName;

    return configFilePath;
}