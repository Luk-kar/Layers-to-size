#include "./getConfigFile.jsx"
#include "./getConfigValues.jsx"

function getConfigValue() {

    var configFile = getConfigFile();

    configFile.open("r");

    return getConfigValues(configFile);
}