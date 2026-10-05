/**
 * ============================================================================
 * ASTRANEX DEFENCE — TECHNICAL RECRUITMENT BACKEND (26 EXACT HEADERS)
 * Spreadsheet: "Astranex Defence Candidate Applications"
 * Tab: "Candidate Applications"
 * ============================================================================
 * 
 * Column Mapping (A to Z):
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
 * 16. Resume / CV
 * 17. Hours Per Week
 * 18. Work Preference
 * 19. Start Date
 * 20. Long Term Interest
 * 21. Core Team Interest
 * 22. Project Name
 * 23. Project Link
 * 24. Project Description
 * 25. Technical Skills Summary
 * 26. Technical Score
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

    // Generate unique Application ID: AXD-YYYY-XXXX
    var now = new Date();
    var year = now.getFullYear();
    var randomCode = Math.floor(1000 + Math.random() * 9000);
    var appId = "AXD-" + year + "-" + randomCode;
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone() || "GMT+5:30", "yyyy-MM-dd HH:mm:ss");

    var primaryDomain = data.primaryDomain || (data.selectedDomains && data.selectedDomains[0]) || "";
    var secondaryDomains = Array.isArray(data.secondaryDomains) 
      ? data.secondaryDomains.join(", ") 
      : (data.selectedDomains && data.selectedDomains.length > 1 ? data.selectedDomains.slice(1).join(", ") : "");

    // Key-value map of candidate data for header matching
    var fieldMap = {
      "application id": appId,
      "timestamp": timestamp,
      "name": data.name || data.fullName || "",
      "full name": data.name || data.fullName || "",
      "candidate name": data.name || data.fullName || "",
      "email": data.email || "",
      "email address": data.email || "",
      "phone": data.phone || "",
      "phone number": data.phone || "",
      "location": data.location || "",
      "current location": data.location || "",
      "college": data.college || "",
      "college / university": data.college || "",
      "degree": data.degree || "",
      "degree / major": data.degree || "",
      "graduation year": data.graduationYear || "",
      "grad year": data.graduationYear || "",
      "engagement": data.engagement || "",
      "primary domain": primaryDomain,
      "secondary domains": secondaryDomains,
      "linkedin": data.linkedin || "",
      "github": data.github || "",
      "portfolio": data.portfolio || "",
      "resume": data.resume || data.resumeUrl || "",
      "resume / cv": data.resume || data.resumeUrl || "",
      "cv": data.resume || data.resumeUrl || "",
      "resume link": data.resume || data.resumeUrl || "",
      "hours per week": data.hoursPerWeek || "",
      "hours / week": data.hoursPerWeek || "",
      "hours / wk": data.hoursPerWeek || "",
      "work preference": data.workPreference || "",
      "work mode": data.workPreference || "",
      "start date": data.startDate || "",
      "earliest start date": data.startDate || "",
      "long term interest": data.longTermInterest || "N/A",
      "core team interest": data.coreTeamInterest || "N/A",
      "project name": data.projectName || "",
      "strongest project": data.projectName || "",
      "project link": data.projectLink || "",
      "project description": data.projectDescription || data.projectBuilt || "",
      "project technical deep dive": data.projectDescription || data.projectBuilt || "",
      "technical skills summary": data.technicalSkillsSummary || "",
      "technical skills breakdown": data.technicalSkillsSummary || "",
      "technical score": data.technicalScore || ""
    };

    var lastCol = sheet.getLastColumn();
    var row = [];

    if (lastCol > 0) {
      // Map data according to exact headers in row 1
      var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      for (var i = 0; i < headers.length; i++) {
        var headerKey = (headers[i] || "").toString().trim().toLowerCase();
        if (fieldMap.hasOwnProperty(headerKey)) {
          row.push(fieldMap[headerKey]);
        } else {
          var matched = false;
          for (var key in fieldMap) {
            if (headerKey.indexOf(key) !== -1 || key.indexOf(headerKey) !== -1) {
              row.push(fieldMap[key]);
              matched = true;
              break;
            }
          }
          if (!matched) row.push("");
        }
      }
    } else {
      // Fallback default row
      row = [
        appId, timestamp, data.name || data.fullName || "", data.email || "", data.phone || "",
        data.location || "", data.college || "", data.degree || "", data.graduationYear || "",
        data.engagement || "", primaryDomain, secondaryDomains, data.linkedin || "",
        data.github || "", data.portfolio || "", data.resume || data.resumeUrl || "",
        data.hoursPerWeek || "", data.workPreference || "", data.startDate || "",
        data.longTermInterest || "N/A", data.coreTeamInterest || "N/A", data.projectName || "",
        data.projectLink || "", data.projectDescription || data.projectBuilt || "",
        data.technicalSkillsSummary || "", data.technicalScore || ""
      ];
    }

    sheet.appendRow(row);

    return createJsonResponse({
      success: true,
      applicationId: appId,
      message: "Application submitted successfully."
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString(),
      message: "Server error recording application."
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({
    status: "ACTIVE",
    service: "Astranex Recruitment Gateway",
    timestamp: new Date().toISOString()
  });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
