/**
 * Google Apps Script (GAS) Backend
 * 
 * Instructions:
 * 1. Create a Google Sheet with columns: id, titulo, descripcion, precio, imagenPrincipal, imagenesAdicionales, linkPago.
 * 2. Open Extensions > Apps Script.
 * 3. Paste this code into Code.gs.
 * 4. Deploy as Web App (Execute as: Me, Who has access: Anyone).
 * 5. Copy the Web App URL and paste it into the API_URL variable in React.
 */

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const json = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      let value = row[index];
      // Handle imagenesAdicionales as an array
      if (header === 'imagenesAdicionales' && typeof value === 'string') {
        value = value.split(',').map(img => img.trim()).filter(img => img !== "");
      }
      obj[header] = value;
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
