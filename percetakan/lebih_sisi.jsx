//flaten image0
var docRef = app.activeDocument;
docRef.flatten();


// ubah mode ke cmyk color   
var docRef = app.activeDocument;
docRef.changeMode(ChangeMode.CMYK);

//SETTING WARNAFOREGROUND

coloru = app.foregroundColor;
coloru.cmyk.cyan = 0;
coloru.cmyk.magenta = 0;
coloru.cmyk.yellow = 0;
coloru.cmyk.black = 0;
app.backgroundColor = coloru;

//SETTING WARNA BACKGROUND
var color = app.backgroundColor;
color.cmyk.cyan = 0;
color.cmyk.magenta = 0;
color.cmyk.yellow = 0;
color.cmyk.black = 0;
app.backgroundColor = color;
//SETTING WARNAFOREGROUND

coloru = app.foregroundColor;
coloru.cmyk.cyan = 0;
coloru.cmyk.magenta = 0;
coloru.cmyk.yellow = 0;
coloru.cmyk.black = 0;
app.backgroundColor = coloru;

//SETTING WARNA BACKGROUND
var color = app.backgroundColor;
color.cmyk.cyan = 0;
color.cmyk.magenta = 0;
color.cmyk.yellow = 0;
color.cmyk.black = 0;
app.backgroundColor = color;

//==============menambah stroke 1==
var docRef = app.activeDocument;
var layerRef = docRef.layers.getByName("Background").duplicate(); //duplikat background menjadi layer
layerRef.name = "layer"; //renames the duplicated layer.

docRef.activeLayer = docRef.layers.getByName("layer"); //layer aktif adalah bernama layer


// Add Stroke to layer  
// Javier Aroche  


// Set color as HEX  
var strokeColor = new RGBColor();
strokeColor.hexValue = '000000';
addStroke(1, strokeColor, 100, 'inside');

/* 
 * Add Stroke Effect 
 * @param {Number} size : 1 - 250 
 * @param {Object} color : RGBColor object 
 * @param {Number} opacity : 0 - 100 
 * @param {Number} position : center / outside / inside 
 */
function addStroke(size, color, opacity, position) {
    var strokePosCharID;

    switch (position) {
        case 'center':
            strokePosCharID = 'CtrF';
            break;
        case 'outside':
            strokePosCharID = 'OutF';
            break;
        case 'inside':
            strokePosCharID = 'InsF';
            break;
        default:
            break;
    }

    var desc = new ActionDescriptor();
    var ref190 = new ActionReference();

    ref190.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Lefx"));
    ref190.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc.putReference(charIDToTypeID("null"), ref190);


    var fxDesc = new ActionDescriptor();

    var fxPropDesc = new ActionDescriptor();
    fxPropDesc.putBoolean(charIDToTypeID("enab"), true);
    fxPropDesc.putBoolean(stringIDToTypeID("present"), true);
    fxPropDesc.putBoolean(stringIDToTypeID("showInDialog"), true);
    fxPropDesc.putEnumerated(charIDToTypeID("Styl"), charIDToTypeID("FStl"), charIDToTypeID(strokePosCharID));
    fxPropDesc.putEnumerated(charIDToTypeID("PntT"), charIDToTypeID("FrFl"), charIDToTypeID("SClr"));
    fxPropDesc.putEnumerated(charIDToTypeID("Md  "), charIDToTypeID("BlnM"), charIDToTypeID("Nrml"));
    fxPropDesc.putUnitDouble(charIDToTypeID("Opct"), charIDToTypeID("#Prc"), opacity);
    fxPropDesc.putUnitDouble(charIDToTypeID("Sz  "), charIDToTypeID("#Pxl"), size);


    var colorDesc = new ActionDescriptor();
    colorDesc.putDouble(charIDToTypeID("Rd  "), color.red);
    colorDesc.putDouble(charIDToTypeID("Grn "), color.green);
    colorDesc.putDouble(charIDToTypeID("Bl  "), color.blue);
    fxPropDesc.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorDesc);


    fxPropDesc.putBoolean(stringIDToTypeID("overprint"), false);
    fxDesc.putObject(charIDToTypeID("FrFX"), charIDToTypeID("FrFX"), fxPropDesc);
    desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Lefx"), fxDesc);
    executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
}




// ==================MEMBUAT GRIDD===
var middleV = app.activeDocument.width.value / 2,
    middleH = app.activeDocument.height.value / 2;

activeDocument.guides.add(Direction.VERTICAL, new UnitValue(middleV, app.activeDocument.width.unit));
activeDocument.guides.add(Direction.VERTICAL, new UnitValue(0, app.activeDocument.width.unit));
activeDocument.guides.add(Direction.VERTICAL, new UnitValue(app.activeDocument.width.value, app.activeDocument.width.unit));
activeDocument.guides.add(Direction.HORIZONTAL, new UnitValue(middleH, app.activeDocument.height.unit));
activeDocument.guides.add(Direction.HORIZONTAL, new UnitValue(0, app.activeDocument.height.unit));
activeDocument.guides.add(Direction.HORIZONTAL, new UnitValue(app.activeDocument.height.value, app.activeDocument.height.unit));

// =====================MEMBUAT ukuran CANVAS PHOTOSHOPPPP=============I=========

if (app.documents.length > 0) {

    var myDocument = app.activeDocument;

    var originalRulerUnits = app.preferences.rulerUnits;

    app.preferences.rulerUnits = Units.CM;
    //ini ukuran 12 cm karena dia lebih sisi
    myDocument.resizeCanvas(myDocument.width + 12, myDocument.height + 12, AnchorPosition.MIDDLECENTER)

    app.preferences.rulerUnits = originalRulerUnits;

};
//waktu hari ini
var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

var tanggal = new Date().getDate();
var xhari = new Date().getDay();
var xbulan = new Date().getMonth();
var xtahun = new Date().getYear();
var hari = hari[xhari];
var bulan = bulan[xbulan];
var tahun = (xtahun < 1000) ? xtahun + 1900 : xtahun;

waktu = hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun;

//nama berdasarkan folder
var myDocument = activeDocument.path;
var fname = myDocument.name.split(".");
var fname = fname[0]

//pemberian spasi pada nama dokument
nama_folder = decodeURI(fname);
var nama = ' ==by== ';

//kondisi jika ada nilai x pada file artinya itu pemberian nama ukuran pada file
nilaix = app.activeDocument;
gabung_nilaix = nilaix + 'shunichi kudo';

var nilaix2 = gabung_nilaix.search('x');
var nilaix3 = gabung_nilaix.search('X');

if (nilaix2 < 2 && nilaix3 < 2 ) {
    //MEMBUAT ALERT untuk jumlah yang mau dicetak
    var myText = prompt("Created BY SHUN (PROGRAM MASIH DALAM PENGEMBANGAN)", "1", "JUMLAH CETAKAN (LEMBAR)");

    // ===============mengambil ukuran
    var layer = activeDocument.activeLayer; //Grab the currently selected layer

    // Calculate length and width based on the rectangular bounds of the selected layer
    var length = layer.bounds[2] - layer.bounds[0]; //Grab the length
    var width = layer.bounds[3] - layer.bounds[1]; //Grab the width

    // Remove pixels from the length/width "200 px" => "200"
    length = length.toString().replace(' px', '');
    width = width.toString().replace(' px', '');
    //membulatkan angka
    nama_file = app.activeDocument.name;
    uk = ' ukuran';
    spasi = "  ";
    satuan = "cm ";
    setrip = "--";
    jumlah = +myText;
    samaDengan = '=';
    akhir = " lembar lebih sisi";
    panjang = Math.round(length);
    lebar = Math.round(width);
    kali = " X ";


    var gab0 = nama_file + spasi + uk + spasi + panjang + kali + lebar + spasi + satuan + samaDengan + spasi + jumlah + akhir;
    var gab = uk + spasi + panjang + kali + lebar + spasi + satuan + samaDengan + spasi + jumlah + akhir + nama + nama_folder + spasi + '--' + waktu;
    //ini untuk kamu copy untuk nama
    prompt("Created BY SHUN (PROGRAM MASIH DALAM PENGEMBANGAN)", "" + gab0, "COPY TEXT TERSEBUT PASTE DI FILENYA");
} else {
    var gab = nama + nama_folder + ' -- ' + waktu;

    //penutup pengkondisian
}
// membuat nama dan align kiri
if (documents.length > 0) {
    var originalDialogMode = app.displayDialogs;
    app.displayDialogs = DialogModes.ERROR;
    var originalRulerUnits = preferences.rulerUnits;
    preferences.rulerUnits = Units.CM;
    try {

        // ============ NAMA filnya BERDASARKAN FILE DIREKTORI=========

        var docRef = activeDocument;

        var myLayerRef = docRef.artLayers.add();
        myLayerRef.kind = LayerKind.TEXT;
        myLayerRef.textItem.size = new UnitValue(30, "pt");

        var myTextRef = myLayerRef.textItem;
        var fileNameNoExtension = docRef.name;
        fileNameNoExtension = fileNameNoExtension.split("-");
        if (fileNameNoExtension.length > 1) {
            fileNameNoExtension.length--;
        }

        fileNameNoExtension = fileNameNoExtension.join("-");
        fileNameNoExtension = fileNameNoExtension.split(".");
        if (fileNameNoExtension.length > 1) {
            fileNameNoExtension.length--;
        }
        fileNameNoExtension = fileNameNoExtension.join(".") + gab;
        myTextRef.contents = fileNameNoExtension;
        myTextRef.position = new Array(1, 1);
    } catch (e) {
        preferences.rulerUnits = originalRulerUnits;
        app.displayDialogs = originalDialogMode;
        throw e;
    }
    preferences.rulerUnits = originalRulerUnits;
    app.displayDialogs = originalDialogMode;
} else {
    alert("You must have a document open to add the filename!");
}

//Allign kiri bawah
// membuat nama dan align kiri BAWAH
if (documents.length > 0) {
    var originalDialogMode = app.displayDialogs;
    app.displayDialogs = DialogModes.ERROR;
    var originalRulerUnits = preferences.rulerUnits;
    preferences.rulerUnits = Units.PERCENT;
    try {


        var docRef = activeDocument;
        var myLayerRef = docRef.artLayers.add();
        myLayerRef.kind = LayerKind.TEXT;
        myLayerRef.textItem.size = new UnitValue(30, "pt");

        var myTextRef = myLayerRef.textItem;
        var fileNameNoExtension = docRef.name;
        fileNameNoExtension = fileNameNoExtension.split("-");
        if (fileNameNoExtension.length > 1) {
            fileNameNoExtension.length--;
        }

        fileNameNoExtension = fileNameNoExtension.join("-");
        fileNameNoExtension = fileNameNoExtension.split(".");
        if (fileNameNoExtension.length > 1) {
            fileNameNoExtension.length--;
        }
        fileNameNoExtension = fileNameNoExtension.join(".") + gab;
        myTextRef.contents = fileNameNoExtension;
        myTextRef.position = new Array(1, 99.5);
    } catch (e) {
        preferences.rulerUnits = originalRulerUnits;
        app.displayDialogs = originalDialogMode;
        throw e;
    }
    preferences.rulerUnits = originalRulerUnits;
    app.displayDialogs = originalDialogMode;
} else {
    alert("You must have a document open to add the filename!");
}



//flaten image1
var docRef = app.activeDocument;
docRef.flatten();


//==============menambah stroke 2==
var docRef = app.activeDocument;
var layerRef = docRef.layers.getByName("Background").duplicate(); //duplikat background menjadi layer
layerRef.name = "layer"; //renames the duplicated layer.

docRef.activeLayer = docRef.layers.getByName("layer"); //layer aktif adalah bernama layer


// Add Stroke to layer  
// Javier Aroche  


// Set color as HEX  
var strokeColor = new RGBColor();
strokeColor.hexValue = '000000';
addStroke(1, strokeColor, 100, 'inside');

/* 
 * Add Stroke Effect 
 * @param {Number} size : 1 - 250 
 * @param {Object} color : RGBColor object 
 * @param {Number} opacity : 0 - 100 
 * @param {Number} position : center / outside / inside 
 */
function addStroke(size, color, opacity, position) {
    var strokePosCharID;

    switch (position) {
        case 'center':
            strokePosCharID = 'CtrF';
            break;
        case 'outside':
            strokePosCharID = 'OutF';
            break;
        case 'inside':
            strokePosCharID = 'InsF';
            break;
        default:
            break;
    }

    var desc = new ActionDescriptor();
    var ref190 = new ActionReference();

    ref190.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Lefx"));
    ref190.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc.putReference(charIDToTypeID("null"), ref190);


    var fxDesc = new ActionDescriptor();

    var fxPropDesc = new ActionDescriptor();
    fxPropDesc.putBoolean(charIDToTypeID("enab"), true);
    fxPropDesc.putBoolean(stringIDToTypeID("present"), true);
    fxPropDesc.putBoolean(stringIDToTypeID("showInDialog"), true);
    fxPropDesc.putEnumerated(charIDToTypeID("Styl"), charIDToTypeID("FStl"), charIDToTypeID(strokePosCharID));
    fxPropDesc.putEnumerated(charIDToTypeID("PntT"), charIDToTypeID("FrFl"), charIDToTypeID("SClr"));
    fxPropDesc.putEnumerated(charIDToTypeID("Md  "), charIDToTypeID("BlnM"), charIDToTypeID("Nrml"));
    fxPropDesc.putUnitDouble(charIDToTypeID("Opct"), charIDToTypeID("#Prc"), opacity);
    fxPropDesc.putUnitDouble(charIDToTypeID("Sz  "), charIDToTypeID("#Pxl"), size);


    var colorDesc = new ActionDescriptor();
    colorDesc.putDouble(charIDToTypeID("Rd  "), color.red);
    colorDesc.putDouble(charIDToTypeID("Grn "), color.green);
    colorDesc.putDouble(charIDToTypeID("Bl  "), color.blue);
    fxPropDesc.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), colorDesc);


    fxPropDesc.putBoolean(stringIDToTypeID("overprint"), false);
    fxDesc.putObject(charIDToTypeID("FrFX"), charIDToTypeID("FrFX"), fxPropDesc);
    desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Lefx"), fxDesc);
    executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
}

//flaten image2
var docRef = app.activeDocument;
docRef.flatten();

// save ke tiff
// Save file as TIFF function  
function saveAsTIFF(saveFile) {
    opts = new TiffSaveOptions();
    opts.alphaChannels = false;
    opts.byteOrder = ByteOrder.IBM;
    opts.embedColorProfile = true;
    opts.imageCompression = TIFFEncoding.TIFFLZW;
    opts.interleaveChannels = true;
    opts.layers = false;
    opts.spotColors = false;
    opts.transparency = true;
    activeDocument.saveAs(saveFile, opts, true, Extension.LOWERCASE);
};

//SETTING WARNA BACKGROUND
var coloring = app.backgroundColor;
coloring.cmyk.cyan = 60;
coloring.cmyk.magenta = 60;
coloring.cmyk.yellow = 60;
coloring.cmyk.black = 100;
app.backgroundColor = coloring;
//kekurangn program ini pas ketemu file png atau jpg dia tidak bisa simpan 