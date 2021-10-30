function restoreStartingConfiguration(docData, appOptionsToRestore) {

    app.open(new File(docData.filePath));
    app.displayDialogs = appOptionsToRestore;
}