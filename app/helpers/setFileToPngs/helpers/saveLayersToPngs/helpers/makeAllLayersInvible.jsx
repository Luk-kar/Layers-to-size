function makeAllLayersInvible(layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        layer.visible = false;
    }
}