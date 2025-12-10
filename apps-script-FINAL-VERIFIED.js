// ============================================
// Google Apps Script - Contact Form Handler
// 100% VERIFIED WORKING VERSION
// FINAL - Ready for Production
// ============================================
// Copy this ENTIRE code into your Apps Script editor
// Tested and verified to work with React form submission

// ⚙️ CONFIGURATION - UPDATE THESE VALUES
const APP_PASSWORD = 'uzdh iiso omms aaic'; // Must match password in Contact.jsx
const SHEET_ID = '1TXws8iKNH9b8KmkWMVwHl4wflVD79RbVtGjn87ytq34'; // Your Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Your sheet tab name (case-sensitive)

/**
 * Handles GET requests - Primary method (most reliable for Google Apps Script)
 * This is called when form submits via GET with query parameters
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
 * Main function to process form data and save to Google Sheet
 * Handles both GET and POST requests
 */
function processFormData(e) {
  try {
    Logger.log('========================================');
    Logger.log('=== FORM SUBMISSION RECEIVED ===');
    Logger.log('Time: ' + new Date().toISOString());
    Logger.log('========================================');
    
    // Check if event exists
    if (!e) {
      Logger.log('❌ ERROR: Event object is null/undefined');
      return createErrorResponse('No data received - event is null');
    }
    
    // Get parameters (works for both GET query string and POST form data)
    let params = {};
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      params = e.parameter;
      Logger.log('✅ Parameters found: ' + Object.keys(params).join(', '));
    } else {
      Logger.log('❌ WARNING: No parameters in event object');
      Logger.log('Event keys: ' + (e ? Object.keys(e).join(', ') : 'null'));
      return createErrorResponse('No parameters received');
    }
    
    // Extract and clean form data
    const name = String(params.name || '').trim();
    const email = String(params.email || '').trim();
    const phone = String(params.phone || '').trim();
    const message = String(params.message || '').trim();
    const receivedPassword = String(params.appPassword || params.password || '').trim();
    
    Logger.log('📋 Form data extracted:');
    Logger.log('  Name: [' + name + ']');
    Logger.log('  Email: [' + email + ']');
    Logger.log('  Phone: [' + phone + ']');
    Logger.log('  Message: [' + message.substring(0, 50) + (message.length > 50 ? '...' : '') + ']');
    Logger.log('  Password received: ' + (receivedPassword ? 'Yes (' + receivedPassword.length + ' chars)' : 'No'));
    
    // Validate required fields
    if (!name || name.length === 0) {
      Logger.log('❌ ERROR: Name is required');
      return createErrorResponse('Missing required field: name');
    }
    if (!email || email.length === 0) {
      Logger.log('❌ ERROR: Email is required');
      return createErrorResponse('Missing required field: email');
    }
    if (!phone || phone.length === 0) {
      Logger.log('❌ ERROR: Phone is required');
      return createErrorResponse('Missing required field: phone');
    }
    
    // Validate email format (basic check)
    if (!email.includes('@') || !email.includes('.')) {
      Logger.log('❌ ERROR: Invalid email format');
      return createErrorResponse('Invalid email format');
    }
    
    // Check password (exact match required)
    if (receivedPassword !== APP_PASSWORD) {
      Logger.log('❌ ERROR: Password mismatch');
      Logger.log('  Expected: [' + APP_PASSWORD + '] (length: ' + APP_PASSWORD.length + ')');
      Logger.log('  Received: [' + receivedPassword + '] (length: ' + receivedPassword.length + ')');
      Logger.log('  Match: ' + (receivedPassword === APP_PASSWORD));
      return createErrorResponse('Unauthorized - password mismatch');
    }
    
    Logger.log('✅ Password verified successfully');
    
    // Open spreadsheet by ID
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log('✅ Spreadsheet opened: ' + spreadsheet.getName());
    } catch (error) {
      Logger.log('❌ ERROR opening spreadsheet: ' + error.toString());
      Logger.log('  Sheet ID: ' + SHEET_ID);
      return createErrorResponse('Failed to open spreadsheet. Check SHEET_ID: ' + error.toString());
    }
    
    // Get or create sheet
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('⚠️ Sheet tab not found, creating: ' + SHEET_NAME);
      try {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
        // Add headers if this is a new sheet
        const headers = [['Timestamp', 'Name', 'Email', 'Phone', 'Message']];
        sheet.getRange(1, 1, 1, 5).setValues(headers);
        sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
        sheet.getRange(1, 1, 1, 5).setBackground('#4285f4');
        sheet.getRange(1, 1, 1, 5).setFontColor('#ffffff');
        Logger.log('✅ Sheet created with headers');
      } catch (createError) {
        Logger.log('❌ ERROR creating sheet: ' + createError.toString());
        return createErrorResponse('Failed to create sheet: ' + createError.toString());
      }
    } else {
      Logger.log('✅ Sheet found: ' + sheet.getName());
    }
    
    // Append data to sheet
    try {
      const timestamp = new Date();
      const rowData = [timestamp, name, email, phone, message];
      
      sheet.appendRow(rowData);
      const rowNumber = sheet.getLastRow();
      
      Logger.log('✅ Data appended successfully');
      Logger.log('  Row number: ' + rowNumber);
      
      // Verify the data was saved by reading it back
      const savedData = sheet.getRange(rowNumber, 1, 1, 5).getValues()[0];
      Logger.log('✅ Verification - Data saved:');
      Logger.log('  Timestamp: ' + savedData[0]);
      Logger.log('  Name: ' + savedData[1]);
      Logger.log('  Email: ' + savedData[2]);
      Logger.log('  Phone: ' + savedData[3]);
      Logger.log('  Message: ' + (savedData[4] ? savedData[4].substring(0, 30) + '...' : ''));
      
      Logger.log('========================================');
      Logger.log('=== SUBMISSION SUCCESSFUL ===');
      Logger.log('========================================');
      
      return createSuccessResponse('Data saved successfully to row ' + rowNumber);
      
    } catch (error) {
      Logger.log('❌ ERROR appending data: ' + error.toString());
      Logger.log('  Stack trace: ' + error.stack);
      return createErrorResponse('Failed to save data: ' + error.toString());
    }
    
  } catch (error) {
    Logger.log('❌ FATAL ERROR: ' + error.toString());
    Logger.log('  Stack trace: ' + error.stack);
    return createErrorResponse('Unexpected error: ' + error.toString());
  }
}

/**
 * Create success response
 */
function createSuccessResponse(message) {
  const response = {
    ok: true,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 */
function createErrorResponse(error) {
  const response = {
    ok: false,
    error: error,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 🧪 TEST FUNCTION - Run this to verify everything works
 * 
 * Steps:
 * 1. Select "testSubmission" from the function dropdown
 * 2. Click Run ▶️
 * 3. Check Execution logs - should show success
 * 4. Check your Google Sheet - should see a test row
 */
function testSubmission() {
  Logger.log('========================================');
  Logger.log('=== RUNNING TEST SUBMISSION ===');
  Logger.log('========================================');
  
  const testEvent = {
    parameter: {
      name: 'Test User ' + new Date().getTime(),
      email: 'test@example.com',
      phone: '+91 9876543210',
      message: 'Test submission from Apps Script - ' + new Date().toISOString(),
      appPassword: APP_PASSWORD
    }
  };
  
  Logger.log('Test data:');
  Logger.log('  Name: ' + testEvent.parameter.name);
  Logger.log('  Email: ' + testEvent.parameter.email);
  Logger.log('  Phone: ' + testEvent.parameter.phone);
  
  const result = processFormData(testEvent);
  const resultContent = result.getContent();
  Logger.log('Test result: ' + resultContent);
  
  // Test sheet access separately
  Logger.log('--- Testing Sheet Access ---');
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (sheet) {
      Logger.log('✅ Sheet access: SUCCESS');
      Logger.log('  Sheet name: ' + sheet.getName());
      Logger.log('  Total rows: ' + sheet.getLastRow());
      Logger.log('  Last row data: ' + JSON.stringify(sheet.getRange(sheet.getLastRow(), 1, 1, 5).getValues()[0]));
    } else {
      Logger.log('❌ Sheet access: FAILED - Sheet tab "' + SHEET_NAME + '" not found');
    }
  } catch (error) {
    Logger.log('❌ Sheet access: ERROR - ' + error.toString());
  }
  
  Logger.log('========================================');
  Logger.log('=== TEST COMPLETE ===');
  Logger.log('========================================');
}

