function calculateWait(tiles) {
  const waits = [];
  for (let i = 0; i < 34; i++) {
    if (tiles[i] >= 4) continue; // 4枚持ちの牌は待ちにならない

    // 牌を1枚増やして待ちになるかチェックする
    tiles[i]++;
    if (isWaiting(tiles)) {
      const waitTile = (Math.floor(i / 9) + 1) + ((i % 9) + 1) + ["m", "p", "s"][Math.floor(i / 9)];
      waits.push(waitTile);
    }
    tiles[i]--;
  }
  return waits;
}

function isWaiting(tiles) {
  for (let i = 0; i < 34; i++) {
    if (tiles[i] >= 2) { // 雀頭がある場合
      const copiedTiles = [...tiles];
      copiedTiles[i] -= 2;
      if (isMentsu(copiedTiles, 4)) {
        return true;
      }
    }
  }
  return false;
}

function isMentsu(tiles, numMentsu) {
  if (numMentsu === 0) return true;
  for (let i = 0; i < 34; i++) {
    if (tiles[i] >= 3) {
      const copiedTiles = [...tiles];
      copiedTiles[i] -= 3;
      if (isMentsu(copiedTiles, numMentsu - 1)) {
        return true;
      }
    }
    if (i <= 24 && i % 9 <= 6 && tiles[i] && tiles[i + 1] && tiles[i + 2]) {
      const copiedTiles = [...tiles];
      copiedTiles[i]--;
      copiedTiles[i + 1]--;
      copiedTiles[i + 2]--;
      if (isMentsu(copiedTiles, numMentsu - 1)) {
        return true;
      }
    }
  }
  return false;
}