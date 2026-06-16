// Einfaches 3x3-Grid als Demo-Datenbasis
// Du kannst das später durch deine echten Prime/PI/TIME-Grids ersetzen.
const GRID = [
  [2, 3, 5],
  [7, 11, 13],
  [17, 19, 23]
];

const BORG = {
  SET: {
    dir: "lr", // lr, rl, tb, bt, diag, anti, spiral

    read(grid) {
      switch (this.dir) {
        case "lr":   return this.leftToRight(grid);
        case "rl":   return this.rightToLeft(grid);
        case "tb":   return this.topToBottom(grid);
        case "bt":   return this.bottomToTop(grid);
        case "diag": return this.diagonal(grid);
        case "anti": return this.antiDiagonal(grid);
        case "spiral": return this.spiral(grid);
        default:     return this.leftToRight(grid);
      }
    },

    leftToRight(grid) {
      return grid.flat();
    },

    rightToLeft(grid) {
      return grid.map(r => r.slice().reverse()).flat();
    },

    topToBottom(grid) {
      return grid.map(r => r[0]);
    },

    bottomToTop(grid) {
      return grid.map(r => r[0]).reverse();
    },

    diagonal(grid) {
      return [grid[0][0], grid[1][1], grid[2][2]];
    },

    antiDiagonal(grid) {
      return [grid[0][2], grid[1][1], grid[2][0]];
    },

    spiral(grid) {
      return [
        grid[0][0], grid[0][1], grid[0][2],
        grid[1][2], grid[2][2], grid[2][1],
        grid[2][0], grid[1][0], grid[1][1]
      ];
    }
  },

  REC: {
    // einfache Mutation: Wert * (Index+1)
    mutate(arr) {
      return arr.map((v, i) => v * (i + 1));
    }
  },

  WRT: {
    render2x2(leftArr, rightArr, shadowArr) {
      const leftEl = document.getElementById("left");
      const rightEl = document.getElementById("right");
      const shadowEl = document.getElementById("shadow");

      if (leftEl)  leftEl.textContent  = "Würfel A: " + leftArr.join(", ");
      if (rightEl) rightEl.textContent = "Würfel B: " + rightArr.join(", ");
      if (shadowEl) shadowEl.textContent =
        "Dunkelkammer:\n" + shadowArr.join(" | ");
    },

    renderList(targetId, data) {
      const el = document.getElementById(targetId);
      if (!el) return;
      el.textContent = JSON.stringify(data, null, 2);
    }
  },

  PAGE: {
    index() {
      // Index: nur zeigen, welche Richtungen es gibt
      console.log("BORG INDEX – Richtungen:", [
        "lr", "rl", "tb", "bt", "diag", "anti", "spiral"
      ]);
    },

    run() {
      // RUN: 2x2 + Dunkelkammer
      // Beispiel: spiral lesen + mutieren
      BORG.SET.dir = "spiral";
      const raw = BORG.SET.read(GRID);
      const mut = BORG.REC.mutate(raw);

      const left  = mut.slice(0, 4);
      const right = mut.slice(4, 8);
      const shadow = mut;

      BORG.WRT.render2x2(left, right, shadow);
    },

    list() {
      // LIST: verschiedene Richtungen nebeneinander zeigen
      const dirs = ["lr", "rl", "tb", "bt", "diag", "anti", "spiral"];
      const out = {};

      dirs.forEach(d => {
        BORG.SET.dir = d;
        out[d] = {
          raw: BORG.SET.read(GRID),
          mut: BORG.REC.mutate(BORG.SET.read(GRID))
        };
      });

      BORG.WRT.renderList("out", out);
    }
  }
};

