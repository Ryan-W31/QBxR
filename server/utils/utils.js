// Utility functions for formatting data
const jwt = require("jsonwebtoken");
var postmark = require("postmark");
var pmClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// formatWebScores is used to format the web scores.
function formatWebScores(webData) {
  web = [];
  if (webData?.web_reaction)
    web.push({
      title: "Reaction Test",
      score: webData.web_reaction,
    });
  if (webData?.web_playid)
    web.push({
      title: "Play Identification",
      score: webData.web_playid,
    });
  if (webData?.web_defense)
    web.push({
      title: "Defense Reading",
      score: webData.web_defense,
    });
  if (webData?.web_crit)
    web.push({
      title: "Critical Thinking",
      score: webData.web_crit,
    });

  return web;
}

// formatVRScores is used to format the VR scores.
function formatVRScores(vrData) {
  vr = [];
  if (vrData?.vr_reaction)
    vr.push({ title: "Reaction Test", score: vrData.vr_reaction });
  if (vrData?.vr_playid)
    vr.push({
      title: "Play Identification",
      score: vrData.vr_playid,
    });
  if (vrData?.vr_defense)
    vr.push({ title: "Defense Reading", score: vrData.vr_defense });
  if (vrData?.vr_crit)
    vr.push({ title: "Critical Thinking", score: vrData.vr_crit });

  return vr;
}

function sendEmail(email, subject, token) {
  if (!email) return;
  if (!subject) return;
  if (!token) return;

  if (subject === 1) {
    pmClient
      .sendEmail({
        From: "no-reply@qbxr.net",
        To: email,
        Subject: "QBxR Email Verification",
        HtmlBody: `<html style="background-color:#0C0C0C">
  <body style="text-align:center">
    <p style="color:#EEEEEE;">Please click the button below to verify your email: </p>
    <a href="http://localhost/verify/${token}" style="background-color:#1FB622;padding-left:1.5rem;padding-right:1.5rem;padding-top:0.5rem;padding-bottom:0.5rem;border-radius:9999px;color:#EEEEEE;text-decoration:none">Verify</a>
  </body>
</html>`,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  } else if (subject === 2) {
    pmClient
      .sendEmail({
        From: "no-reply@qbxr.net",
        To: email,
        Subject: "QBxR Password Reset",
        TextBody: `Please click the following link to reset your password: Reset`,
        HtmlBody: `<p>Please click the following link to reset your password: <a href="http://localhost/reset/${token}">Reset</a></p>`,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = { formatWebScores, formatVRScores, sendEmail };
