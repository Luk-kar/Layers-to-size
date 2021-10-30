#include "./helpers/checkConditionsForScript/checkConditionsForScript.jsx"
#include "./helpers/setAppConfigurationToRunScript.jsx"
#include "./helpers/getCurrentFileData.jsx"
#include "./helpers/setFileToPngs/setFileToPngs.jsx"
#include "./helpers/restoreStartingConfiguration.jsx"
#include "./helpers/informClientAboutSuccess.jsx"

function setLayersToSizes() {

    if(!checkConditionsForScript()) {
        return // terminate script
    }

    var appOptionsToRestore = setAppConfigurationToRunScript();

    var doc = app.activeDocument;
    var docData = getCurrentFileData(doc)
    doc.close();

    setFileToPngs(docData);

    restoreStartingConfiguration(docData, appOptionsToRestore);
    informClientAboutSuccess();
}