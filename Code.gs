/**
 * ============================================================================
 * ASTRANEX DEFENCE — RECRUITMENT BACKEND (Google Apps Script)
 * Sheet: "Astranex Defence Candidate Applications"
 * Tab: "Candidate Applications"
 * ============================================================================
 * 
 * Column Mapping (Row 1 Headers):
 * 1. Application ID
 * 2. Timestamp
 * 3. Name
 * 4. Email
 * 5. Phone
 * 6. Location
 * 7. College
 * 8. Degree
 * 9. Graduation Year
 * 10. Engagement
 * 11. Primary Domain
 * 12. Secondary Domains
 * 13. LinkedIn
 * 14. GitHub
 * 15. Portfolio
 * 16. Hours Per Week
 * 17. Work Preference
 * 18. Start Date
 * 19. Long Term Interest
 * 20. Core Team Interest
 * 21. Project Name
 * 22. Project Link
 * 23. Project Description
 * 24. Technical Skills Summary
 * 25. Technical Score
 * 26. Application Status
 * 27. Reviewer Notes
 * 28. Raw Application Data
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire lock for up to 30 seconds to prevent race conditions during concurrent submissions
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
      // Initialize headers if new sheet
      var headers = [
        "Application ID", "Timestamp", "Name", "Email", "Phone", "Location",
        "College", "Degree", "Graduation Year", "Engagement", "Primary Domain",
        "Secondary Domains", "LinkedIn", "GitHub", "Portfolio", "Hours Per Week",
        "Work Preference", "Start Date", "Long Term Interest", "Core Team Interest",
        "Project Name", "Project Link", "Project Description",
        "Technical Skills Summary", "Technical Score", "Application Status",
        "Reviewer Notes", "Raw Application Data"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#080a0d").setFontColor("#ffffff");
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
      data.longTermInterest || "",                    // 19. Long Term Interest
      data.coreTeamInterest || "",                    // 20. Core Team Interest
      data.projectName || "",                         // 21. Project Name
      data.projectLink || "",                         // 22. Project Link
      data.projectDescription || data.projectBuilt || "", // 23. Project Description
      data.technicalSkillsSummary || "",              // 24. Technical Skills Summary
      data.technicalScore || "",                      // 25. Technical Score
      "NEW_SUBMISSION",                               // 26. Application Status
      "",                                             // 27. Reviewer Notes
      JSON.stringify(data)                            // 28. Raw Application Data
    ];

    sheet.appendRow(row);

    return createJsonResponse({
      success: true,
      applicationId: appId,
      message: "Application successfully submitted and recorded."
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
    service: "Astranex Defence Recruitment Gateway",
    timestamp: new Date().toISOString()
  });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
