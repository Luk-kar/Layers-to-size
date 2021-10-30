function informClientAboutSuccess() {
    var doc = app.activeDocument;
    var docDir = decodeURI(doc.path);
    alert("You have successfully saved layers to desired pngs\n" + docDir);
}