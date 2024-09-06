// formatWebScores is used to format the web scores.
export function formatWebScores(webData: any) {
  const web = [];
  if (webData?.web_reaction)
    web.push({
      title: "Play Identification",
      score: webData.web_playid,
      max: 100,
    });
  if (webData?.web_playid)
    web.push({
      title: "Reaction Time",
      score: webData.web_reaction,
      max: 100,
    });
  if (webData?.web_defense)
    web.push({
      title: "Defense Recognition",
      score: webData.web_defense,
      max: 100,
    });
  if (webData?.web_crit)
    web.push({
      title: "Critical Processing",
      score: webData.web_crit,
      max: 100,
    });

  return web;
}

// formatVRScores is used to format the VR scores.
export function formatVRScores(vrData: any) {
  const vr = [];
  if (vrData?.vr_reaction) {
    vr.push({
      title: "Play Identification",
      score: vrData.vr_playid,
      max: 100,
    });
  }

  if (vrData?.vr_playid) vr.push({ title: "Reaction Time", score: vrData.vr_reaction, max: 100 });

  if (vrData?.vr_defense) vr.push({ title: "Defense Recognition", score: vrData.vr_defense, max: 100 });
  if (vrData?.vr_crit) vr.push({ title: "Critical Processing", score: vrData.vr_crit, max: 100 });

  return vr;
}
