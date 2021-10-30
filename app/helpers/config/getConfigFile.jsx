#include "./getConfigPath.jsx"

function getConfigFile() {
    var configFilePath = getConfigPath();
    var configFile = new File(configFilePath);

    return configFile;
}