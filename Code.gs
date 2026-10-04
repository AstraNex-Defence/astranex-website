/**
 * ============================================================================
 * ASTRANEX DEFENCE — TECHNICAL RECRUITMENT REGISTRY & DESIGNER
 * Professional Defence-Tech Design & Auto-Formatting
 * Spreadsheet: "Astranex Defence Candidate Applications"
 * Tab: "Candidate Applications"
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return createJsonResponse({ success: false, message: "No post data received" }, 400);
    }

    var data = JSON.parse(rawData);
    var sheetName = "Candidate Applications";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Format & initialize header if fresh
    if (sheet.getLastRow() === 0) {
      formatCandidateRegistry();
    }

    // Generate unique Application ID: AXD-YYYY-XXXX
    var now = new Date();
    var year = now.getFullYear();
    var randomCode = Math.floor(1000 + Math.random() * 9000);
    var appId = "AXD-" + year + "-" + randomCode;
    var formattedTimestamp = Utilities.formatDate(now, Session.getScriptTimeZone() || "GMT+5:30", "yyyy-MM-dd HH:mm:ss");

    var primaryDomain = data.primaryDomain || (data.selectedDomains && data.selectedDomains[0]) || "";
    var secondaryDomains = Array.isArray(data.secondaryDomains) 
      ? data.secondaryDomains.join(", ") 
      : (data.selectedDomains && data.selectedDomains.length > 1 ? data.selectedDomains.slice(1).join(", ") : "");

    var commitmentInfo = [
      "Long-Term: " + (data.longTermInterest || "N/A"),
      "Ownership: " + (data.coreTeamInterest || "N/A"),
      "Unpaid Agreement: " + (data.unpaidAcknowledgement || "Yes")
    ].join(" | ");

    var row = [
      appId,                                          // A: Application ID
      formattedTimestamp,                             // B: Timestamp
      data.name || data.fullName || "",               // C: Name
      data.email || "",                               // D: Email
      data.phone || "",                               // E: Phone
      data.location || "",                            // F: Location
      data.college || "",                             // G: College
      data.degree || "",                              // H: Degree
      data.graduationYear || "",                      // I: Graduation Year
      data.engagement || "",                          // J: Engagement
      primaryDomain,                                  // K: Primary Domain
      secondaryDomains,                               // L: Secondary Domains
      data.linkedin || "",                            // M: LinkedIn
      data.github || "",                              // N: GitHub
      data.portfolio || "",                           // O: Portfolio
      data.hoursPerWeek || "",                        // P: Hours Per Week
      data.workPreference || "",                      // Q: Work Preference
      data.startDate || "",                           // R: Start Date
      commitmentInfo,                                 // S: Long Term & Core Commitment
      data.projectName || "",                         // T: Project Name
      data.projectLink || "",                         // U: Project Link
      data.projectDescription || data.projectBuilt || "", // V: Project Deep Dive
      data.technicalSkillsSummary || "",              // W: Technical Skills Summary
      data.technicalScore || "",                      // X: Technical Score
      "NEW_SUBMISSION"                                // Y: Application Status
    ];

    sheet.appendRow(row);
    var newRowIdx = sheet.getLastRow();

    // Style the new row for executive readability
    var rowRange = sheet.getRange(newRowIdx, 1, 1, 25);
    rowRange.setVerticalAlignment("middle").setFontFamily("Arial").setFontSize(10);
    
    // Monospace bold green for Application ID
    sheet.getRange(newRowIdx, 1).setFontFamily("Courier New").setFontWeight("bold").setFontColor("#059669").setHorizontalAlignment("center");
    // Subtle timestamp
    sheet.getRange(newRowIdx, 2).setFontSize(9).setFontColor("#64748B").setHorizontalAlignment("center");
    // Bold Name
    sheet.getRange(newRowIdx, 3).setFontWeight("bold").setFontColor("#0F172A");
    // Centered numeric/status tags
    sheet.getRange(newRowIdx, 5).setHorizontalAlignment("center"); // Phone
    sheet.getRange(newRowIdx, 9).setHorizontalAlignment("center"); // Grad Year
    sheet.getRange(newRowIdx, 10).setFontWeight("bold").setHorizontalAlignment("center"); // Engagement
    sheet.getRange(newRowIdx, 16).setHorizontalAlignment("center"); // Hours
    sheet.getRange(newRowIdx, 17).setHorizontalAlignment("center"); // Preference
    sheet.getRange(newRowIdx, 18).setHorizontalAlignment("center"); // Start Date
    
    // Deep dive & skills text wrapping
    sheet.getRange(newRowIdx, 22).setWrap(true);
    sheet.getRange(newRowIdx, 23).setWrap(true).setFontFamily("Courier New").setFontSize(9);
    
    // Technical Score Highlight pill
    sheet.getRange(newRowIdx, 24).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#ECFDF5").setFontColor("#047857");
    
    // Status Pill
    sheet.getRange(newRowIdx, 25).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#EFF6FF").setFontColor("#1D4ED8");

    // Alternate background row colors
    if (newRowIdx % 2 === 0) {
      rowRange.setBackground("#F8FAFC");
      sheet.getRange(newRowIdx, 24).setBackground("#D1FAE5");
      sheet.getRange(newRowIdx, 25).setBackground("#DBEAFE");
    }

    return createJsonResponse({
      success: true,
      applicationId: appId,
      message: "Application recorded successfully in designed registry."
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString(),
      message: "Server error processing application."
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * ONE-CLICK PROFESSIONAL SHEET STYLER
 * Run this function directly from Apps Script editor to format the entire sheet!
 * ============================================================================
 */
function formatCandidateRegistry() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Candidate Applications") || ss.getActiveSheet();
  sheet.setName("Candidate Applications");

  var headers = [
    "Application ID", "Timestamp", "Candidate Name", "Email Address", "Phone",
    "Location", "College / University", "Degree / Major", "Grad Year", "Engagement",
    "Primary Domain", "Secondary Domains", "LinkedIn", "GitHub", "Portfolio",
    "Hours / Wk", "Work Mode", "Start Date", "Long-Term & Subsystem Commitment",
    "Strongest Project Title", "Project Link", "Project Technical Deep Dive",
    "Technical Skills Breakdown", "Technical Score", "Status"
  ];

  // Set headers
  sheet.getRange(1, 1, 1, 25).setValues([headers]);

  // Set Row Heights
  sheet.setRowHeight(1, 46);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3); // Keep App ID, Timestamp, Name visible while scrolling

  // Style Header Row: Modern Dark Defence Theme
  var headerRange = sheet.getRange(1, 1, 1, 25);
  headerRange.setFontFamily("Arial")
             .setFontSize(10)
             .setFontWeight("bold")
             .setBackground("#0B0F19")
             .setFontColor("#F8FAFC")
             .setVerticalAlignment("middle")
             .setHorizontalAlignment("center");

  // Left-align text headers for readability
  sheet.getRange("C1:D1").setHorizontalAlignment("left");
  sheet.getRange("F1:H1").setHorizontalAlignment("left");
  sheet.getRange("K1:L1").setHorizontalAlignment("left");
  sheet.getRange("T1:W1").setHorizontalAlignment("left");

  // Precise Column Widths
  var colWidths = {
    1: 155,  // A: App ID
    2: 155,  // B: Timestamp
    3: 180,  // C: Name
    4: 220,  // D: Email
    5: 135,  // E: Phone
    6: 150,  // F: Location
    7: 190,  // G: College
    8: 165,  // H: Degree
    9: 100,  // I: Grad Year
    10: 160, // J: Engagement
    11: 195, // K: Primary Domain
    12: 210, // L: Secondary Domains
    13: 130, // M: LinkedIn
    14: 130, // N: GitHub
    15: 130, // O: Portfolio
    16: 110, // P: Hours/Wk
    17: 120, // Q: Work Mode
    18: 110, // R: Start Date
    19: 250, // S: Commitment
    20: 220, // T: Project Title
    21: 150, // U: Project Link
    22: 340, // V: Deep Dive
    23: 320, // W: Skills Summary
    24: 130, // X: Technical Score
    25: 145  // Y: Status
  };

  for (var col in colWidths) {
    sheet.setColumnWidth(parseInt(col), colWidths[col]);
  }

  // Format existing data rows if present
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, 25);
    dataRange.setFontFamily("Arial").setFontSize(10).setVerticalAlignment("middle");

    // Monospace & Alignment
    sheet.getRange(2, 1, lastRow - 1, 1).setFontFamily("Courier New").setFontWeight("bold").setFontColor("#059669").setHorizontalAlignment("center");
    sheet.getRange(2, 2, lastRow - 1, 1).setFontSize(9).setFontColor("#64748B").setHorizontalAlignment("center");
    sheet.getRange(2, 3, lastRow - 1, 1).setFontWeight("bold").setFontColor("#0F172A");
    sheet.getRange(2, 22, lastRow - 1, 1).setWrap(true);
    sheet.getRange(2, 23, lastRow - 1, 1).setWrap(true).setFontFamily("Courier New").setFontSize(9);
    sheet.getRange(2, 24, lastRow - 1, 1).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#ECFDF5").setFontColor("#047857");
    sheet.getRange(2, 25, lastRow - 1, 1).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#EFF6FF").setFontColor("#1D4ED8");
  }

  Logger.log("Astranex Candidate Registry styled successfully.");
}

function doGet(e) {
  return createJsonResponse({
    status: "ACTIVE",
    service: "Astranex Defence Technical Recruitment Gateway",
    columns: 25,
    timestamp: new Date().toISOString()
  });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
