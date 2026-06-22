CODE:
  read    = BORG.SET.read(GRID)
  mutate  = BORG.REC.mutate(read)
  shadow  = mutate
  era     = ERA.lauf(mutate)
  output  = WRT.render(shadow, era)

