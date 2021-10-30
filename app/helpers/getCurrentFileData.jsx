function getCurrentFileData(doc) {
    var doc = app.activeDocument;
    return {
        docDir: doc.path,
        filePath: doc.fullName
    };
}