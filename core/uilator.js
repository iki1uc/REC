const UILATOR = {
  // UI-Status
  mode: "idle",   // idle, run, list
  zone: "none",   // left, right, shadow

  // UI-Impulse aus play.yml
  async loadPlay() {
    const r = await fetch("statik.yml?rev=" + Math.random());
    const txt = await r.text();
    console.log("UILATOR play.yml:", txt);
    return txt;
  },

  // UI-Impulse aus REC
  async loadREC() {
    const r = await fetch("REC/rec.yml");
    const txt = await r.text();
    console.log("UILATOR REC:", txt);
    return txt;
  },

  // UI-Manipulation: Zonen setzen
  setZone(z) {
    this.zone = z;
    console.log("UILATOR Zone:", z);
  },

  // UI-Manipulation: Ausgabe in Zone schreiben
  write(z, msg) {
    const el = document.getElementById(z);
    if (el) el.textContent = msg;
  },

  // UI-Manipulation: 2x2 + Shadow
  render2x2(left, right, shadow) {
    this.write("left",  "A: " + left.join(", "));
    this.write("right", "B: " + right.join(", "));
    this.write("shadow", shadow.join(" | "));
  }
};
