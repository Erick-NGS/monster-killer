const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 20;
const HEAL = 25;
const MODE_ATK = 'ATTACK';
const MODE_STRONG_ATK = 'STRONG_ATTACK';
const LOG_PLAYER_ATK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATK = 'PLAYER_STRONG_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_MONSTER_ATK = 'MONSTER_ATTACK';
const LOG_GAME_OVER = 'GAME_OVER';

const getLife = () => {
  const userInput = prompt('Max life', '100');
  const parsedLife = parseInt(userInput);
  if (isNaN(parsedLife) || parsedLife <= 0) {
    throw {
      message: `Invalid input! Please insert a number.`,
    };
  }
  return parsedLife;
};

let userMaxLife;

try {
  userMaxLife = getLife();
} catch (error) {
  console.log(error);
  userMaxLife = 100;
  alert('Invalid value! Default value set to 100.');
  // throw error;
}

let currentMonsterHealth = userMaxLife;
let currentHeroHealth = userMaxLife;
let hasBonusLife = true;
let battleLog = [];
let lastLog;

adjustHealthBars(userMaxLife);

const atkHandler = () => {
  atkMonster(MODE_ATK);
};

const strongAtkHandler = () => {
  atkMonster(MODE_STRONG_ATK);
};

const healPlayer = () => {
  let healValue;
  if (currentHeroHealth >= userMaxLife - HEAL) {
    alert('Max health');
    healValue = userMaxLife - currentHeroHealth;
  } else {
    healValue = HEAL;
  }
  increasePlayerHealth(healValue);
  currentHeroHealth += healValue;
  writeLog(LOG_PLAYER_HEAL, healValue, currentMonsterHealth, currentHeroHealth);
  endRound();
};

const printLog = () => {
  for (let i = 0; i < 3; i++) {
    console.log('//////////');
  }

  // let j = 0;

  // while (j < 3) {
  //   console.log('//////////');
  //   j++;
  // }

  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLog && lastLog !== 0) || lastLog < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLog = i;
      break;
    }
    i++;
  }
};

attackBtn.addEventListener('click', atkHandler);
strongAttackBtn.addEventListener('click', strongAtkHandler);
healBtn.addEventListener('click', healPlayer);
logBtn.addEventListener('click', printLog);

// AUX FUNCS //

const atkMonster = atkMode => {
  const maxDmg = atkMode === MODE_ATK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    atkMode === MODE_ATK ? LOG_PLAYER_ATK : LOG_PLAYER_STRONG_ATK;
  // if (atkMode === MODE_ATK) {
  //   maxDmg = ATTACK_VALUE;
  //   logEvent = LOG_PLAYER_ATK;
  // } else if (atkMode === MODE_STRONG_ATK) {
  //   maxDmg = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_PLAYER_STRONG_ATK;
  // }

  const playerDmg = dealMonsterDamage(maxDmg);
  currentMonsterHealth -= playerDmg;

  writeLog(logEvent, playerDmg, currentMonsterHealth, currentHeroHealth);

  endRound();
};

const endRound = () => {
  const initialHealth = currentHeroHealth;
  const monsterDmg = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentHeroHealth -= monsterDmg;
  writeLog(
    LOG_MONSTER_ATK,
    monsterDmg,
    currentMonsterHealth,
    currentHeroHealth
  );

  if (currentHeroHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentHeroHealth = initialHealth;
    alert(`You've lost a life`);
    setPlayerHealth(initialHealth);
  }

  if (currentMonsterHealth <= 0 && currentHeroHealth > 0) {
    alert('VICTORY');
    writeLog(
      LOG_GAME_OVER,
      'PLAYER VICTORY',
      currentMonsterHealth,
      currentHeroHealth
    );
  } else if (currentHeroHealth <= 0 && currentMonsterHealth > 0) {
    alert('DEFEAT');
    writeLog(
      LOG_GAME_OVER,
      'PLAYER DEFEAT',
      currentMonsterHealth,
      currentHeroHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentHeroHealth <= 0) {
    reset();
  }
};

const reset = () => {
  currentMonsterHealth = userMaxLife;
  currentHeroHealth = userMaxLife;
  resetGame(userMaxLife);
};

const writeLog = (event, value, monsterHealth, playerHealth) => {
  let logEntry = {
    event: event,
    value: value,
    monsterHealth: monsterHealth,
    playerHealth: playerHealth,
  };

  switch (event) {
    case LOG_PLAYER_ATK:
      logEntry.target = 'MONSTER';
      break;

    case LOG_PLAYER_STRONG_ATK:
      logEntry.target = 'MONSTER';
      break;

    case LOG_MONSTER_ATK:
      logEntry.target = 'PLAYER';
      break;

    case LOG_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
  }

  // if (event === LOG_PLAYER_ATK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_PLAYER_STRONG_ATK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_MONSTER_ATK) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_PLAYER_HEAL) {
  //   logEntry.target = 'PLAYER';
  // }
  battleLog.push(logEntry);
};

// AUX FUNCS //
