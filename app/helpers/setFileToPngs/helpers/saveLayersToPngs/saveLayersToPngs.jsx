#include "./helpers/makeAllLayersInvible.jsx"
#include "./helpers/createFolderToSavePNGsIn.jsx"
#include "./helpers/saveNewSizeToPNG.jsx"
#include "../../../getCurrentFileData.jsx"

function saveLayersToPngs(folderSizeName) {

    var doc = app.activeDocument;
    var file = getCurrentFileData(doc);
    var layersToPngs = doc.artLayers;

    for (var i = 0; i < layersToPngs.length; i++) {

        makeAllLayersInvible(layersToPngs);

        var layer = layersToPngs[i];
        layer.visible = true;

        var folderPath = file.docDir + "/" + folderSizeName;

        createFolderToSavePNGsIn(folderPath);

        saveNewSizeToPNG(layer, folderPath);
    }
}