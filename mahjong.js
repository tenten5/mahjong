function calculateWait(tiles) {
  const waits = [];
  for (let i = 0; i < 34; i++) {
    if (tiles[i] >= 4) continue; // 4枚持ちの牌は待ちにならない

    // 牌を1枚増やして待ちになるかチェックする
    tiles[i]++;
    if (isWaiting(tiles)) {
      const waitTile = ((i % 9) + 1) + ["m", "p", "s", "z"][Math.floor(i / 9)];
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

// 牌姿自動生成
function generateRandomTiles() {
  const tiles = new Array(34).fill(0);
  let total = 9 * 4; 
  for (let i = 0; i < 13; i++) {
    let index = Math.floor(Math.random() * total);
    for (let j = 0; j < 34; j++) {
      if( index + tiles[j] < 4 ){
        tiles[j]++;
        break;
      }
      index = index - 4 + tiles[j];
    }
    total--;
  }

  return tiles;
}

function generateRandomTenpai() {
  let tiles;
  do {
    tiles = generateRandomTiles();
  } while (calculateWait(tiles).length === 0);
  return tiles;
}

// 文字列出力
function tilesToString(tiles) {
  let tileString = "";
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i]; j++) {
      const type = Math.floor(i / 9);
      const num = i % 9 + 1;
      switch (type) {
        case 0:
          tileString += num + "m";
          break;
        case 1:
          tileString += num + "p";
          break;
        case 2:
          tileString += num + "s";
          break;
        default:
          tileString += num + "z";
          break;
      }
    }
  }
  return tileString;
}
