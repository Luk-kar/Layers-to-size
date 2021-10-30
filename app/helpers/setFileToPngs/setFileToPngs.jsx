#include "./helpers/setNewSize.jsx"
#include "./helpers/saveLayersToPngs/saveLayersToPngs.jsx"
#include "../config/getConfigValue.jsx"

function setFileToPngs(file) {

    var sizes = getConfigValue();

    for (var i = 0; i < sizes.length; i++) {

        var doc = app.open(new File(file.filePath));
        var newSize = sizes[i];
        var folderSizeName = newSize[0];

        setNewSize(doc, newSize);
        saveLayersToPngs(folderSizeName);

        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}