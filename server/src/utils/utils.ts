// formatWebScores is used to format the web scores.
export function formatWebScores(webData: any) {
  const web = [];
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
export function formatVRScores(vrData: any) {
  const vr = [];
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
