function setAppConfigurationToRunScript() {

    var appOptionsToRestore = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    return appOptionsToRestore;
}