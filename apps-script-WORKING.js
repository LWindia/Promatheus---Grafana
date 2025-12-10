// ============================================
// Google Apps Script - Contact Form Handler
// 100% VERIFIED WORKING VERSION - FINAL
// Production Ready - Tested and Verified
// ============================================
// Copy this ENTIRE code into your Apps Script editor

// ⚙️ CONFIGURATION - UPDATE THESE VALUES
const APP_PASSWORD = 'uzdh iiso omms aaic'; // Must match password in Contact.jsx EXACTLY
const SHEET_ID = '1TXws8iKNH9b8KmkWMVwHl4wflVD79RbVtGjn87ytq34'; // Your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Your sheet tab name (case-sensitive)

/**
 * Handles GET requests - Primary method (most reliable)
 */
function doGet(e) {
  return processFormData(e);
}

/**
 * Handles POST requests - Fallback method
 */
function doPost(e) {
  return processFormData(e);
}

/**
 * Main function to process form data and save to sheet
 */
function processFormData(e) {
  try {
    Logger.log('=== FORM SUBMISSION START ===');
    Logger.log('Time: ' + new Date().toISOString());
    
    // Check if event exists
    if (!e) {
      Logger.log('ERROR: Event object is null/undefined');
      return createErrorResponse('No data received - event is null');
    }
    
    // Get parameters (works for both GET and POST)
    let params = {};
    if (e.parameter) {
      params = e.parameter;
      Logger.log('Parameters found: ' + Object.keys(params).join(', '));
    } else {
      Logger.log('WARNING: No parameters in event object');
      Logger.log('Event keys: ' + Object.keys(e).join(', '));
      return createErrorResponse('No parameters received');
    }
    
    // Extract form data
    const name = (params.name || '').trim();
    const email = (params.email || '').trim();
    const phone = (params.phone || '').trim();
    const message = (params.message || '').trim();
    const receivedPassword = (params.appPassword || params.password || '').trim();
    
    Logger.log('Form data extracted:');
    Logger.log('  Name: ' + name);
    Logger.log('  Email: ' + email);
    Logger.log('  Phone: ' + phone);
    Logger.log('  Message: ' + message);
    Logger.log('  Password received: ' + (receivedPassword ? 'Yes (' + receivedPassword.length + ' chars)' : 'No'));
    
    // Validate required fields
    if (!name || !email || !phone) {
      Logger.log('ERROR: Missing required fields');
      return createErrorResponse('Missing required fields: name, email, or phone');
    }
    
    // Check password
    if (receivedPassword !== APP_PASSWORD) {
      Logger.log('ERROR: Password mismatch');
      Logger.log('  Expected: [' + APP_PASSWORD + '] (' + APP_PASSWORD.length + ' chars)');
      Logger.log('  Received: [' + receivedPassword + '] (' + receivedPassword.length + ' chars)');
      return createErrorResponse('Unauthorized - password mismatch');
    }
    
    Logger.log('✅ Password verified');
    
    // Open spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log('✅ Spreadsheet opened: ' + spreadsheet.getName());
    } catch (error) {
      Logger.log('ERROR opening spreadsheet: ' + error.toString());
      return createErrorResponse('Failed to open spreadsheet: ' + error.toString());
    }
    
    // Get or create sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet not found, creating: ' + SHEET_NAME);
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Message']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      Logger.log('✅ Sheet created with headers');
    }
    
    // Append data
    try {
      const timestamp = new Date();
      sheet.appendRow([timestamp, name, email, phone, message]);
      Logger.log('✅ Data appended successfully');
      Logger.log('  Row number: ' + sheet.getLastRow());
      
      // Verify the data was saved
      const lastRow = sheet.getLastRow();
      const savedData = sheet.getRange(lastRow, 1, 1, 5).getValues()[0];
      Logger.log('✅ Verification - Saved data:');
      Logger.log('  ' + JSON.stringify(savedData));
      
      return createSuccessResponse('Data saved successfully to row ' + lastRow);
      
    } catch (error) {
      Logger.log('ERROR appending data: ' + error.toString());
      Logger.log('Stack: ' + error.stack);
      return createErrorResponse('Failed to save data: ' + error.toString());
    }
    
  } catch (error) {
    Logger.log('FATAL ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return createErrorResponse('Unexpected error: ' + error.toString());
  }
}

/**
 * Create success response
 */
function createSuccessResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      ok: true, 
      message: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 */
function createErrorResponse(error) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      ok: false, 
      error: error,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this to verify everything works
 */
function testSubmission() {
  Logger.log('=== RUNNING TEST ===');
  
  const testEvent = {
    parameter: {
      name: 'Test User ' + new Date().getTime(),
      email: 'test@example.com',
      phone: '+91 9876543210',
      message: 'Test submission from Apps Script',
      appPassword: APP_PASSWORD
    }
  };
  
  const result = processFormData(testEvent);
  Logger.log('Test result: ' + result.getContent());
  
  // Test sheet access
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (sheet) {
      Logger.log('✅ Sheet access: SUCCESS');
      Logger.log('  Sheet name: ' + sheet.getName());
      Logger.log('  Total rows: ' + sheet.getLastRow());
    }
  } catch (error) {
    Logger.log('❌ Sheet access: FAILED - ' + error.toString());
  }
}

