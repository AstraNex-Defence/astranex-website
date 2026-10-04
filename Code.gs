/**
 * ============================================================================
 * ASTRANEX DEFENCE — TECHNICAL RECRUITMENT REGISTRY (GREEN HEADER THEME)
 * Green Header (#00D26A / #10B981) + Bold Black Text + Smart Column Sizing
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

    // Auto-format on first run if headers not styled
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
      "Subsystem Ownership: " + (data.coreTeamInterest || "N/A"),
      "Unpaid Terms: " + (data.unpaidAcknowledgement || "Yes")
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

    // Style the new data row
    var rowRange = sheet.getRange(newRowIdx, 1, 1, 25);
    rowRange.setVerticalAlignment("middle").setFontFamily("Arial").setFontSize(10);
    
    // Application ID styling: Bold Monospace
    sheet.getRange(newRowIdx, 1).setFontFamily("Courier New").setFontWeight("bold").setFontColor("#059669").setHorizontalAlignment("center");
    // Timestamp
    sheet.getRange(newRowIdx, 2).setFontSize(9).setFontColor("#64748B").setHorizontalAlignment("center");
    // Candidate Name
    sheet.getRange(newRowIdx, 3).setFontWeight("bold").setFontColor("#0F172A");
    
    // Centered metadata
    sheet.getRange(newRowIdx, 5).setHorizontalAlignment("center"); // Phone
    sheet.getRange(newRowIdx, 9).setHorizontalAlignment("center"); // Grad Year
    sheet.getRange(newRowIdx, 10).setFontWeight("bold").setHorizontalAlignment("center"); // Engagement
    sheet.getRange(newRowIdx, 16).setHorizontalAlignment("center"); // Hours
    sheet.getRange(newRowIdx, 17).setHorizontalAlignment("center"); // Work Preference
    sheet.getRange(newRowIdx, 18).setHorizontalAlignment("center"); // Start Date
    
    // Enable Text Wrapping for long text columns
    sheet.getRange(newRowIdx, 19).setWrap(true); // Commitment
    sheet.getRange(newRowIdx, 20).setWrap(true); // Project Title
    sheet.getRange(newRowIdx, 22).setWrap(true); // Deep Dive (Long text)
    sheet.getRange(newRowIdx, 23).setWrap(true).setFontFamily("Courier New").setFontSize(9); // Skills
    
    // Technical Score Highlight pill
    sheet.getRange(newRowIdx, 24).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#ECFDF5").setFontColor("#047857");
    
    // Status Tag
    sheet.getRange(newRowIdx, 25).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#EFF6FF").setFontColor("#1D4ED8");

    // Alternating soft zebra row colors
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
 * ONE-CLICK PROFESSIONAL SHEET STYLER (GREEN HEADER + PROPORTIONAL SPACING)
 * Run this function in Apps Script to instantly apply the new design!
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
    "Hours / Wk", "Work Mode", "Start Date", "Long-Term & Core Commitment",
    "Strongest Project Title", "Project Link", "Project Technical Deep Dive",
    "Technical Skills Breakdown", "Technical Score", "Status"
  ];

  // Set header values
  sheet.getRange(1, 1, 1, 25).setValues([headers]);

  // Freeze Row 1 and Columns A-C (Application ID, Timestamp, Candidate Name)
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3);

  // Header Row Design: Vibrant Defence Green Background (#00D26A) + Bold Black Text (#000000)
  var headerRange = sheet.getRange(1, 1, 1, 25);
  headerRange.setFontFamily("Arial")
             .setFontSize(11)
             .setFontWeight("bold")
             .setBackground("#00D26A")
             .setFontColor("#000000")
             .setVerticalAlignment("middle")
             .setHorizontalAlignment("center");
  sheet.setRowHeight(1, 48);

  // Left-align text headers for readability
  sheet.getRange("C1:D1").setHorizontalAlignment("left");
  sheet.getRange("F1:H1").setHorizontalAlignment("left");
  sheet.getRange("K1:L1").setHorizontalAlignment("left");
  sheet.getRange("S1:W1").setHorizontalAlignment("left");

  // Proportional Column Widths (Long-text columns get generous space)
  var colWidths = {
    1: 160,  // A: Application ID
    2: 160,  // B: Timestamp
    3: 200,  // C: Candidate Name
    4: 240,  // D: Email Address
    5: 140,  // E: Phone
    6: 160,  // F: Location
    7: 220,  // G: College / University
    8: 180,  // H: Degree / Major
    9: 110,  // I: Grad Year
    10: 165, // J: Engagement
    11: 210, // K: Primary Domain
    12: 250, // L: Secondary Domains
    13: 140, // M: LinkedIn
    14: 140, // N: GitHub
    15: 140, // O: Portfolio
    16: 120, // P: Hours / Wk
    17: 130, // Q: Work Mode
    18: 120, // R: Start Date
    19: 280, // S: Long-Term & Core Commitment (Generous space)
    20: 250, // T: Strongest Project Title (Generous space)
    21: 160, // U: Project Link
    22: 420, // V: Project Technical Deep Dive (Extra-wide for long descriptions)
    23: 380, // W: Technical Skills Breakdown (Extra-wide for skill ratings)
    24: 140, // X: Technical Score
    25: 150  // Y: Status
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
    
    // Enable wrapping for long text
    sheet.getRange(2, 19, lastRow - 1, 1).setWrap(true);
    sheet.getRange(2, 20, lastRow - 1, 1).setWrap(true);
    sheet.getRange(2, 22, lastRow - 1, 1).setWrap(true);
    sheet.getRange(2, 23, lastRow - 1, 1).setWrap(true).setFontFamily("Courier New").setFontSize(9);
    
    // Highlight badges
    sheet.getRange(2, 24, lastRow - 1, 1).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#ECFDF5").setFontColor("#047857");
    sheet.getRange(2, 25, lastRow - 1, 1).setFontWeight("bold").setHorizontalAlignment("center").setBackground("#EFF6FF").setFontColor("#1D4ED8");
  }

  Logger.log("Astranex Candidate Registry: Green Header & Proportional Sizing Applied Successfully.");
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
