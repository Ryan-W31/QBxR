// formatWebScores is used to format the web scores.
export function formatWebScores(webData: any) {
  const web = [];
  const web1 = webData?.web_crit;
  const web2 = webData?.web_defense;
  const web3 = webData?.web_playid;
  if (web1)
    web.push({
      title: "Critical Thinking",
      score: webData.web_crit,
      max: 100,
    });
  if (web2)
    web.push({
      title: "Defensive Reading",
      score: webData.web_defense,
      max: 100,
    });
  if (web3)
    web.push({
      title: "Play Recognition",
      score: webData.web_playid,
      max: 100,
    });

  if (web1 || web2 || web3) {
    if (!web1) {
      web.push({ title: "Critical Thinking", score: 0, max: 100 });
    }
    if (!web2) {
      web.push({ title: "Defensive Reading", score: 0, max: 100 });
    }
    if (!web3) {
      web.push({ title: "Play Recognition", score: 0, max: 100 });
    }
  }

  return web;
}

// formatVRScores is used to format the VR scores.
export function formatVRScores(vrData: any) {
  const vr = [];
  const vr1 = vrData?.vr_difficulty_1;
  const vr2 = vrData?.vr_difficulty_2;
  const vr3 = vrData?.vr_difficulty_3;
  if (vr1) {
    vr.push({
      title: "Easy",
      score: vrData.vr_difficulty_1 * 100,
      max: 100,
    });
  }

  if (vr2) {
    vr.push({ title: "Medium", score: vrData.vr_difficulty_2 * 100, max: 100 });
  }

  if (vr3) {
    vr.push({ title: "Hard", score: vrData.vr_difficulty_3 * 100, max: 100 });
  }

  if (vr1 || vr2 || vr3) {
    if (!vr1) {
      vr.push({ title: "Easy", score: 0, max: 100 });
    }
    if (!vr2) {
      vr.push({ title: "Medium", score: 0, max: 100 });
    }
    if (!vr3) {
      vr.push({ title: "Hard", score: 0, max: 100 });
    }
  }
  return vr;
}
