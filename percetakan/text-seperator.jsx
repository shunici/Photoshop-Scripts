// select text layer and run script
// it will split one text layer to several layers by linebreaks
// showcase: https://www.youtube.com/watch?v=5oQgwZdW9Mo

doc = app.activeDocument;
layer = doc.activeLayer;

var text = layer.textItem.contents;
var textArray = text.split("\r");

var pos = layer.textItem.position;
var leading = 0;
if (layer.textItem.useAutoLeading){
        leading = layer.textItem.size/100*Math.round(layer.textItem.autoLeadingAmount)

}
else{
    leading = Number(layer.textItem.leading)
}

layer.textItem.contents=textArray[0]
layer.name = textArray[0]
for (var k=1; k<textArray.length;k++){
    tmp = layer.duplicate();
    tmp.textItem.position = [pos[0], pos[1]+(Number(leading)*k)]
    tmp.textItem.contents = textArray[k];
}