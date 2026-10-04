/**
 * ============================================================================
 * ASTRANEX DEFENCE — TECHNICAL RECRUITMENT BACKEND (25-COLUMN SCHEMA)
 * Spreadsheet: "Astranex Defence Candidate Applications"
 * Tab: "Candidate Applications"
 * ============================================================================
 * 
 * 25 Column Schema (A to Y):
 * 1.  Application ID
 * 2.  Timestamp
 * 3.  Name
 * 4.  Email
 * 5.  Phone
 * 6.  Location
 * 7.  College
 * 8.  Degree
 * 9.  Graduation Year
 * 10. Engagement
 * 11. Primary Domain
 * 12. Secondary Domains
 * 13. LinkedIn
 * 14. GitHub
 * 15. Portfolio
 * 16. Hours Per Week
 * 17. Work Preference
 * 18. Start Date
 * 19. Long Term & Core Commitment
 * 20. Project Name
 * 21. Project Link
 * 22. Project Deep Dive
 * 23. Technical Skills Summary
 * 24. Technical Score
 * 25. Application Status
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

    var headers = [
      "Application ID", "Timestamp", "Name", "Email", "Phone", "Location",
      "College", "Degree", "Graduation Year", "Engagement", "Primary Domain",
      "Secondary Domains", "LinkedIn", "GitHub", "Portfolio", "Hours Per Week",
      "Work Preference", "Start Date", "Long Term & Core Commitment", "Project Name",
      "Project Link", "Project Deep Dive", "Technical Skills Summary", "Technical Score",
      "Application Status"
    ];

    // Initialize or re-header if new sheet
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    // Freeze top row and columns A-C for optimal readability
    sheet.setFrozenRows(1);
    sheet.setFrozenColumns(3);

    // Style Header Row
    var headerRange = sheet.getRange(1, 1, 1, 25);
    headerRange.setFontWeight("bold")
               .setBackground("#0d1117")
               .setFontColor("#58a6ff")
               .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 38);

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
      appId,                                          // 1. Application ID
      formattedTimestamp,                             // 2. Timestamp
      data.name || data.fullName || "",               // 3. Name
      data.email || "",                               // 4. Email
      data.phone || "",                               // 5. Phone
      data.location || "",                            // 6. Location
      data.college || "",                             // 7. College
      data.degree || "",                              // 8. Degree
      data.graduationYear || "",                      // 9. Graduation Year
      data.engagement || "",                          // 10. Engagement
      primaryDomain,                                  // 11. Primary Domain
      secondaryDomains,                               // 12. Secondary Domains
      data.linkedin || "",                            // 13. LinkedIn
      data.github || "",                              // 14. GitHub
      data.portfolio || "",                           // 15. Portfolio
      data.hoursPerWeek || "",                        // 16. Hours Per Week
      data.workPreference || "",                      // 17. Work Preference
      data.startDate || "",                           // 18. Start Date
      commitmentInfo,                                 // 19. Long Term & Core Commitment
      data.projectName || "",                         // 20. Project Name
      data.projectLink || "",                         // 21. Project Link
      data.projectDescription || data.projectBuilt || "", // 22. Project Deep Dive
      data.technicalSkillsSummary || "",              // 23. Technical Skills Summary
      data.technicalScore || "",                      // 24. Technical Score
      "NEW_SUBMISSION"                                // 25. Application Status
    ];

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 25).setVerticalAlignment("top");

    return createJsonResponse({
      success: true,
      applicationId: appId,
      message: "Application recorded successfully in 25-column registry."
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
