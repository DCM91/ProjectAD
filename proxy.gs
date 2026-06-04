function doGet(e) {
  var fileId = e.parameter.fileId;
  if (fileId) {
    var file = DriveApp.getFileById(fileId);
    var blob = file.getBlob();
    var data = Utilities.base64Encode(blob.getBytes());
    var mime = blob.getContentType();
    return ContentService.createTextOutput("data:" + mime + ";base64," + data)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  var folderId = e.parameter.folderId;
  if (!folderId) {
    return ContentService.createTextOutput(JSON.stringify({ error: "folderId required" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var items = [];

    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();
      var isVideo = mime.indexOf("video/") === 0;
      var isImage = mime.indexOf("image/") === 0;

      if (isImage || isVideo) {
        var id = file.getId();
        items.push({
          id: id,
          name: file.getName(),
          type: isVideo ? "video" : "image"
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify(items))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
