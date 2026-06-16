let UIME = null;

fetch("borg.yml")
  .then(r => r.text())
  .then(t => {
    const m = t.match(/uime:\s*"([^"]+)"/);
    if (m) UIME = m[1];
  });
