module.exports = function SkipWastefulWay(mod) {
  function getLoc() {
    switch (mod.game.me.zone) {
      case 9781:
      case 9981:
        return { x: 44354.1171875, y: -126485.703125, z: 16788.150390625 }
      case 9782:
      case 9982:
        return { x: -104840.2109375, y: 144813.9375, z: 7035.11669921875 }
      case 9044:
        return { x: -94590.7578125, y: 99595.5, z: 4362.17236328125 }
      default:
        return null
    }
  }

  function tp(location) {
    mod.send('S_INSTANT_MOVE', 3, {
      gameId: mod.game.me.gameId,
      loc: location
    })
  }

  let loc, lastLoc
  mod.hook('C_PLAYER_LOCATION', 5, event => { loc = event.loc })

  mod.game.me.on('change_zone', () => { lastLoc = null })

  mod.command.add('skip', {
    $default() {
      if (getLoc()) {
        lastLoc = loc
        tp(getLoc())
      } else {
        mod.command.message('no support zone.')
      }
    },
    revert() {
      if (lastLoc)
        tp(lastLoc)
    }
  })
}