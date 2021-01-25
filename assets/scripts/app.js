const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 15;
const HEAL = 25;

let userMaxLife = 100;
let currentMonsterHealth = userMaxLife;
let currentHeroHealth = userMaxLife;

adjustHealthBars(userMaxLife);

const atkHandler = () => {
  atkMonster('ATTACK');
};

const strongAtkHandler = () => {
  atkMonster('STRONG_ATTACK');
};

const healPlayer = () => {
  let healValue;
  if (currentHeroHealth >= (userMaxLife - HEAL)) {
      
  }
  increasePlayerHealth(HEAL);
  currentHeroHealth += HEAL;
  endRound();
};

attackBtn.addEventListener('click', atkHandler);
strongAttackBtn.addEventListener('click', strongAtkHandler);
healBtn.addEventListener('click', healPlayer);

// AUX FUNCS //

const atkMonster = atkMode => {
  let maxDmg;
  if (atkMode === 'ATTACK') {
    maxDmg = ATTACK_VALUE;
  } else if (atkMode === 'STRONG_ATTACK') {
    maxDmg = STRONG_ATTACK_VALUE;
  }

  const playerDmg = dealMonsterDamage(maxDmg);
  currentMonsterHealth -= playerDmg;

  endRound();
};

const endRound = () => {
  const monsterDmg = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentHeroHealth -= monsterDmg;

  if (currentMonsterHealth <= 0 && currentHeroHealth > 0) {
    alert('VICTORY');
  } else if (currentHeroHealth <= 0 && currentMonsterHealth > 0) {
    alert('DEFEAT');
  }
};

// AUX FUNCS //
