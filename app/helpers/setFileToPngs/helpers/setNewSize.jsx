function setNewSize(doc, newSize) {

    var width = newSize[1];
    var height = newSize[2];
    var unit = "px";

    doc.resizeImage(UnitValue(width, unit), UnitValue(height, unit), undefined, ResampleMethod.BICUBICSHARPER);
}