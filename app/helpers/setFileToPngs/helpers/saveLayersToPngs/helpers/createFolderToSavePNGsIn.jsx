function createFolderToSavePNGsIn(folderPath) {
    var newFolder = new Folder(folderPath);
    if (!newFolder.exists) {
        newFolder.create();
    } else {
        newFolder.remove();
    }
}