// ==========================================================
// GRAVITY FLIP
//
// UPDATED:
// - Ground Flip unlock = 1000 Classic Survival
// - Up + Down dimensions = 75% world speed
// - Heart chance caps at 20%
// - Blue Sparks slightly more common
// - Massive shop:
//      76 colors
//      76 icons + abilities
//      90 obstacle designs
//      64 backgrounds
// ==========================================================


// ==========================================================
// CORE
// ==========================================================

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 550;

const FLOOR_HEIGHT = 60;
const MAX_LEVEL = 16;

const GROUND_UNLOCK_SCORE = 1000;
const NO_TOUCH_UNLOCK_SCORE = 700;

const GAME_SPEED_MULTIPLIER = 1.2;
const SPECIAL_MODE_SPEED_MULTIPLIER = 0.7;

// Up + Down are now 3/4 speed.
const VERTICAL_DIMENSION_SPEED_MULTIPLIER = 0.75;

const SCORE_RATE =
  0.225 *
  GAME_SPEED_MULTIPLIER;

const BASE_SURFACE_GRACE_TIME = 3000;


// ==========================================================
// HEARTS
// ==========================================================

const HEART_PRICE = 2000;

const HEART_SCORE_STEP = 200;

const HEART_CHANCE_PER_STEP = 0.01;

// CHANGED 10% -> 20%
const HEART_MAX_CHANCE = 0.20;

const HEART_MAX_SPAWNS_PER_RUN = 2;

const HEART_CHECK_INTERVAL = 180;


// ==========================================================
// SPARKS
// ==========================================================

// CHANGED 1.8% -> 2.5%
const BLUE_SPARK_CHANCE = 0.025;


// ==========================================================
// BOSSES
// ==========================================================

const CLASSIC_BOSS_DURATION = 25000;
const GROUND_BOSS_DURATION = 25000;
const SPECIAL_BOSS_DURATION = 15000;


// ==========================================================
// CANVAS
// ==========================================================

const canvas =
  document.getElementById(
    "gameCanvas"
  );

const ctx =
  canvas.getContext(
    "2d"
  );

canvas.width =
  CANVAS_WIDTH;

canvas.height =
  CANVAS_HEIGHT;


// ==========================================================
// DOM
// ==========================================================

const $ =
  id =>
    document.getElementById(
      id
    );


const gameWrapper = $("gameWrapper");

const scoreElement = $("score");
const bestLabel = $("bestLabel");
const bestScoreElement = $("bestScore");

const sparkCountElement = $("sparkCount");
const heartCountElement = $("heartCount");

const dimensionBadge = $("dimensionBadge");

const menuClassicBest = $("menuClassicBest");
const menuGroundBest = $("menuGroundBest");
const menuNoGroundBest = $("menuNoGroundBest");
const menuNoCeilingBest = $("menuNoCeilingBest");
const menuNoTouchBest = $("menuNoTouchBest");

const menuSparks = $("menuSparks");
const menuHearts = $("menuHearts");

const currentDimensionName =
  $("currentDimensionName");

const currentDimensionFlow =
  $("currentDimensionFlow");

const mainDimensionIcon =
  $("mainDimensionIcon");

const groundUnlockStatus =
  $("groundUnlockStatus");

const noGroundUnlockStatus =
  $("noGroundUnlockStatus");

const noCeilingUnlockStatus =
  $("noCeilingUnlockStatus");

const noTouchUnlockStatus =
  $("noTouchUnlockStatus");

const mainMenu = $("mainMenu");
const dimensionMenu = $("dimensionMenu");

const classicMenu = $("classicMenu");
const groundMenu = $("groundMenu");
const noGroundMenu = $("noGroundMenu");
const noCeilingMenu = $("noCeilingMenu");
const noTouchMenu = $("noTouchMenu");

const classicLevelsMenu = $("classicLevelsMenu");
const groundLevelsMenu = $("groundLevelsMenu");
const noGroundLevelsMenu = $("noGroundLevelsMenu");
const noCeilingLevelsMenu = $("noCeilingLevelsMenu");
const noTouchLevelsMenu = $("noTouchLevelsMenu");

const shopMenu = $("shopMenu");
const optionsMenu = $("optionsMenu");

const gameOverScreen = $("gameOverScreen");
const levelCompleteScreen = $("levelCompleteScreen");

const groundUnlockScreen = $("groundUnlockScreen");
const dualModeUnlockScreen = $("dualModeUnlockScreen");
const noTouchUnlockScreen = $("noTouchUnlockScreen");
const masterCompleteScreen = $("masterCompleteScreen");

const classicModeButton = $("classicModeButton");
const groundModeButton = $("groundModeButton");
const noGroundModeButton = $("noGroundModeButton");
const noCeilingModeButton = $("noCeilingModeButton");
const noTouchModeButton = $("noTouchModeButton");

const groundModeIcon = $("groundModeIcon");
const noGroundModeIcon = $("noGroundModeIcon");
const noCeilingModeIcon = $("noCeilingModeIcon");
const noTouchModeIcon = $("noTouchModeIcon");

const groundModeDescription =
  $("groundModeDescription");

const noGroundModeDescription =
  $("noGroundModeDescription");

const noCeilingModeDescription =
  $("noCeilingModeDescription");

const noTouchModeDescription =
  $("noTouchModeDescription");

const classicSurvivalButton =
  $("classicSurvivalButton");

const groundSurvivalButton =
  $("groundSurvivalButton");

const noGroundSurvivalButton =
  $("noGroundSurvivalButton");

const noCeilingSurvivalButton =
  $("noCeilingSurvivalButton");

const noTouchSurvivalButton =
  $("noTouchSurvivalButton");

const classicLevelsButton =
  $("classicLevelsButton");

const groundLevelsButton =
  $("groundLevelsButton");

const noGroundLevelsButton =
  $("noGroundLevelsButton");

const noCeilingLevelsButton =
  $("noCeilingLevelsButton");

const noTouchLevelsButton =
  $("noTouchLevelsButton");

const classicLevelGrid = $("classicLevelGrid");
const groundLevelGrid = $("groundLevelGrid");
const noGroundLevelGrid = $("noGroundLevelGrid");
const noCeilingLevelGrid = $("noCeilingLevelGrid");
const noTouchLevelGrid = $("noTouchLevelGrid");

const classicLevelsBackButton =
  $("classicLevelsBackButton");

const groundLevelsBackButton =
  $("groundLevelsBackButton");

const noGroundLevelsBackButton =
  $("noGroundLevelsBackButton");

const noCeilingLevelsBackButton =
  $("noCeilingLevelsBackButton");

const noTouchLevelsBackButton =
  $("noTouchLevelsBackButton");

const dimensionButton = $("dimensionButton");
const dimensionBackButton = $("dimensionBackButton");
const dimensionMenuGrid = $("dimensionMenuGrid");

const shopButton = $("shopButton");
const optionsButton = $("optionsButton");

const shopSparkCount = $("shopSparkCount");
const shopHeartCount = $("shopHeartCount");

const buyHeartButton = $("buyHeartButton");

const dimensionShopItems = $("dimensionShopItems");
const colorShopItems = $("colorShopItems");
const iconShopItems = $("iconShopItems");
const obstacleShopItems = $("obstacleShopItems");
const backgroundShopItems = $("backgroundShopItems");

const shakeToggle = $("shakeToggle");
const particlesToggle = $("particlesToggle");

const levelHud = $("levelHud");
const hudModeName = $("hudModeName");
const hudLevel = $("hudLevel");
const hudTarget = $("hudTarget");

const modeRuleHud = $("modeRuleHud");
const modeRuleText = $("modeRuleText");

const abilityHud = $("abilityHud");
const abilityHudIcon = $("abilityHudIcon");
const abilityHudName = $("abilityHudName");
const abilityHudDescription = $("abilityHudDescription");

const bossHud = $("bossHud");
const bossNameElement = $("bossName");
const bossTimerText = $("bossTimerText");
const bossHealthFill = $("bossHealthFill");
const bossWarning = $("bossWarning");

const gameMessage = $("gameMessage");
const gameMessageTitle = $("gameMessageTitle");
const gameMessageText = $("gameMessageText");

const finalScoreElement = $("finalScore");
const runSparksElement = $("runSparks");
const newBestText = $("newBestText");
const levelFailText = $("levelFailText");

const restartButton = $("restartButton");
const gameOverMenuButton = $("gameOverMenuButton");

const secondLifePanel = $("secondLifePanel");
const deathHeartCount = $("deathHeartCount");
const useHeartButton = $("useHeartButton");

const completeIcon = $("completeIcon");
const levelCompleteText = $("levelCompleteText");
const completeBadge = $("completeBadge");
const completeScore = $("completeScore");
const completeSparks = $("completeSparks");

const nextLevelButton = $("nextLevelButton");
const replayLevelButton = $("replayLevelButton");
const levelCompleteMenuButton = $("levelCompleteMenuButton");

const groundUnlockDimensionName =
  $("groundUnlockDimensionName");

const enterGroundModeButton =
  $("enterGroundModeButton");

const groundUnlockMenuButton =
  $("groundUnlockMenuButton");

const enterNoGroundModeButton =
  $("enterNoGroundModeButton");

const enterNoCeilingModeButton =
  $("enterNoCeilingModeButton");

const dualUnlockMenuButton =
  $("dualUnlockMenuButton");

const enterNoTouchModeButton =
  $("enterNoTouchModeButton");

const noTouchUnlockMenuButton =
  $("noTouchUnlockMenuButton");

const masterCompleteText =
  $("masterCompleteText");

const masterCompleteMenuButton =
  $("masterCompleteMenuButton");


// ==========================================================
// STORAGE HELPERS
// ==========================================================

function loadArray(
  key,
  fallback = []
) {

  try {

    const parsed =
      JSON.parse(
        localStorage.getItem(
          key
        )
      );

    return Array.isArray(parsed)
      ? parsed
      : fallback;

  }

  catch {

    return fallback;

  }

}


function saveArray(
  key,
  value
) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}


function loadJSON(
  key,
  fallback
) {

  try {

    const value =
      JSON.parse(
        localStorage.getItem(
          key
        )
      );

    return value ?? fallback;

  }

  catch {

    return fallback;

  }

}


function saveJSON(
  key,
  value
) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}


// ==========================================================
// DIMENSIONS
// ==========================================================

const dimensions = {

  normal: {

    id:"normal",

    name:"Normal Dimension",

    shortName:"NORMAL",

    icon:"🌍",

    price:0,

    description:
      "The original Gravity Flip universe.",

    flow:
      "STANDARD • LEFT → RIGHT",

    shopDescription:
      "Original world speed."

  },


  mirror: {

    id:"mirror",

    name:"Mirror Dimension",

    shortName:"MIRROR",

    icon:"🪞",

    price:5000,

    description:
      "The entire world is horizontally mirrored.",

    flow:
      "MIRROR • RIGHT → LEFT",

    shopDescription:
      "Everything moves from right to left."

  },


  down: {

    id:"down",

    name:"Down Dimension",

    shortName:"DOWN",

    icon:"⬆️",

    price:7500,

    description:
      "The world travels from the bottom toward the top.",

    flow:
      "BOTTOM → TOP • 75% SPEED",

    shopDescription:
      "Bottom-to-top world at 75% speed."

  },


  up: {

    id:"up",

    name:"Up Dimension",

    shortName:"UP",

    icon:"⬇️",

    price:10000,

    description:
      "The world travels from the top toward the bottom.",

    flow:
      "TOP → BOTTOM • 75% SPEED",

    shopDescription:
      "Top-to-bottom world at 75% speed."

  }

};


// ==========================================================
// DIMENSION PROGRESS
// ==========================================================

function createEmptyDimensionProgress() {

  return {

    best: {

      classic:0,
      ground:0,
      noGround:0,
      noCeiling:0,
      noTouch:0

    },

    completed: {

      classic:[],
      ground:[],
      noGround:[],
      noCeiling:[],
      noTouch:[]

    },

    unlocks: {

      ground:false,
      noGround:false,
      noCeiling:false,
      noTouch:false

    }

  };

}


function allLevelsComplete(
  array
) {

  for (
    let level = 1;
    level <= MAX_LEVEL;
    level++
  ) {

    if (
      !array.includes(level)
    ) {

      return false;

    }

  }

  return true;

}


function repairProgressUnlocks(
  progress
) {

  // UPDATED: 1000, not 1500
  if (
    progress.best.classic >=
    GROUND_UNLOCK_SCORE
  ) {

    progress.unlocks.ground =
      true;

  }


  if (
    allLevelsComplete(
      progress.completed.ground
    )
  ) {

    progress.unlocks.noGround =
      true;

    progress.unlocks.noCeiling =
      true;

  }


  if (
    progress.best.noGround >=
      NO_TOUCH_UNLOCK_SCORE &&
    progress.best.noCeiling >=
      NO_TOUCH_UNLOCK_SCORE
  ) {

    progress.unlocks.noTouch =
      true;

  }

}


function normalizeDimensionProgress(
  input
) {

  const fresh =
    createEmptyDimensionProgress();


  if (
    !input ||
    typeof input !== "object"
  ) {

    return fresh;

  }


  const modes = [

    "classic",
    "ground",
    "noGround",
    "noCeiling",
    "noTouch"

  ];


  modes.forEach(
    mode => {

      fresh.best[mode] =
        Number(
          input.best?.[mode]
        ) || 0;


      const levels =
        input.completed?.[mode];


      fresh.completed[mode] =
        Array.isArray(levels)
          ? [
              ...new Set(
                levels
                  .map(Number)
                  .filter(
                    level =>
                      level >= 1 &&
                      level <= MAX_LEVEL
                  )
              )
            ]
          : [];

    }
  );


  fresh.unlocks.ground =
    Boolean(
      input.unlocks?.ground
    );

  fresh.unlocks.noGround =
    Boolean(
      input.unlocks?.noGround
    );

  fresh.unlocks.noCeiling =
    Boolean(
      input.unlocks?.noCeiling
    );

  fresh.unlocks.noTouch =
    Boolean(
      input.unlocks?.noTouch
    );


  repairProgressUnlocks(
    fresh
  );


  return fresh;

}


function getLegacyNormalProgress() {

  const progress =
    createEmptyDimensionProgress();


  progress.best.classic =
    Number(
      localStorage.getItem(
        "gravityFlipBest"
      )
    ) || 0;


  progress.best.ground =
    Number(
      localStorage.getItem(
        "gravityFlipGroundBest"
      )
    ) || 0;


  progress.best.noGround =
    Number(
      localStorage.getItem(
        "gravityFlipNoGroundBest"
      )
    ) || 0;


  progress.best.noCeiling =
    Number(
      localStorage.getItem(
        "gravityFlipNoCeilingBest"
      )
    ) || 0;


  progress.best.noTouch =
    Number(
      localStorage.getItem(
        "gravityFlipNoTouchBest"
      )
    ) || 0;


  progress.completed.classic =
    loadArray(
      "gravityFlipCompletedLevels",
      []
    );


  progress.completed.ground =
    loadArray(
      "gravityFlipGroundCompletedLevels",
      []
    );


  progress.completed.noGround =
    loadArray(
      "gravityFlipNoGroundCompletedLevels",
      []
    );


  progress.completed.noCeiling =
    loadArray(
      "gravityFlipNoCeilingCompletedLevels",
      []
    );


  progress.completed.noTouch =
    loadArray(
      "gravityFlipNoTouchCompletedLevels",
      []
    );


  repairProgressUnlocks(
    progress
  );


  return progress;

}


// ==========================================================
// FOUR SEPARATE DIMENSION VARIABLES
// ==========================================================

const normalSaveKey =
  "gravityFlipDimensionProgress_normal";

const mirrorSaveKey =
  "gravityFlipDimensionProgress_mirror";

const downSaveKey =
  "gravityFlipDimensionProgress_down";

const upSaveKey =
  "gravityFlipDimensionProgress_up";


let normalDimensionProgress;


if (
  localStorage.getItem(
    normalSaveKey
  )
) {

  normalDimensionProgress =
    normalizeDimensionProgress(
      loadJSON(
        normalSaveKey,
        createEmptyDimensionProgress()
      )
    );

}

else {

  normalDimensionProgress =
    normalizeDimensionProgress(
      getLegacyNormalProgress()
    );

}


let mirrorDimensionProgress =
  normalizeDimensionProgress(
    loadJSON(
      mirrorSaveKey,
      createEmptyDimensionProgress()
    )
  );


let downDimensionProgress =
  normalizeDimensionProgress(
    loadJSON(
      downSaveKey,
      createEmptyDimensionProgress()
    )
  );


let upDimensionProgress =
  normalizeDimensionProgress(
    loadJSON(
      upSaveKey,
      createEmptyDimensionProgress()
    )
  );


function getDimensionProgress(
  dimensionId
) {

  if (
    dimensionId ===
    "mirror"
  ) {

    return mirrorDimensionProgress;

  }


  if (
    dimensionId ===
    "down"
  ) {

    return downDimensionProgress;

  }


  if (
    dimensionId ===
    "up"
  ) {

    return upDimensionProgress;

  }


  return normalDimensionProgress;

}


function saveDimensionProgress(
  dimensionId
) {

  let key =
    normalSaveKey;


  if (
    dimensionId ===
    "mirror"
  ) {

    key =
      mirrorSaveKey;

  }


  else if (
    dimensionId ===
    "down"
  ) {

    key =
      downSaveKey;

  }


  else if (
    dimensionId ===
    "up"
  ) {

    key =
      upSaveKey;

  }


  saveJSON(
    key,
    getDimensionProgress(
      dimensionId
    )
  );

}


// ==========================================================
// GLOBAL MONEY
// ==========================================================

let sparks =
  Number(
    localStorage.getItem(
      "gravityFlipSparks"
    )
  ) || 0;


let hearts =
  Number(
    localStorage.getItem(
      "gravityFlipHearts"
    )
  ) || 0;


// ==========================================================
// DIMENSION OWNERSHIP
// ==========================================================

const DIMENSION_OWNERSHIP_KEY =
  "gravityFlipHalfPriceOwnedDimensionsV1";


let ownedDimensions =
  loadArray(
    DIMENSION_OWNERSHIP_KEY,
    ["normal"]
  );


if (
  !ownedDimensions.includes(
    "normal"
  )
) {

  ownedDimensions.unshift(
    "normal"
  );

}


ownedDimensions =
  [
    ...new Set(
      ownedDimensions.filter(
        id =>
          dimensions[id]
      )
    )
  ];


let currentDimension =
  localStorage.getItem(
    "gravityFlipCurrentDimension"
  ) || "normal";


if (
  !dimensions[currentDimension] ||
  !ownedDimensions.includes(
    currentDimension
  )
) {

  currentDimension =
    "normal";

}


// ==========================================================
// COSMETIC SAVE
// ==========================================================

let selectedColor =
  localStorage.getItem(
    "gravityFlipColor"
  ) || "cyan";


let ownedColors =
  loadArray(
    "gravityFlipOwnedColors",
    ["cyan"]
  );


let selectedIcon =
  localStorage.getItem(
    "gravityFlipIcon"
  ) || "square";


let ownedIcons =
  loadArray(
    "gravityFlipOwnedIcons",
    ["square"]
  );


let selectedObstacleDesign =
  localStorage.getItem(
    "gravityFlipObstacleDesign"
  ) || "classicRed";


let ownedObstacleDesigns =
  loadArray(
    "gravityFlipOwnedObstacleDesigns",
    ["classicRed"]
  );


let selectedBackground =
  localStorage.getItem(
    "gravityFlipBackground"
  ) || "neon";


let ownedBackgrounds =
  loadArray(
    "gravityFlipOwnedBackgrounds",
    ["neon"]
  );


let screenShakeEnabled =
  localStorage.getItem(
    "gravityFlipShake"
  ) !== "false";


let particlesEnabled =
  localStorage.getItem(
    "gravityFlipParticles"
  ) !== "false";


// ==========================================================
// 76 COLORS
// ==========================================================

const characterColors = [

  ["cyan","Cyan","#34e7ff",0],
  ["green","Green","#39ff88",10],
  ["purple","Purple","#b14cff",25],
  ["orange","Orange","#ff9f31",40],
  ["gold","Gold","#ffd700",60],
  ["red","Red","#ff305f",85],
  ["pink","Pink","#ff4fd8",100],
  ["white","White","#ffffff",125],
  ["blue","Electric Blue","#2979ff",140],
  ["lime","Lime","#baff00",155],
  ["magenta","Magenta","#ff00aa",175],
  ["black","Shadow","#17171f",200],
  ["rainbow","Rainbow","#ffffff",300],
  ["turquoise","Turquoise","#00ffd5",330],
  ["coral","Coral","#ff6f61",350],
  ["violet","Ultra Violet","#7f00ff",375],
  ["emerald","Emerald","#00e676",400],
  ["ruby","Ruby","#e0115f",425],
  ["silver","Silver","#c8d2dc",450],
  ["bronze","Bronze","#cd7f32",475],
  ["lemon","Laser Yellow","#f4ff37",500],
  ["midnight","Midnight","#3640a8",550],
  ["plasma","Plasma","#ff32e6",650],
  ["sapphire","Sapphire","#1769ff",680],
  ["mint","Mint","#7affd5",710],
  ["amber","Amber","#ffbf00",740],
  ["peach","Peach","#ffad91",770],
  ["crimson","Crimson","#dc143c",800],
  ["lavender","Lavender","#c39bff",830],
  ["acid","Acid Green","#8dff00",860],
  ["iceblue","Ice Blue","#9cecff",890],
  ["firered","Fire Red","#ff3a18",920],
  ["rose","Rose Gold","#e8a0a8",950],
  ["teal","Deep Teal","#00a8a8",980],
  ["cosmic","Cosmic Blue","#5865ff",1020],
  ["neonorange","Neon Orange","#ff6a00",1060],
  ["electricmint","Electric Mint","#00ffb7",1100],
  ["obsidian","Obsidian","#34324a",1200],

  // 38 NEW COLORS

  ["aquaNova","Aqua Nova","#16f4ff",1250],
  ["dragonRed","Dragon Red","#ff163d",1300],
  ["toxicYellow","Toxic Yellow","#eaff00",1350],
  ["royalBlue","Royal Blue","#2948d8",1400],
  ["hotPurple","Hot Purple","#d500ff",1450],
  ["copper","Copper","#b87333",1500],
  ["moonSilver","Moon Silver","#e0e8f0",1550],
  ["deepRose","Deep Rose","#c2185b",1600],
  ["seafoam","Seafoam","#54f2c5",1650],
  ["darkMint","Dark Mint","#00b88c",1700],
  ["solarGold","Solar Gold","#ffca28",1750],
  ["volcano","Volcano","#ff4411",1800],
  ["nebulaPink","Nebula Pink","#ff70db",1850],
  ["arctic","Arctic","#d2f7ff",1900],
  ["royalPurple","Royal Purple","#6236bd",1950],
  ["acidBlue","Acid Blue","#00aaff",2000],
  ["forest","Forest","#1b8f55",2050],
  ["bloodOrange","Blood Orange","#ff5328",2100],
  ["cloud","Cloud","#dce8ff",2150],
  ["laserGreen","Laser Green","#20ff5b",2200],
  ["deepOcean","Deep Ocean","#074f9e",2250],
  ["ultraPink","Ultra Pink","#ff168c",2300],
  ["sand","Desert Sand","#ddb96c",2350],
  ["stormGray","Storm Gray","#697386",2400],
  ["meteor","Meteor","#ff8140",2450],
  ["alien","Alien","#57ff72",2500],
  ["frozenPurple","Frozen Purple","#a7a8ff",2550],
  ["electricRose","Electric Rose","#ff477e",2600],
  ["sunsetGold","Sunset Gold","#ffab35",2650],
  ["voidBlue","Void Blue","#151b6b",2700],
  ["hyperCyan","Hyper Cyan","#00ffff",2800],
  ["hyperRed","Hyper Red","#ff003c",2900],
  ["hyperLime","Hyper Lime","#72ff00",3000],
  ["hyperViolet","Hyper Violet","#ae00ff",3100],
  ["starlight","Starlight","#fff9d1",3200],
  ["darkMatter","Dark Matter","#141029",3300],
  ["supernova","Supernova","#ffdd38",3500],
  ["quantum","Quantum","#73fff1",3800]

].map(
  item => ({

    id:item[0],
    name:item[1],
    color:item[2],
    price:item[3],

    rainbow:
      item[0] === "rainbow"

  })
);


// ==========================================================
// 76 ICONS
// ==========================================================

const characterIcons = [

  ["square","Square","■",0],
  ["diamond","Diamond","◆",20],
  ["circle","Circle","●",30],
  ["triangle","Triangle","▲",45],
  ["hexagon","Hexagon","⬢",65],
  ["pentagon","Pentagon","⬟",80],
  ["star","Star","★",100],
  ["shield","Shield","♦",125],
  ["bolt","Bolt","⚡",150],
  ["heart","Heart","♥",175],
  ["cross","Cross","✚",200],
  ["ring","Energy Ring","◉",225],
  ["comet","Comet","✦",275],
  ["moon","Moon","☾",300],
  ["crown","Crown","♛",330],
  ["skull","Skull","☠",360],
  ["flame","Flame","♨",390],
  ["gear","Gear","⚙",420],
  ["clover","Clover","♣",450],
  ["rocket","Rocket","✈",480],
  ["eye","Eye","◉",520],
  ["snowflake","Snowflake","❄",560],
  ["infinity","Infinity","∞",620],
  ["sun","Sun","☀",650],
  ["spade","Spade","♠",680],
  ["atom","Atom","⚛",710],
  ["flower","Flower","✿",740],
  ["sparkle","Sparkle","❈",770],
  ["peace","Peace","☮",800],
  ["music","Music","♫",830],
  ["anchor","Anchor","⚓",860],
  ["umbrella","Umbrella","☂",890],
  ["hourglass","Hourglass","⌛",920],
  ["warning","Warning","⚠",950],
  ["trident","Trident","Ψ",980],
  ["spiral","Spiral","◌",1020],
  ["fourstar","Nova","✧",1080],
  ["omega","Omega","Ω",1150],

  // 38 NEW ICONS

  ["snowman","Snowman","☃",1200],
  ["yinYang","Yin Yang","☯",1250],
  ["radioactive","Radioactive","☢",1300],
  ["biohazard","Biohazard","☣",1350],
  ["scissors","Scissors","✂",1400],
  ["check","Check","✓",1450],
  ["xmark","X Mark","✕",1500],
  ["arrow","Arrow","➤",1550],
  ["doubleArrow","Double Arrow","»",1600],
  ["cloudIcon","Cloud","☁",1650],
  ["rain","Rain","☂",1700],
  ["snowStar","Ice Star","❉",1750],
  ["asterisk","Asterisk","✱",1800],
  ["eightStar","Eight Star","✸",1850],
  ["burst","Burst","✺",1900],
  ["targetIcon","Target","◎",1950],
  ["bullseye","Bullseye","⊙",2000],
  ["plusCircle","Plus Circle","⊕",2050],
  ["timesCircle","Times Circle","⊗",2100],
  ["theta","Theta","Θ",2150],
  ["sigma","Sigma","Σ",2200],
  ["delta","Delta","Δ",2250],
  ["lambda","Lambda","Λ",2300],
  ["psi","Psi","ψ",2350],
  ["phi","Phi","Φ",2400],
  ["gem","Gem","♦",2450],
  ["king","King","♚",2500],
  ["queen","Queen","♕",2550],
  ["knight","Knight","♞",2600],
  ["bishop","Bishop","♝",2650],
  ["pawn","Pawn","♟",2700],
  ["clubs","Clubs","♧",2800],
  ["heartsuit","Heart Suit","♡",2900],
  ["diamondsuit","Diamond Suit","♢",3000],
  ["blackSun","Black Sun","✹",3150],
  ["meteorIcon","Meteor","☄",3300],
  ["ultimate","Ultimate","✪",3500],
  ["singularity","Singularity","⊛",4000]

].map(
  item => ({

    id:item[0],
    name:item[1],
    symbol:item[2],
    price:item[3]

  })
);


// ==========================================================
// ICON ABILITIES
// ==========================================================

const iconAbilities = {

  square:{
    name:"Stable Core",
    description:"World movement is 3% slower.",
    speedMult:0.97
  },

  diamond:{
    name:"Score Crystal",
    description:"+4% score gain.",
    scoreMult:1.04
  },

  circle:{
    name:"Soft Gravity",
    description:"Gravity is 6% gentler.",
    gravityMult:0.94
  },

  triangle:{
    name:"Risk Runner",
    description:"+3% speed and +5% score.",
    speedMult:1.03,
    scoreMult:1.05
  },

  hexagon:{
    name:"Compact Armor",
    description:"Collision hitbox is 6% smaller.",
    hitboxMult:0.94
  },

  pentagon:{
    name:"Spark Pull",
    description:"Pulls nearby Sparks from 60px.",
    magnetRadius:60
  },

  star:{
    name:"Lucky Star",
    description:"Blue Sparks are slightly more common.",
    blueChanceBonus:0.004
  },

  shield:{
    name:"Revive Shield",
    description:"Second-life protection lasts +1 second.",
    reviveBonusMs:1000
  },

  bolt:{
    name:"Gravity Bolt",
    description:"Gravity is 7% stronger.",
    gravityMult:1.07
  },

  heart:{
    name:"Heart Guard",
    description:"Second-life protection lasts +1.5 seconds.",
    reviveBonusMs:1500
  },

  cross:{
    name:"Life Pull",
    description:"Dropped Hearts are attracted from 110px.",
    heartMagnetRadius:110
  },

  ring:{
    name:"Spark Ring",
    description:"Pulls Sparks from 90px.",
    magnetRadius:90
  },

  comet:{
    name:"Comet Rush",
    description:"+4% speed and +6% score.",
    speedMult:1.04,
    scoreMult:1.06
  },

  moon:{
    name:"Moon Slow",
    description:"Boss projectiles move 6% slower.",
    bossProjectileSpeedMult:0.94
  },

  crown:{
    name:"Royal Fortune",
    description:"+5% score and 8% chance for +1 Spark.",
    scoreMult:1.05,
    sparkBonusChance:0.08
  },

  skull:{
    name:"Danger Pay",
    description:"+5% speed and +9% score.",
    speedMult:1.05,
    scoreMult:1.09
  },

  flame:{
    name:"Burn Delay",
    description:"Bosses wait 8% longer between attacks.",
    bossAttackCooldownMult:1.08
  },

  gear:{
    name:"Precision Gear",
    description:"2% slower movement and gentler gravity.",
    speedMult:0.98,
    gravityMult:0.97
  },

  clover:{
    name:"Lucky Clover",
    description:"10% +1 Spark chance and extra Blue Spark luck.",
    sparkBonusChance:0.10,
    blueChanceBonus:0.002
  },

  rocket:{
    name:"Rocket Run",
    description:"+6% speed and +8% score.",
    speedMult:1.06,
    scoreMult:1.08
  },

  eye:{
    name:"Collector Eye",
    description:"75px Spark magnet and 130px Heart magnet.",
    magnetRadius:75,
    heartMagnetRadius:130
  },

  snowflake:{
    name:"Boss Freeze",
    description:"Boss projectiles are 9% slower.",
    bossProjectileSpeedMult:0.91
  },

  infinity:{
    name:"Extra Time",
    description:"+0.8 seconds before lethal surfaces.",
    graceBonusMs:800
  },

  sun:{
    name:"Solar Fortune",
    description:"14% chance a collected Spark gives +1.",
    sparkBonusChance:0.14
  },

  spade:{
    name:"Tiny Hitbox",
    description:"Collision hitbox is 9% smaller.",
    hitboxMult:0.91
  },

  atom:{
    name:"Atomic Pull",
    description:"+4% gravity and 50px Spark magnet.",
    gravityMult:1.04,
    magnetRadius:50
  },

  flower:{
    name:"Feather Gravity",
    description:"Gravity is 10% gentler.",
    gravityMult:0.90
  },

  sparkle:{
    name:"Blue Spark Hunter",
    description:"Blue Sparks are noticeably more common.",
    blueChanceBonus:0.007
  },

  peace:{
    name:"Calm World",
    description:"World movement is 5% slower.",
    speedMult:0.95
  },

  music:{
    name:"Rhythm Bonus",
    description:"+3% score and 45px Spark magnet.",
    scoreMult:1.03,
    magnetRadius:45
  },

  anchor:{
    name:"Heavy Gravity",
    description:"+9% gravity and a slightly smaller hitbox.",
    gravityMult:1.09,
    hitboxMult:0.97
  },

  umbrella:{
    name:"Safety Bubble",
    description:"+1.2 seconds before lethal surfaces.",
    graceBonusMs:1200
  },

  hourglass:{
    name:"Time Break",
    description:"Boss shots are slower and attacks less frequent.",
    bossProjectileSpeedMult:0.89,
    bossAttackCooldownMult:1.10
  },

  warning:{
    name:"High Risk",
    description:"+5% speed and +10% score.",
    speedMult:1.05,
    scoreMult:1.10
  },

  trident:{
    name:"Spark Splitter",
    description:"18% chance for +1 Spark.",
    sparkBonusChance:0.18
  },

  spiral:{
    name:"Mega Magnet",
    description:"Pulls Sparks from 120px.",
    magnetRadius:120
  },

  fourstar:{
    name:"Nova Luck",
    description:"Blue Sparks are much more common.",
    blueChanceBonus:0.01
  },

  omega:{
    name:"Omega Balance",
    description:"Slower world, score boost, magnet and smaller hitbox.",
    speedMult:0.98,
    scoreMult:1.04,
    magnetRadius:65,
    hitboxMult:0.96
  },


  // ======================================================
  // NEW 38 ICON ABILITIES
  // ======================================================

  snowman:{
    name:"Cold Field",
    description:"Boss projectiles move 11% slower.",
    bossProjectileSpeedMult:0.89
  },

  yinYang:{
    name:"Perfect Balance",
    description:"Gravity is 5% gentler and score gains 4%.",
    gravityMult:0.95,
    scoreMult:1.04
  },

  radioactive:{
    name:"Radiation Rush",
    description:"+7% speed and +11% score.",
    speedMult:1.07,
    scoreMult:1.11
  },

  biohazard:{
    name:"Toxic Luck",
    description:"Blue Spark chance +0.8% and Spark bonus chance 8%.",
    blueChanceBonus:0.008,
    sparkBonusChance:0.08
  },

  scissors:{
    name:"Cut Hitbox",
    description:"Collision hitbox is 11% smaller.",
    hitboxMult:0.89
  },

  check:{
    name:"Safe Route",
    description:"World movement is 4% slower.",
    speedMult:0.96
  },

  xmark:{
    name:"Xtreme Score",
    description:"+12% score but +4% speed.",
    scoreMult:1.12,
    speedMult:1.04
  },

  arrow:{
    name:"Forward Drive",
    description:"+4% movement speed and +7% score.",
    speedMult:1.04,
    scoreMult:1.07
  },

  doubleArrow:{
    name:"Double Drive",
    description:"+6% movement speed and +10% score.",
    speedMult:1.06,
    scoreMult:1.10
  },

  cloudIcon:{
    name:"Cloud Gravity",
    description:"Gravity is 12% gentler.",
    gravityMult:0.88
  },

  rain:{
    name:"Rain Shield",
    description:"Second-life protection lasts +1.7 seconds.",
    reviveBonusMs:1700
  },

  snowStar:{
    name:"Frozen Time",
    description:"Boss attack cooldown is 12% longer.",
    bossAttackCooldownMult:1.12
  },

  asterisk:{
    name:"Spark Scanner",
    description:"Pulls Sparks from 105px.",
    magnetRadius:105
  },

  eightStar:{
    name:"Eightfold Luck",
    description:"16% chance for +1 Spark.",
    sparkBonusChance:0.16
  },

  burst:{
    name:"Burst Score",
    description:"+9% score.",
    scoreMult:1.09
  },

  targetIcon:{
    name:"Precision Core",
    description:"Hitbox is 8% smaller and boss shots 4% slower.",
    hitboxMult:0.92,
    bossProjectileSpeedMult:0.96
  },

  bullseye:{
    name:"Perfect Aim",
    description:"Hitbox is 10% smaller.",
    hitboxMult:0.90
  },

  plusCircle:{
    name:"Recovery Field",
    description:"Second-life protection lasts +2 seconds.",
    reviveBonusMs:2000
  },

  timesCircle:{
    name:"Danger Multiplier",
    description:"+6% speed and +13% score.",
    speedMult:1.06,
    scoreMult:1.13
  },

  theta:{
    name:"Theta Field",
    description:"Gravity 7% gentler and 60px Spark magnet.",
    gravityMult:0.93,
    magnetRadius:60
  },

  sigma:{
    name:"Score Sum",
    description:"+11% score.",
    scoreMult:1.11
  },

  delta:{
    name:"Delta Shift",
    description:"+3% speed, +8% score and smaller hitbox.",
    speedMult:1.03,
    scoreMult:1.08,
    hitboxMult:0.97
  },

  lambda:{
    name:"Low Gravity",
    description:"Gravity is 13% gentler.",
    gravityMult:0.87
  },

  psi:{
    name:"Psi Magnet",
    description:"Pulls Sparks from 135px.",
    magnetRadius:135
  },

  phi:{
    name:"Golden Ratio",
    description:"+6% score, 5% Spark bonus chance.",
    scoreMult:1.06,
    sparkBonusChance:0.05
  },

  gem:{
    name:"Gem Hunter",
    description:"Blue Spark chance +1.2%.",
    blueChanceBonus:0.012
  },

  king:{
    name:"King's Fortune",
    description:"+8% score and 12% chance for +1 Spark.",
    scoreMult:1.08,
    sparkBonusChance:0.12
  },

  queen:{
    name:"Queen's Guard",
    description:"Hitbox 7% smaller and revive protection +1 second.",
    hitboxMult:0.93,
    reviveBonusMs:1000
  },

  knight:{
    name:"Knight Charge",
    description:"+5% speed and +9% score.",
    speedMult:1.05,
    scoreMult:1.09
  },

  bishop:{
    name:"Diagonal Luck",
    description:"90px Spark magnet and Blue chance +0.5%.",
    magnetRadius:90,
    blueChanceBonus:0.005
  },

  pawn:{
    name:"Underdog",
    description:"World 4% slower but score +4%.",
    speedMult:0.96,
    scoreMult:1.04
  },

  clubs:{
    name:"Club Fortune",
    description:"20% chance to gain +1 extra Spark.",
    sparkBonusChance:0.20
  },

  heartsuit:{
    name:"Heart Beacon",
    description:"Hearts are attracted from 170px.",
    heartMagnetRadius:170
  },

  diamondsuit:{
    name:"Diamond Beacon",
    description:"Spark magnet 145px.",
    magnetRadius:145
  },

  blackSun:{
    name:"Dark Solar",
    description:"+10% score and Blue Spark chance +0.6%.",
    scoreMult:1.10,
    blueChanceBonus:0.006
  },

  meteorIcon:{
    name:"Meteor Run",
    description:"+8% speed and +14% score.",
    speedMult:1.08,
    scoreMult:1.14
  },

  ultimate:{
    name:"Ultimate Core",
    description:"Smaller hitbox, Spark magnet and +8% score.",
    hitboxMult:0.93,
    magnetRadius:90,
    scoreMult:1.08
  },

  singularity:{
    name:"Singularity",
    description:"160px Spark magnet, smaller hitbox and Blue Spark boost.",
    magnetRadius:160,
    hitboxMult:0.92,
    blueChanceBonus:0.012
  }

};


function getCurrentIconAbility() {

  return (
    iconAbilities[
      selectedIcon
    ] ||
    iconAbilities.square
  );

}


function getAbilityValue(
  key,
  fallback
) {

  const value =
    getCurrentIconAbility()[
      key
    ];


  return value === undefined
    ? fallback
    : value;

}


// ==========================================================
// 90 OBSTACLE DESIGNS
// ==========================================================

const obstacleDesignRaw = [

  ["classicRed","Classic Red",0,"#ff315f","#ff9bad"],
  ["crimson","Crimson",30,"#d7193f","#ff9caf"],
  ["hazard","Hazard",50,"#ffe000","#111111"],
  ["ice","Frozen",70,"#61dcff","#ffffff"],
  ["toxic","Toxic",90,"#36ff72","#0b441f"],
  ["purple","Purple Void",110,"#a743ff","#e1aaff"],
  ["gold","Gold",130,"#ffd83d","#fff4a5"],
  ["candy","Candy",150,"#ff54bd","#54e6ff"],
  ["cyber","Cyber",175,"#00ddff","#ffffff"],
  ["matrix","Matrix",200,"#00ff66","#071f0e"],
  ["lava","Lava",225,"#ff5200","#ffd52c"],
  ["ocean","Ocean",250,"#168dce","#a4efff"],
  ["galaxy","Galaxy",275,"#511b91","#ffffff"],
  ["checker","Checker",300,"#eeeeee","#222222"],
  ["whiteout","Whiteout",325,"#ffffff","#a8c4df"],
  ["shadow","Shadow",350,"#15151d","#656575"],
  ["neonPink","Neon Pink",375,"#ff20bb","#ffb9eb"],
  ["orange","Orange Core",400,"#ff942e","#ffe1bd"],
  ["emerald","Emerald",425,"#00dc83","#9effd6"],
  ["electric","Electric",450,"#2877ff","#ffffff"],
  ["plasma","Plasma",475,"#cf2dff","#ff60ce"],
  ["blood","Blood",500,"#9b0018","#ff2948"],
  ["frostFire","Frost Fire",525,"#00baff","#ff591e"],
  ["royal","Royal",550,"#6b32b8","#ffd83d"],
  ["sunset","Sunset",575,"#ff7046","#ffd063"],
  ["circuit","Circuit",600,"#13353d","#44ffcf"],
  ["glitch","Glitch",650,"#111111","#00eaff"],
  ["target","Target",700,"#f8f8f8","#ff2648"],
  ["skull","Skull",750,"#e2e2e2","#171717"],
  ["smile","Smile",800,"#ffe738","#161616"],
  ["rage","Rage",850,"#e11432","#ffffff"],
  ["void","Void",925,"#08000f","#a539ff"],
  ["rainbowBlock","Rainbow",1000,"#ff3355","#ffffff"],
  ["diamond","Diamond",1150,"#70edff","#ffffff"],
  ["legendary","Legendary",1400,"#ffd936","#ffffff"],
  ["zebra","Neon Zebra",1500,"#ffffff","#101018"],
  ["radiation","Radiation",1600,"#d8ff18","#151515"],
  ["honeycomb","Honeycomb",1700,"#ffb515","#5c3500"],
  ["portal","Portal",1800,"#40106d","#d860ff"],
  ["laser","Laser",1900,"#150413","#ff174f"],
  ["camo","Cyber Camo",2000,"#304b36","#8ac78d"],
  ["brick","Neon Brick",2150,"#c23b4d","#ffd0d7"],
  ["bubbles","Blue Bubbles",2300,"#0d80c6","#b9f0ff"],
  ["magma","Black Magma",2450,"#160000","#ff6a00"],
  ["cosmic","Cosmic Core",2700,"#16133d","#72e7ff"],

  // 45 NEW

  ["quantumWall","Quantum Wall",2800,"#25106b","#61fff0"],
  ["solarSteel","Solar Steel",2900,"#ff8f00","#fff0a6"],
  ["deepFreeze","Deep Freeze",3000,"#0064a6","#d8fbff"],
  ["alienSkin","Alien Skin",3100,"#25d959","#c7ff56"],
  ["pinkVoid","Pink Void",3200,"#3d002c","#ff40d7"],
  ["blueFlame","Blue Flame",3300,"#052361","#28c8ff"],
  ["redLightning","Red Lightning",3400,"#5a0012","#ff244a"],
  ["moonRock","Moon Rock",3500,"#4e5360","#d6dae3"],
  ["starMetal","Star Metal",3600,"#1f2942","#9adfff"],
  ["acidMetal","Acid Metal",3700,"#263000","#c8ff00"],
  ["darkGold","Dark Gold",3800,"#3d2a00","#ffd447"],
  ["frozenRose","Frozen Rose",3900,"#4a1649","#ffb9ff"],
  ["stormBlock","Storm Block",4000,"#263347","#b6d7ff"],
  ["radioCore","Radio Core",4100,"#232600","#eeff00"],
  ["ultraViolet","Ultra Violet",4200,"#250036","#e25cff"],
  ["redIce","Red Ice",4300,"#4c0718","#ffb0be"],
  ["sunCore","Sun Core",4400,"#693300","#fff45e"],
  ["neonForest","Neon Forest",4500,"#003519","#43ff93"],
  ["deepSea","Deep Sea",4600,"#002d4f","#46d4ff"],
  ["purpleSteel","Purple Steel",4700,"#27203a","#bca7ff"],
  ["pixelRed","Pixel Red",4800,"#5a101f","#ff8299"],
  ["pixelBlue","Pixel Blue",4900,"#0b285f","#72b9ff"],
  ["pixelGreen","Pixel Green",5000,"#07391d","#60ff94"],
  ["lavaStone","Lava Stone",5100,"#27110d","#ff714d"],
  ["frostStone","Frost Stone",5200,"#142a36","#8cecff"],
  ["goldStone","Gold Stone",5300,"#47390a","#ffe75d"],
  ["nightSteel","Night Steel",5400,"#111828","#7187aa"],
  ["pinkSteel","Pink Steel",5500,"#422236","#ff84cb"],
  ["toxicSteel","Toxic Steel",5600,"#21320d","#aeff4d"],
  ["royalSteel","Royal Steel",5700,"#211747","#9e87ff"],
  ["solarGrid","Solar Grid",5800,"#522300","#ffa929"],
  ["arcticGrid","Arctic Grid",5900,"#082f4a","#6ee9ff"],
  ["voidGrid","Void Grid",6000,"#14081c","#a14bff"],
  ["emeraldGrid","Emerald Grid",6100,"#083d2a","#42ffc0"],
  ["rubyGrid","Ruby Grid",6200,"#4b0918","#ff4c74"],
  ["diamondGrid","Diamond Grid",6300,"#0b4b62","#cbfbff"],
  ["blackHole","Black Hole",6500,"#000000","#7d2bff"],
  ["whiteStar","White Star",6700,"#dddddd","#ffffff"],
  ["fireStorm","Fire Storm",6900,"#571000","#ffae2d"],
  ["iceStorm","Ice Storm",7100,"#073453","#d5f8ff"],
  ["toxicStorm","Toxic Storm",7300,"#183600","#c6ff36"],
  ["cosmicStorm","Cosmic Storm",7500,"#201238","#65eaff"],
  ["rainbowStorm","Rainbow Storm",7800,"#ff3664","#4fffff"],
  ["godBlock","God Block",8200,"#fff0a0","#ffffff"],
  ["singularityBlock","Singularity",9000,"#030006","#d763ff"]

];


const obstacleDesigns =
  obstacleDesignRaw.map(
    item => ({

      id:item[0],

      name:item[1],

      price:item[2],

      base:item[3],

      accent:item[4],

      preview:
        `linear-gradient(135deg, ${item[3]}, ${item[4]})`

    })
  );


// ==========================================================
// 64 BACKGROUNDS
// ==========================================================

const backgroundRaw = [

  ["neon","Neon Night",0,["#071326","#0b1830","#071326"]],
  ["sunset","Sunset Grid",50,["#301041","#9b2748","#f28b42"]],
  ["toxic","Toxic Void",75,["#020d08","#0b3d22","#06160e"]],
  ["nebula","Purple Nebula",100,["#090213","#36125c","#140522"]],
  ["ice","Ice World",125,["#061c30","#155b82","#0b314b"]],
  ["space","Deep Space",175,["#000000","#030817","#000000"]],
  ["lava","Lava Core",200,["#130000","#5c0d00","#1c0300"]],
  ["ocean","Ocean Depths",225,["#00101f","#004264","#001528"]],
  ["aurora","Aurora",250,["#061127","#06464f","#18113b"]],
  ["matrix","Matrix",275,["#000000","#00200c","#000000"]],
  ["candy","Candy Rush",300,["#26102f","#7e2c6d","#123d5e"]],
  ["desert","Solar Desert",325,["#341300","#a9470d","#e69736"]],
  ["storm","Thunder Storm",350,["#03050d","#151d35","#48526b"]],
  ["synthwave","Synthwave",390,["#090014","#4f096f","#bd145e"]],
  ["galaxy","Galaxy",430,["#01000d","#20105c","#5a188c"]],
  ["emeraldworld","Emerald World",470,["#001008","#00482f","#008c5a"]],
  ["bloodmoon","Blood Moon",520,["#030002","#240006","#69000f"]],
  ["cyber","Cyber City",570,["#001018","#003a48","#005d6f"]],
  ["frostfire","Frost Fire",620,["#00152e","#00719b","#742400"]],
  ["moonlight","Moonlight",680,["#01030b","#111a3b","#263868"]],
  ["goldrush","Gold Rush",750,["#100a00","#593900","#aa7400"]],
  ["glitch","Glitch Dimension",850,["#050008","#301130","#003848"]],
  ["crystal","Crystal Cave",900,["#031021","#154479","#245c72"]],
  ["rednebula","Red Nebula",960,["#070003","#3d071d","#76172d"]],
  ["voidtemple","Void Temple",1020,["#020003","#10061d","#281044"]],
  ["frozendawn","Frozen Dawn",1080,["#061a30","#3d7ca7","#9f798e"]],
  ["acidcity","Acid City",1150,["#030700","#1f3b00","#507400"]],
  ["solarflare","Solar Flare",1220,["#1d0300","#9d2300","#d0660c"]],
  ["deepjungle","Deep Jungle",1300,["#000d06","#00341f","#08472f"]],
  ["pixelnight","Pixel Night",1400,["#01040f","#0c1c3a","#291c4b"]],
  ["royalspace","Royal Space",1500,["#030006","#240b40","#5b2775"]],
  ["starforge","Star Forge",1650,["#010208","#082d51","#773018"]],

  // 32 NEW

  ["blueNebula","Blue Nebula",1750,["#010516","#071f62","#1c55a8"]],
  ["greenNebula","Green Nebula",1850,["#00140a","#06452a","#10a263"]],
  ["pinkNebula","Pink Nebula",1950,["#14000e","#5a0d46","#b32789"]],
  ["orangeNebula","Orange Nebula",2050,["#160700","#632200","#c76614"]],
  ["alienPlanet","Alien Planet",2150,["#061400","#2a5d0d","#85b53e"]],
  ["frozenMoon","Frozen Moon",2250,["#02101d","#24557a","#84a9c4"]],
  ["redMoon","Red Moon",2350,["#100000","#52080a","#a5232d"]],
  ["violetMoon","Violet Moon",2450,["#090013","#310851","#6e1f8f"]],
  ["deepCave","Deep Cave",2550,["#020405","#121d21","#263238"]],
  ["magmaCave","Magma Cave",2650,["#0d0100","#471003","#8c280a"]],
  ["iceCave","Ice Cave",2750,["#001018","#063c59","#157698"]],
  ["crystalVoid","Crystal Void",2850,["#070018","#260063","#6429a5"]],
  ["hyperCity","Hyper City",2950,["#000815","#003667","#0082b8"]],
  ["nightCity","Night City",3050,["#010207","#11182d","#2d3459"]],
  ["pinkCity","Pink City",3150,["#10000e","#4e103d","#9f276b"]],
  ["toxicCity","Toxic City",3250,["#040900","#274000","#638c00"]],
  ["firePlanet","Fire Planet",3350,["#180300","#6d1800","#d74800"]],
  ["waterPlanet","Water Planet",3450,["#00101d","#00406d","#0878ae"]],
  ["forestPlanet","Forest Planet",3550,["#001006","#07401e","#158444"]],
  ["stormPlanet","Storm Planet",3650,["#040714","#202d49","#4d6384"]],
  ["goldPlanet","Gold Planet",3750,["#100b00","#5e4100","#b48411"]],
  ["rainbowVoid","Rainbow Void",3900,["#140015","#27406b","#6d205e"]],
  ["quantumSpace","Quantum Space",4100,["#010817","#003f55","#5d19a5"]],
  ["singularitySky","Singularity Sky",4300,["#000000","#160429","#4b0875"]],
  ["whiteGalaxy","White Galaxy",4500,["#10131a","#454e63","#adb8cc"]],
  ["darkGalaxy","Dark Galaxy",4700,["#000002","#08051b","#190b35"]],
  ["laserWorld","Laser World",4900,["#050009","#4c002a","#002c4c"]],
  ["megaAurora","Mega Aurora",5200,["#00101b","#00746a","#4d1781"]],
  ["starOcean","Star Ocean",5500,["#000918","#003e6b","#0e8098"]],
  ["dragonSky","Dragon Sky",5800,["#130000","#661114","#c15514"]],
  ["godRealm","God Realm",6200,["#29210a","#907528","#fff1a3"]],
  ["finalVoid","Final Void",7000,["#000000","#090010","#20003d"]]

];


const backgrounds =
  backgroundRaw.map(
    item => ({

      id:item[0],

      name:item[1],

      price:item[2],

      colors:item[3],

      preview:
        `linear-gradient(135deg, ${item[3][0]}, ${item[3][1]}, ${item[3][2]})`

    })
  );


// ==========================================================
// LEVELS
// ==========================================================

const levelTargets = [

  250,
  350,
  450,
  575,
  700,
  850,
  1000,
  1175,
  1350,
  1550,
  1750,
  1975,
  2200,
  2450,
  2725,
  3000

];


// ==========================================================
// BOSS NAMES
// ==========================================================

const classicBossNames = [
  "HAPPY ORB",
  "SERIOUS ORB",
  "ANNOYED CORE",
  "RAGE ENGINE",
  "DEMON CORE",
  "VOID DEMON",
  "NIGHTMARE KING",
  "FINAL RAGE",
  "DARK SENTINEL",
  "CHAOS CORE",
  "HELL MACHINE",
  "ABYSS LORD",
  "SOUL DESTROYER",
  "DEATH EMPEROR",
  "WORLD ENDER",
  "THE APOCALYPSE"
];


const groundBossNames = [
  "ANCHOR CUBE",
  "CEILING EYE",
  "TWIN GUARD",
  "SWITCH KING",
  "RAZOR ORB",
  "PULSE CORE",
  "LOCKED DEMON",
  "GROUND LORD",
  "IRON WATCHER",
  "STORM ANCHOR",
  "DOUBLE RAGE",
  "PRISON CORE",
  "ESCAPE EATER",
  "DANGER TITAN",
  "FINAL ANCHOR",
  "GRAVITY EMPEROR"
];


const noGroundBossNames = [
  "CLOUD ORB",
  "SKY EYE",
  "WIND CORE",
  "FLOAT KING",
  "UPPER DEMON",
  "PURPLE WRAITH",
  "VOID WING",
  "SKY LORD",
  "FLOOR EATER",
  "AIR TITAN",
  "CLOUD REAPER",
  "VOLTAGE GOD",
  "STAR DEVOURER",
  "VOID PHANTOM",
  "LAST WRAITH",
  "SKY APOCALYPSE"
];


const noCeilingBossNames = [
  "FROZEN EYE",
  "LOW RIDER",
  "ICE CORE",
  "CEILING HUNTER",
  "COLD MACHINE",
  "FROST DEMON",
  "LOW ORBIT",
  "ICE TITAN",
  "ROOF BREAKER",
  "SNOW REAPER",
  "FROZEN KING",
  "BLIZZARD CORE",
  "ICE DEVOURER",
  "WINTER PHANTOM",
  "FINAL FROST",
  "ABSOLUTE ZERO"
];


const noTouchBossNames = [
  "VOID SEED",
  "PHASE EYE",
  "AIR CORE",
  "DEAD ZONE",
  "PHANTOM ORB",
  "VOID HUNTER",
  "SPACE DEMON",
  "PHASE LORD",
  "ZERO CONTACT",
  "SOUL WALL",
  "VOID REAPER",
  "NOTHING KING",
  "PHASE DEVOURER",
  "DEATH ZONE",
  "FINAL VOID",
  "THE UNTOUCHABLE"
];


// ==========================================================
// MODE CONFIG
// ==========================================================

const modeConfig = {

  classic:{

    icon:"⚡",
    name:"CLASSIC",

    bossDuration:
      CLASSIC_BOSS_DURATION,

    baseLevelSpeed:4,
    levelSpeedIncrease:0.25,

    survivalBaseSpeed:4.67,
    survivalIncrease:0.33,
    survivalStep:200

  },


  ground:{

    icon:"⚓",
    name:"GROUND FLIP",

    bossDuration:
      GROUND_BOSS_DURATION,

    baseLevelSpeed:3.75,
    levelSpeedIncrease:0.22,

    survivalBaseSpeed:4,
    survivalIncrease:0.28,
    survivalStep:250

  },


  noGround:{

    icon:"🔥",
    name:"NO GROUND",

    bossDuration:
      SPECIAL_BOSS_DURATION,

    baseLevelSpeed:3.5,
    levelSpeedIncrease:0.21,

    survivalBaseSpeed:3.65,
    survivalIncrease:0.27,
    survivalStep:250

  },


  noCeiling:{

    icon:"❄️",
    name:"NO CEILING",

    bossDuration:
      SPECIAL_BOSS_DURATION,

    baseLevelSpeed:3.5,
    levelSpeedIncrease:0.21,

    survivalBaseSpeed:3.65,
    survivalIncrease:0.27,
    survivalStep:250

  },


  noTouch:{

    icon:"✨",
    name:"NO TOUCH",

    bossDuration:
      SPECIAL_BOSS_DURATION,

    baseLevelSpeed:3.25,
    levelSpeedIncrease:0.19,

    survivalBaseSpeed:3.35,
    survivalIncrease:0.24,
    survivalStep:275

  }

};


// ==========================================================
// GAME STATE
// ==========================================================

let running = false;

let gameMode = "menu";

let currentBaseMode =
  "classic";

let currentLevel = 1;

let score = 0;

let speed = 4;

let frame = 0;

let modeElapsedMs = 0;

let previousLoopTime =
  performance.now();

let screenShake = 0;

let runSparks = 0;

let lastSpeedMilestone = 0;

let obstacles = [];

let sparksOnScreen = [];

let heartsOnScreen = [];

let particles = [];

let stars = [];

let heartSpawnsThisRun = 0;

let reviveInvulnerableMs = 0;

let groundPatternSide =
  "floor";

let corridorCenter =
  275;


// ==========================================================
// PLAYER
// ==========================================================

const player = {

  x:180,
  y:0,

  width:42,
  height:42,

  velocityY:0,

  gravityDirection:1,

  gravityPower:1.15,

  rotation:0

};


// ==========================================================
// BOSS STATE
// ==========================================================

let bossActive = false;

let boss = null;

let bossMode =
  "classic";

let bossProjectiles = [];

let bossWarningMs = 0;

let bossDuration = 25000;
let bossTimeRemaining = 25000;

let bossAttackCooldown = 0;

let bossSurfaceSide =
  "floor";

let bossCorridorCenter =
  275;


// ==========================================================
// DIMENSION HELPERS
// ==========================================================

function isVerticalDimension() {

  return (
    currentDimension === "down" ||
    currentDimension === "up"
  );

}


function getWorldWidth() {

  return isVerticalDimension()
    ? CANVAS_HEIGHT
    : CANVAS_WIDTH;

}


function getWorldHeight() {

  return isVerticalDimension()
    ? CANVAS_WIDTH
    : CANVAS_HEIGHT;

}


function getDimensionSpeedMultiplier() {

  if (
    currentDimension === "down" ||
    currentDimension === "up"
  ) {

    return VERTICAL_DIMENSION_SPEED_MULTIPLIER;

  }


  return 1;

}


// ==========================================================
// CANVAS DIMENSION TRANSFORMS
// ==========================================================

function applyDimensionTransform() {

  if (
    currentDimension === "mirror"
  ) {

    ctx.translate(
      CANVAS_WIDTH,
      0
    );

    ctx.scale(
      -1,
      1
    );

    return;

  }


  if (
    currentDimension === "down"
  ) {

    ctx.transform(
      0,
      1,
      1,
      0,
      0,
      0
    );

    return;

  }


  if (
    currentDimension === "up"
  ) {

    ctx.transform(
      0,
      -1,
      -1,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

  }

}


// ==========================================================
// GAME MULTIPLIERS
// ==========================================================

function isSlowSpecialMode(
  mode
) {

  return (
    mode === "noGround" ||
    mode === "noCeiling" ||
    mode === "noTouch"
  );

}


function getGameplayMultiplier(
  mode = currentBaseMode
) {

  let multiplier =
    GAME_SPEED_MULTIPLIER;


  if (
    isSlowSpecialMode(
      mode
    )
  ) {

    multiplier *=
      SPECIAL_MODE_SPEED_MULTIPLIER;

  }


  // NEW:
  // Up and Down dimensions run at 75%.

  multiplier *=
    getDimensionSpeedMultiplier();


  multiplier *=
    getAbilityValue(
      "speedMult",
      1
    );


  return multiplier;

}


function getGravityDimensionMultiplier() {

  // Vertical worlds still need extra gravity because the logical
  // play area is taller, but the dimension speed multiplier
  // slows the overall movement.

  return isVerticalDimension()
    ? 1.72
    : 1;

}


function getGravityAbilityMultiplier() {

  return getAbilityValue(
    "gravityMult",
    1
  );

}


function getSurfaceGraceTime() {

  return (
    BASE_SURFACE_GRACE_TIME +
    getAbilityValue(
      "graceBonusMs",
      0
    )
  );

}


// ==========================================================
// MODE HELPERS
// ==========================================================

function isSurvivalMode() {

  return gameMode.endsWith(
    "Survival"
  );

}


function isLevelMode() {

  return gameMode.endsWith(
    "Level"
  );

}


function getFloorY() {

  return (
    getWorldHeight() -
    FLOOR_HEIGHT -
    player.height
  );

}


function playerOnFloor() {

  return (
    Math.abs(
      player.y -
      getFloorY()
    ) < 1
  );

}


function playerOnCeiling() {

  return (
    Math.abs(
      player.y -
      FLOOR_HEIGHT
    ) < 1
  );

}


function playerOnSurface() {

  return (
    playerOnFloor() ||
    playerOnCeiling()
  );

}


function oppositeSide(
  side
) {

  return side === "floor"
    ? "ceiling"
    : "floor";

}


function surfaceObstacleY(
  side,
  height
) {

  return side === "floor"
    ? getWorldHeight() -
      FLOOR_HEIGHT -
      height
    : FLOOR_HEIGHT;

}


// ==========================================================
// PLAYER HITBOX
// ==========================================================

function getPlayerHitbox() {

  const scale =
    getAbilityValue(
      "hitboxMult",
      1
    );


  const width =
    player.width *
    scale;


  const height =
    player.height *
    scale;


  return {

    x:
      player.x +
      (
        player.width -
        width
      ) / 2,

    y:
      player.y +
      (
        player.height -
        height
      ) / 2,

    width,
    height

  };

}


// ==========================================================
// CURRENT PROGRESS
// ==========================================================

function getCurrentProgress() {

  return getDimensionProgress(
    currentDimension
  );

}


function repairCurrentUnlocks() {

  const progress =
    getCurrentProgress();


  repairProgressUnlocks(
    progress
  );


  saveDimensionProgress(
    currentDimension
  );

}


function getCompletedArray(
  mode
) {

  return getCurrentProgress()
    .completed[
      mode
    ];

}


function getBestScore(
  mode
) {

  return getCurrentProgress()
    .best[
      mode
    ];

}


function allCampaignsComplete() {

  const progress =
    getCurrentProgress();


  return (

    allLevelsComplete(
      progress.completed.classic
    ) &&

    allLevelsComplete(
      progress.completed.ground
    ) &&

    allLevelsComplete(
      progress.completed.noGround
    ) &&

    allLevelsComplete(
      progress.completed.noCeiling
    ) &&

    allLevelsComplete(
      progress.completed.noTouch
    )

  );

}


// ==========================================================
// SPEED
// ==========================================================

function getLevelTarget(
  level
) {

  return levelTargets[
    level - 1
  ];

}


function getLevelSpeed(
  mode,
  level
) {

  const config =
    modeConfig[
      mode
    ];


  const base =
    config.baseLevelSpeed +
    (
      level - 1
    ) *
    config.levelSpeedIncrease;


  return (
    base *
    getGameplayMultiplier(
      mode
    )
  );

}


function getSurvivalSpeed(
  mode,
  currentScore
) {

  const config =
    modeConfig[
      mode
    ];


  const stages =
    Math.floor(
      currentScore /
      config.survivalStep
    );


  return (

    (
      config.survivalBaseSpeed +
      stages *
      config.survivalIncrease
    ) *

    getGameplayMultiplier(
      mode
    )

  );

}


function getLevelDifficulty(
  level
) {

  return (
    1 +
    (
      level - 1
    ) *
    0.075
  );

}


// ==========================================================
// BOSS NAME
// ==========================================================

function getBossName(
  mode,
  level
) {

  if (
    mode === "ground"
  ) {

    return groundBossNames[
      level - 1
    ];

  }


  if (
    mode === "noGround"
  ) {

    return noGroundBossNames[
      level - 1
    ];

  }


  if (
    mode === "noCeiling"
  ) {

    return noCeilingBossNames[
      level - 1
    ];

  }


  if (
    mode === "noTouch"
  ) {

    return noTouchBossNames[
      level - 1
    ];

  }


  return classicBossNames[
    level - 1
  ];

}


// ==========================================================
// SAVE GLOBAL
// ==========================================================

function saveGlobalShop() {

  localStorage.setItem(
    "gravityFlipSparks",
    sparks
  );


  localStorage.setItem(
    "gravityFlipHearts",
    hearts
  );


  saveArray(
    DIMENSION_OWNERSHIP_KEY,
    ownedDimensions
  );


  localStorage.setItem(
    "gravityFlipCurrentDimension",
    currentDimension
  );


  localStorage.setItem(
    "gravityFlipColor",
    selectedColor
  );


  saveArray(
    "gravityFlipOwnedColors",
    ownedColors
  );


  localStorage.setItem(
    "gravityFlipIcon",
    selectedIcon
  );


  saveArray(
    "gravityFlipOwnedIcons",
    ownedIcons
  );


  localStorage.setItem(
    "gravityFlipObstacleDesign",
    selectedObstacleDesign
  );


  saveArray(
    "gravityFlipOwnedObstacleDesigns",
    ownedObstacleDesigns
  );


  localStorage.setItem(
    "gravityFlipBackground",
    selectedBackground
  );


  saveArray(
    "gravityFlipOwnedBackgrounds",
    ownedBackgrounds
  );

}


// ==========================================================
// DIMENSIONS
// ==========================================================

function switchDimension(
  dimensionId
) {

  if (
    !dimensions[
      dimensionId
    ]
  ) {

    return;

  }


  if (
    !ownedDimensions.includes(
      dimensionId
    )
  ) {

    return;

  }


  saveDimensionProgress(
    currentDimension
  );


  currentDimension =
    dimensionId;


  localStorage.setItem(
    "gravityFlipCurrentDimension",
    currentDimension
  );


  currentBaseMode =
    "classic";


  createStars();

  resetPlayer();

  repairCurrentUnlocks();

  renderAllLevelMenus();

  updateUI();

  openMainMenu();

}


function buyDimension(
  dimensionId
) {

  const dimension =
    dimensions[
      dimensionId
    ];


  if (
    !dimension
  ) {

    return;

  }


  if (
    ownedDimensions.includes(
      dimensionId
    )
  ) {

    switchDimension(
      dimensionId
    );

    return;

  }


  if (
    sparks <
    dimension.price
  ) {

    alert(
      "You need " +
      (
        dimension.price -
        sparks
      ).toLocaleString() +
      " more Sparks!"
    );


    return;

  }


  sparks -=
    dimension.price;


  ownedDimensions.push(
    dimensionId
  );


  saveGlobalShop();

  renderDimensionMenu();

  renderShop();

  switchDimension(
    dimensionId
  );

}


// ==========================================================
// HEART SHOP
// ==========================================================

function buyHeart() {

  if (
    sparks <
    HEART_PRICE
  ) {

    alert(
      "You need " +
      (
        HEART_PRICE -
        sparks
      ) +
      " more Sparks!"
    );


    return;

  }


  sparks -=
    HEART_PRICE;


  hearts++;


  saveGlobalShop();

  updateUI();

  renderShop();

}


// ==========================================================
// UI
// ==========================================================

function updateUI() {

  const progress =
    getCurrentProgress();


  const dimension =
    dimensions[
      currentDimension
    ];


  sparkCountElement.textContent =
    sparks;


  heartCountElement.textContent =
    hearts;


  shopSparkCount.textContent =
    sparks;


  shopHeartCount.textContent =
    hearts;


  menuSparks.textContent =
    sparks;


  menuHearts.textContent =
    hearts;


  deathHeartCount.textContent =
    hearts;


  menuClassicBest.textContent =
    progress.best.classic;


  menuGroundBest.textContent =
    progress.best.ground;


  menuNoGroundBest.textContent =
    progress.best.noGround;


  menuNoCeilingBest.textContent =
    progress.best.noCeiling;


  menuNoTouchBest.textContent =
    progress.best.noTouch;


  bestScoreElement.textContent =
    getBestScore(
      currentBaseMode
    );


  mainDimensionIcon.textContent =
    dimension.icon;


  currentDimensionName.textContent =
    dimension.name.toUpperCase();


  currentDimensionFlow.textContent =
    dimension.flow;


  dimensionBadge.textContent =
    dimension.icon +
    " " +
    dimension.shortName;


  shakeToggle.textContent =
    screenShakeEnabled
      ? "ON"
      : "OFF";


  particlesToggle.textContent =
    particlesEnabled
      ? "ON"
      : "OFF";


  useHeartButton.disabled =
    hearts <= 0;


  useHeartButton.textContent =
    hearts > 0
      ? "❤️ USE HEART (" +
        hearts +
        ")"
      : "NO HEARTS";


  buyHeartButton.textContent =
    sparks >= HEART_PRICE
      ? "BUY ❤️ FOR 💎 2000"
      : "NEED 💎 2000";


  if (
    currentBaseMode ===
    "ground"
  ) {

    bestLabel.textContent =
      "⚓ BEST";

  }


  else if (
    currentBaseMode ===
    "noGround"
  ) {

    bestLabel.textContent =
      "🔥 BEST";

  }


  else if (
    currentBaseMode ===
    "noCeiling"
  ) {

    bestLabel.textContent =
      "❄️ BEST";

  }


  else if (
    currentBaseMode ===
    "noTouch"
  ) {

    bestLabel.textContent =
      "✨ BEST";

  }


  else {

    bestLabel.textContent =
      "🏆 BEST";

  }


  updateUnlockUI();

  updateAbilityHud();

  updateWrapperClasses();

}


// ==========================================================
// ICON HUD
// ==========================================================

function updateAbilityHud() {

  const icon =
    characterIcons.find(
      item =>
        item.id ===
        selectedIcon
    );


  const ability =
    getCurrentIconAbility();


  abilityHudIcon.textContent =
    icon?.symbol ||
    "■";


  abilityHudName.textContent =
    ability.name;


  abilityHudDescription.textContent =
    ability.description;


  if (
    running
  ) {

    abilityHud.classList.remove(
      "hidden"
    );

  }

}


// ==========================================================
// UNLOCK UI
// ==========================================================

function updateUnlockUI() {

  const progress =
    getCurrentProgress();


  // GROUND

  if (
    progress.unlocks.ground
  ) {

    groundUnlockStatus.textContent =
      "✓ UNLOCKED";


    groundModeButton.disabled =
      false;


    groundModeButton.classList.remove(
      "locked"
    );


    groundModeIcon.textContent =
      "⚓";


    groundModeDescription.textContent =
      "Survival + 16 levels";

  }


  else {

    groundUnlockStatus.textContent =
      Math.min(
        progress.best.classic,
        GROUND_UNLOCK_SCORE
      ) +
      " / " +
      GROUND_UNLOCK_SCORE;


    groundModeButton.disabled =
      true;


    groundModeButton.classList.add(
      "locked"
    );


    groundModeIcon.textContent =
      "🔒";


    groundModeDescription.textContent =
      "Reach 1000 in Classic Survival.";

  }


  // NO GROUND

  if (
    progress.unlocks.noGround
  ) {

    noGroundUnlockStatus.textContent =
      "✓ UNLOCKED";


    noGroundModeButton.disabled =
      false;


    noGroundModeButton.classList.remove(
      "locked"
    );


    noGroundModeIcon.textContent =
      "🔥";


    noGroundModeDescription.textContent =
      "Survival + 16 levels";

  }


  else {

    noGroundUnlockStatus.textContent =
      progress.completed.ground.length +
      " / 16";


    noGroundModeButton.disabled =
      true;


    noGroundModeButton.classList.add(
      "locked"
    );


    noGroundModeIcon.textContent =
      "🔒";

  }


  // NO CEILING

  if (
    progress.unlocks.noCeiling
  ) {

    noCeilingUnlockStatus.textContent =
      "✓ UNLOCKED";


    noCeilingModeButton.disabled =
      false;


    noCeilingModeButton.classList.remove(
      "locked"
    );


    noCeilingModeIcon.textContent =
      "❄️";


    noCeilingModeDescription.textContent =
      "Survival + 16 levels";

  }


  else {

    noCeilingUnlockStatus.textContent =
      progress.completed.ground.length +
      " / 16";


    noCeilingModeButton.disabled =
      true;


    noCeilingModeButton.classList.add(
      "locked"
    );


    noCeilingModeIcon.textContent =
      "🔒";

  }


  // NO TOUCH

  if (
    progress.unlocks.noTouch
  ) {

    noTouchUnlockStatus.textContent =
      "✓ UNLOCKED";


    noTouchModeButton.disabled =
      false;


    noTouchModeButton.classList.remove(
      "locked"
    );


    noTouchModeIcon.textContent =
      "✨";


    noTouchModeDescription.textContent =
      "Survival + 16 levels";

  }


  else {

    noTouchUnlockStatus.textContent =
      Math.min(
        progress.best.noGround,
        NO_TOUCH_UNLOCK_SCORE
      ) +
      " / 700 + " +
      Math.min(
        progress.best.noCeiling,
        NO_TOUCH_UNLOCK_SCORE
      ) +
      " / 700";


    noTouchModeButton.disabled =
      true;


    noTouchModeButton.classList.add(
      "locked"
    );


    noTouchModeIcon.textContent =
      "🔒";


    noTouchModeDescription.textContent =
      "Reach 700 in No Ground + 700 in No Ceiling.";

  }

}


// ==========================================================
// WRAPPER CLASS
// ==========================================================

function updateWrapperClasses() {

  gameWrapper.classList.remove(

    "mode-classic",
    "mode-ground",
    "mode-no-ground",
    "mode-no-ceiling",
    "mode-no-touch",

    "dimension-normal",
    "dimension-mirror",
    "dimension-down",
    "dimension-up"

  );


  gameWrapper.classList.add(
    "dimension-" +
    currentDimension
  );


  if (
    currentBaseMode === "ground"
  ) {

    gameWrapper.classList.add(
      "mode-ground"
    );

  }


  else if (
    currentBaseMode === "noGround"
  ) {

    gameWrapper.classList.add(
      "mode-no-ground"
    );

  }


  else if (
    currentBaseMode === "noCeiling"
  ) {

    gameWrapper.classList.add(
      "mode-no-ceiling"
    );

  }


  else if (
    currentBaseMode === "noTouch"
  ) {

    gameWrapper.classList.add(
      "mode-no-touch"
    );

  }


  else {

    gameWrapper.classList.add(
      "mode-classic"
    );

  }

}


// ==========================================================
// SCREENS
// ==========================================================

function hideAllScreens() {

  [

    mainMenu,
    dimensionMenu,

    classicMenu,
    groundMenu,
    noGroundMenu,
    noCeilingMenu,
    noTouchMenu,

    classicLevelsMenu,
    groundLevelsMenu,
    noGroundLevelsMenu,
    noCeilingLevelsMenu,
    noTouchLevelsMenu,

    shopMenu,
    optionsMenu,

    gameOverScreen,
    levelCompleteScreen,

    groundUnlockScreen,
    dualModeUnlockScreen,
    noTouchUnlockScreen,
    masterCompleteScreen

  ].forEach(
    screen => {

      screen.classList.add(
        "hidden"
      );

    }
  );

}


// ==========================================================
// MAIN
// ==========================================================

function openMainMenu() {

  running = false;

  gameMode = "menu";

  currentBaseMode =
    "classic";

  bossActive = false;

  boss = null;

  bossProjectiles = [];

  obstacles = [];

  sparksOnScreen = [];

  heartsOnScreen = [];


  levelHud.classList.add(
    "hidden"
  );


  modeRuleHud.classList.add(
    "hidden"
  );


  abilityHud.classList.add(
    "hidden"
  );


  bossHud.classList.add(
    "hidden"
  );


  bossWarning.classList.add(
    "hidden"
  );


  gameMessage.classList.add(
    "hidden"
  );


  hideAllScreens();


  mainMenu.classList.remove(
    "hidden"
  );


  scoreElement.textContent =
    "0";


  repairCurrentUnlocks();

  updateUI();

}


// ==========================================================
// DIMENSION MENU
// ==========================================================

function renderDimensionMenu() {

  dimensionMenuGrid.innerHTML =
    "";


  [
    "normal",
    "mirror",
    "down",
    "up"
  ]
  .forEach(
    dimensionId => {

      const dimension =
        dimensions[
          dimensionId
        ];


      const owned =
        ownedDimensions.includes(
          dimensionId
        );


      const active =
        currentDimension ===
        dimensionId;


      const progress =
        getDimensionProgress(
          dimensionId
        );


      const completedCount =
        Object.values(
          progress.completed
        )
        .reduce(
          (
            total,
            array
          ) =>
            total +
            array.length,
          0
        );


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "dimension-card";


      if (
        active
      ) {

        card.classList.add(
          "active"
        );

      }


      if (
        !owned
      ) {

        card.classList.add(
          "locked"
        );

      }


      card.innerHTML =
        `
          <div class="dimension-card-top">

            <span>
              ${dimension.icon}
            </span>

            <div>

              <h3>
                ${dimension.name}
              </h3>

              <p>
                ${dimension.flow}
              </p>

            </div>

          </div>

          <p>
            ${dimension.description}
          </p>

          <div class="dimension-card-stats">

            <div>
              CLASSIC BEST

              <strong>
                ${progress.best.classic}
              </strong>
            </div>

            <div>
              LEVELS

              <strong>
                ${completedCount} / 80
              </strong>
            </div>

          </div>
        `;


      const button =
        document.createElement(
          "button"
        );


      if (
        active
      ) {

        button.textContent =
          "✓ CURRENT DIMENSION";


        button.disabled =
          true;

      }


      else if (
        owned
      ) {

        button.textContent =
          "ENTER DIMENSION";


        button.addEventListener(
          "click",
          () => {

            switchDimension(
              dimensionId
            );

          }
        );

      }


      else {

        button.textContent =
          "🔒 💎 " +
          dimension.price.toLocaleString();


        button.addEventListener(
          "click",
          () => {

            buyDimension(
              dimensionId
            );

          }
        );

      }


      card.appendChild(
        button
      );


      dimensionMenuGrid.appendChild(
        card
      );

    }
  );

}


function openDimensionMenu() {

  if (
    running
  ) {

    return;

  }


  hideAllScreens();

  renderDimensionMenu();

  dimensionMenu.classList.remove(
    "hidden"
  );

}


// ==========================================================
// LEVEL MENUS
// ==========================================================

function isLevelUnlocked(
  mode,
  level
) {

  if (
    level === 1
  ) {

    return true;

  }


  return getCompletedArray(
    mode
  ).includes(
    level - 1
  );

}


function createLevelButton(
  mode,
  level
) {

  const completed =
    getCompletedArray(
      mode
    );


  const complete =
    completed.includes(
      level
    );


  const unlocked =
    isLevelUnlocked(
      mode,
      level
    );


  const button =
    document.createElement(
      "button"
    );


  button.className =
    "levelButton";


  if (
    complete
  ) {

    button.classList.add(
      "completed"
    );

  }


  if (
    !unlocked
  ) {

    button.classList.add(
      "locked"
    );


    button.disabled =
      true;

  }


  button.innerHTML =
    `
      <span class="level-number">
        ${String(level).padStart(2,"0")}
      </span>

      <strong>
        ${modeConfig[mode].icon}
        LEVEL ${level}
      </strong>

      <span class="level-name">
        ${getBossName(mode,level)}
      </span>

      <small>
        🎯 ${getLevelTarget(level)}
        • SPEED ${getLevelSpeed(mode,level).toFixed(2)}
      </small>

      <span class="level-status">
        ${
          complete
            ? "✓ COMPLETE"
            : unlocked
              ? "▶ AVAILABLE"
              : "🔒 LOCKED"
        }
      </span>
    `;


  if (
    unlocked
  ) {

    button.addEventListener(
      "click",
      () => {

        startLevel(
          mode,
          level
        );

      }
    );

  }


  return button;

}


function renderLevelGrid(
  mode,
  grid
) {

  grid.innerHTML =
    "";


  for (
    let level = 1;
    level <= MAX_LEVEL;
    level++
  ) {

    grid.appendChild(
      createLevelButton(
        mode,
        level
      )
    );

  }

}


function renderAllLevelMenus() {

  renderLevelGrid(
    "classic",
    classicLevelGrid
  );

  renderLevelGrid(
    "ground",
    groundLevelGrid
  );

  renderLevelGrid(
    "noGround",
    noGroundLevelGrid
  );

  renderLevelGrid(
    "noCeiling",
    noCeilingLevelGrid
  );

  renderLevelGrid(
    "noTouch",
    noTouchLevelGrid
  );

}


// ==========================================================
// MODE MENU
// ==========================================================

function openModeMenu(
  mode
) {

  const progress =
    getCurrentProgress();


  if (
    mode === "ground" &&
    !progress.unlocks.ground
  ) {

    return;

  }


  if (
    mode === "noGround" &&
    !progress.unlocks.noGround
  ) {

    return;

  }


  if (
    mode === "noCeiling" &&
    !progress.unlocks.noCeiling
  ) {

    return;

  }


  if (
    mode === "noTouch" &&
    !progress.unlocks.noTouch
  ) {

    return;

  }


  hideAllScreens();


  currentBaseMode =
    mode;


  updateWrapperClasses();


  const menus = {

    classic:
      classicMenu,

    ground:
      groundMenu,

    noGround:
      noGroundMenu,

    noCeiling:
      noCeilingMenu,

    noTouch:
      noTouchMenu

  };


  menus[
    mode
  ]
  .classList
  .remove(
    "hidden"
  );


  updateUI();

}


function openLevelMenu(
  mode
) {

  hideAllScreens();


  currentBaseMode =
    mode;


  updateWrapperClasses();

  renderAllLevelMenus();


  const menus = {

    classic:
      classicLevelsMenu,

    ground:
      groundLevelsMenu,

    noGround:
      noGroundLevelsMenu,

    noCeiling:
      noCeilingLevelsMenu,

    noTouch:
      noTouchLevelsMenu

  };


  menus[
    mode
  ]
  .classList
  .remove(
    "hidden"
  );

}


// ==========================================================
// PLAYER RESET
// ==========================================================

function resetPlayer() {

  player.x =
    isVerticalDimension()
      ? 170
      : 180;


  player.y =
    getFloorY();


  player.velocityY = 0;

  player.gravityDirection = 1;

  player.rotation = 0;

}


// ==========================================================
// START
// ==========================================================

function startSurvival(
  mode
) {

  currentBaseMode =
    mode;


  gameMode =
    mode +
    "Survival";


  startGame();

}


function startLevel(
  mode,
  level
) {

  if (
    !isLevelUnlocked(
      mode,
      level
    )
  ) {

    return;

  }


  currentBaseMode =
    mode;


  currentLevel =
    level;


  gameMode =
    mode +
    "Level";


  startGame();

}


function startGame() {

  hideAllScreens();


  running = true;

  score = 0;

  frame = 0;

  modeElapsedMs = 0;

  runSparks = 0;

  lastSpeedMilestone = 0;

  heartSpawnsThisRun = 0;

  reviveInvulnerableMs = 0;

  obstacles = [];

  sparksOnScreen = [];

  heartsOnScreen = [];

  particles = [];

  bossProjectiles = [];

  boss = null;

  bossActive = false;

  bossWarningMs = 0;

  bossAttackCooldown = 0;


  groundPatternSide =
    Math.random() > 0.5
      ? "floor"
      : "ceiling";


  corridorCenter =
    getWorldHeight() / 2;


  bossCorridorCenter =
    getWorldHeight() / 2;


  bossSurfaceSide =
    "floor";


  resetPlayer();


  scoreElement.textContent =
    "0";


  bossHud.classList.add(
    "hidden"
  );


  bossWarning.classList.add(
    "hidden"
  );


  gameMessage.classList.add(
    "hidden"
  );


  abilityHud.classList.remove(
    "hidden"
  );


  updateWrapperClasses();


  if (
    isLevelMode()
  ) {

    speed =
      getLevelSpeed(
        currentBaseMode,
        currentLevel
      );


    hudModeName.textContent =
      modeConfig[
        currentBaseMode
      ].icon +
      " " +
      modeConfig[
        currentBaseMode
      ].name;


    hudLevel.textContent =
      currentLevel;


    hudTarget.textContent =
      getLevelTarget(
        currentLevel
      );


    levelHud.classList.remove(
      "hidden"
    );

  }


  else {

    speed =
      getSurvivalSpeed(
        currentBaseMode,
        score
      );


    levelHud.classList.add(
      "hidden"
    );

  }


  updateModeRuleHud();

  updateAbilityHud();

  updateUI();

}


// ==========================================================
// RULE HUD
// ==========================================================

function updateModeRuleHud() {

  modeRuleHud.classList.remove(
    "ready",
    "locked",
    "danger"
  );


  if (
    currentBaseMode === "classic"
  ) {

    modeRuleHud.classList.add(
      "hidden"
    );

    return;

  }


  modeRuleHud.classList.remove(
    "hidden"
  );


  if (
    currentBaseMode === "ground"
  ) {

    if (
      playerOnSurface()
    ) {

      modeRuleText.textContent =
        "⚡ FLIP READY";


      modeRuleHud.classList.add(
        "ready"
      );

    }


    else {

      modeRuleText.textContent =
        "🔒 AIR LOCK";


      modeRuleHud.classList.add(
        "locked"
      );

    }


    return;

  }


  const remaining =
    Math.max(
      0,
      getSurfaceGraceTime() -
      modeElapsedMs
    );


  if (
    currentBaseMode === "noGround"
  ) {

    if (
      remaining > 0
    ) {

      modeRuleText.textContent =
        "🟢 GROUND SAFE " +
        (
          remaining /
          1000
        ).toFixed(1) +
        "s";


      modeRuleHud.classList.add(
        "ready"
      );

    }


    else {

      modeRuleText.textContent =
        "🔥 GROUND LETHAL";


      modeRuleHud.classList.add(
        "danger"
      );

    }

  }


  else if (
    currentBaseMode === "noCeiling"
  ) {

    if (
      remaining > 0
    ) {

      modeRuleText.textContent =
        "🟢 CEILING SAFE " +
        (
          remaining /
          1000
        ).toFixed(1) +
        "s";


      modeRuleHud.classList.add(
        "ready"
      );

    }


    else {

      modeRuleText.textContent =
        "❄️ CEILING LETHAL";


      modeRuleHud.classList.add(
        "danger"
      );

    }

  }


  else {

    if (
      remaining > 0
    ) {

      modeRuleText.textContent =
        "🟢 SURFACES SAFE " +
        (
          remaining /
          1000
        ).toFixed(1) +
        "s";


      modeRuleHud.classList.add(
        "ready"
      );

    }


    else {

      modeRuleText.textContent =
        "☠ BOTH SURFACES LETHAL";


      modeRuleHud.classList.add(
        "danger"
      );

    }

  }

}


// ==========================================================
// FLIP
// ==========================================================

function flipGravity() {

  if (
    !running
  ) {

    return;

  }


  // CRITICAL GROUND FLIP RULE

  if (
    currentBaseMode === "ground" &&
    !playerOnSurface()
  ) {

    createLockedParticles();

    return;

  }


  player.gravityDirection *=
    -1;


  player.velocityY =

    4 *

    getGameplayMultiplier(
      currentBaseMode
    ) *

    getGravityDimensionMultiplier() *

    getGravityAbilityMultiplier() *

    player.gravityDirection;


  createFlipParticles();

}


// ==========================================================
// PLAYER UPDATE
// ==========================================================

function updatePlayer() {

  const gravityMultiplier =

    getGameplayMultiplier(
      currentBaseMode
    ) *

    getGravityDimensionMultiplier() *

    getGravityAbilityMultiplier();


  player.velocityY +=

    player.gravityPower *

    gravityMultiplier *

    player.gravityDirection;


  player.y +=
    player.velocityY;


  const floorY =
    getFloorY();


  if (
    player.y >=
    floorY
  ) {

    player.y =
      floorY;


    if (
      reviveInvulnerableMs <= 0 &&
      modeElapsedMs >
        getSurfaceGraceTime() &&
      (
        currentBaseMode === "noGround" ||
        currentBaseMode === "noTouch"
      )
    ) {

      gameOver(
        "surface"
      );


      return;

    }


    if (
      player.gravityDirection === 1
    ) {

      player.velocityY = 0;

    }

  }


  if (
    player.y <=
    FLOOR_HEIGHT
  ) {

    player.y =
      FLOOR_HEIGHT;


    if (
      reviveInvulnerableMs <= 0 &&
      modeElapsedMs >
        getSurfaceGraceTime() &&
      (
        currentBaseMode === "noCeiling" ||
        currentBaseMode === "noTouch"
      )
    ) {

      gameOver(
        "surface"
      );


      return;

    }


    if (
      player.gravityDirection === -1
    ) {

      player.velocityY = 0;

    }

  }


  player.rotation +=

    0.04 *

    getGameplayMultiplier(
      currentBaseMode
    ) *

    player.gravityDirection;


  updateModeRuleHud();

}


// ==========================================================
// PARTICLES
// ==========================================================

function createFlipParticles() {

  if (
    !particlesEnabled
  ) {

    return;

  }


  const color =
    getSelectedColor();


  for (
    let i = 0;
    i < 12;
    i++
  ) {

    particles.push({

      x:
        player.x +
        player.width / 2,

      y:
        player.y +
        player.height / 2,

      vx:
        (
          Math.random() -
          0.5
        ) * 6,

      vy:
        (
          Math.random() -
          0.5
        ) * 6,

      life:30,

      size:
        2 +
        Math.random() * 5,

      color

    });

  }

}


function createLockedParticles() {

  if (
    !particlesEnabled
  ) {

    return;

  }


  for (
    let i = 0;
    i < 8;
    i++
  ) {

    particles.push({

      x:
        player.x +
        player.width / 2,

      y:
        player.y +
        player.height / 2,

      vx:
        (
          Math.random() -
          0.5
        ) * 3,

      vy:
        (
          Math.random() -
          0.5
        ) * 3,

      life:18,

      size:3,

      color:"#ff4058"

    });

  }

}


// ==========================================================
// OBSTACLES
// ==========================================================

function getRightmostObstacleX() {

  if (
    obstacles.length === 0
  ) {

    return -Infinity;

  }


  return Math.max(
    ...obstacles.map(
      obstacle =>
        obstacle.x +
        obstacle.width
    )
  );

}


function createClassicObstacle() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const difficulty =
    isLevelMode()
      ? getLevelDifficulty(
          currentLevel
        )
      : 1 +
        score / 3500;


  const random =
    Math.random();


  if (
    random < 0.27
  ) {

    const height =
      Math.min(
        H * 0.3,
        60 +
        Math.random() *
        75 *
        difficulty
      );


    obstacles.push({

      x:W + 60,

      y:
        H -
        FLOOR_HEIGHT -
        height,

      width:
        38 +
        Math.random() * 24,

      height,

      type:"normal"

    });

  }


  else if (
    random < 0.54
  ) {

    const height =
      Math.min(
        H * 0.3,
        60 +
        Math.random() *
        75 *
        difficulty
      );


    obstacles.push({

      x:W + 60,

      y:FLOOR_HEIGHT,

      width:
        38 +
        Math.random() * 24,

      height,

      type:"normal"

    });

  }


  else if (
    random < 0.76
  ) {

    const height =
      55 +
      Math.random() * 42;


    const minY =
      FLOOR_HEIGHT + 60;


    const maxY =
      H -
      FLOOR_HEIGHT -
      height -
      60;


    obstacles.push({

      x:W + 60,

      y:
        minY +
        Math.random() *
        Math.max(
          1,
          maxY - minY
        ),

      width:
        48 +
        Math.random() * 24,

      height,

      type:"floating",

      direction:
        Math.random() > 0.5
          ? 1
          : -1,

      moveSpeed:
        0.45 +
        difficulty * 0.05

    });

  }


  else {

    // 65% gap

    const playableHeight =
      H -
      FLOOR_HEIGHT * 2;


    const gapHeight =
      playableHeight *
      0.65;


    const minGapY =
      FLOOR_HEIGHT;


    const maxGapY =
      H -
      FLOOR_HEIGHT -
      gapHeight;


    const gapY =
      minGapY +
      Math.random() *
      Math.max(
        1,
        maxGapY -
        minGapY
      );


    const wallWidth = 55;


    const topHeight =
      gapY -
      FLOOR_HEIGHT;


    if (
      topHeight > 5
    ) {

      obstacles.push({

        x:W + 60,

        y:FLOOR_HEIGHT,

        width:wallWidth,

        height:topHeight,

        type:"normal"

      });

    }


    const bottomY =
      gapY +
      gapHeight;


    const bottomHeight =
      H -
      FLOOR_HEIGHT -
      bottomY;


    if (
      bottomHeight > 5
    ) {

      obstacles.push({

        x:W + 60,

        y:bottomY,

        width:wallWidth,

        height:bottomHeight,

        type:"normal"

      });

    }

  }

}


// ==========================================================
// GROUND PATTERNS
// ==========================================================

function canSpawnGroundPattern() {

  const W =
    getWorldWidth();


  return (
    obstacles.length === 0 ||
    getRightmostObstacleX() <
      W -
      Math.min(
        300,
        W * 0.52
      )
  );

}


function createGroundPattern() {

  const W =
    getWorldWidth();


  const startX =
    W + 70;


  const blockedSide =
    groundPatternSide;


  const safeSide =
    oppositeSide(
      blockedSide
    );


  groundPatternSide =
    Math.random() < 0.72
      ? safeSide
      : blockedSide;


  const difficulty =
    isLevelMode()
      ? getLevelDifficulty(
          currentLevel
        )
      : 1 +
        score / 4000;


  const pattern =
    Math.floor(
      Math.random() * 4
    );


  if (
    pattern === 0
  ) {

    const height =
      Math.min(
        getWorldHeight() * 0.24,
        90 +
        difficulty * 16
      );


    obstacles.push({

      x:startX,

      y:
        surfaceObstacleY(
          blockedSide,
          height
        ),

      width:58,

      height,

      type:"ground"

    });


    spawnSurfaceSparkCluster(
      startX + 130,
      safeSide
    );

  }


  else if (
    pattern === 1
  ) {

    const count =
      Math.min(
        4,
        2 +
        Math.floor(
          difficulty
        )
      );


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const height =
        65 +
        i * 12;


      obstacles.push({

        x:
          startX +
          i * 70,

        y:
          surfaceObstacleY(
            blockedSide,
            height
          ),

        width:37,

        height,

        type:"ground"

      });

    }


    spawnSurfaceSparkCluster(

      startX +
      count * 72 +
      35,

      safeSide

    );

  }


  else if (
    pattern === 2
  ) {

    const height = 100;


    const baseY =
      surfaceObstacleY(
        blockedSide,
        height
      );


    obstacles.push({

      x:startX,

      y:baseY,

      baseY,

      width:68,

      height,

      type:"groundMover",

      fromFloor:
        blockedSide === "floor",

      phase:
        Math.random() *
        Math.PI * 2

    });


    spawnSurfaceSparkCluster(
      startX + 145,
      safeSide
    );

  }


  else {

    const height =
      Math.min(
        getWorldHeight() * 0.23,
        115 +
        difficulty * 7
      );


    obstacles.push({

      x:startX,

      y:
        surfaceObstacleY(
          blockedSide,
          height
        ),

      width:55,

      height,

      type:"ground"

    });


    obstacles.push({

      x:
        startX +
        Math.min(
          500,
          W * 0.8
        ),

      y:
        surfaceObstacleY(
          safeSide,
          height
        ),

      width:55,

      height,

      type:"ground"

    });


    spawnSurfaceSparkCluster(

      startX +
      Math.min(
        250,
        W * 0.4
      ),

      safeSide

    );

  }

}


// ==========================================================
// CORRIDOR MODES
// ==========================================================

function canSpawnCorridorGate() {

  const W =
    getWorldWidth();


  return (
    obstacles.length === 0 ||
    getRightmostObstacleX() <
      W -
      Math.min(
        330,
        W * 0.58
      )
  );

}


function createCorridorGate(
  mode
) {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const playableTop =
    FLOOR_HEIGHT;


  const playableBottom =
    H -
    FLOOR_HEIGHT;


  const playableHeight =
    playableBottom -
    playableTop;


  const difficulty =
    isLevelMode()
      ? getLevelDifficulty(
          currentLevel
        )
      : 1 +
        score / 4500;


  let gapPercent;


  if (
    mode === "noTouch"
  ) {

    gapPercent =
      Math.max(
        0.58,
        0.72 -
        difficulty * 0.017
      );

  }


  else {

    gapPercent =
      Math.max(
        0.62,
        0.76 -
        difficulty * 0.014
      );

  }


  const gapHeight =
    playableHeight *
    gapPercent;


  const shift =
    mode === "noTouch"
      ? playableHeight * 0.12
      : playableHeight * 0.16;


  corridorCenter +=
    (
      Math.random() -
      0.5
    ) * shift;


  let minCenter =
    playableTop +
    gapHeight / 2 +
    20;


  let maxCenter =
    playableBottom -
    gapHeight / 2 -
    20;


  if (
    mode === "noGround"
  ) {

    maxCenter -=
      Math.min(
        70,
        playableHeight * 0.12
      );

  }


  if (
    mode === "noCeiling"
  ) {

    minCenter +=
      Math.min(
        70,
        playableHeight * 0.12
      );

  }


  if (
    mode === "noTouch"
  ) {

    minCenter += 30;

    maxCenter -= 30;

  }


  if (
    minCenter > maxCenter
  ) {

    corridorCenter =
      playableTop +
      playableHeight / 2;

  }


  else {

    corridorCenter =
      Math.max(
        minCenter,
        Math.min(
          maxCenter,
          corridorCenter
        )
      );

  }


  const gapY =
    corridorCenter -
    gapHeight / 2;


  const x =
    W + 65;


  const width = 55;


  const topHeight =
    gapY -
    playableTop;


  if (
    topHeight > 5
  ) {

    obstacles.push({

      x,

      y:playableTop,

      width,

      height:topHeight,

      type:"corridor"

    });

  }


  const bottomY =
    gapY +
    gapHeight;


  const bottomHeight =
    playableBottom -
    bottomY;


  if (
    bottomHeight > 5
  ) {

    obstacles.push({

      x,

      y:bottomY,

      width,

      height:bottomHeight,

      type:"corridor"

    });

  }


  spawnSafeGapSparkCluster(

    x + 105,

    corridorCenter,

    gapY + 25,

    gapY +
    gapHeight -
    40

  );

}


// ==========================================================
// UPDATE OBSTACLES
// ==========================================================

function updateObstacles() {

  frame++;


  if (
    bossActive ||
    bossWarningMs > 0
  ) {

    return;

  }


  if (
    currentBaseMode === "classic"
  ) {

    const difficulty =
      isLevelMode()
        ? currentLevel
        : Math.floor(
            score / 200
          );


    const originalRate =
      Math.max(
        62,
        122 -
        difficulty * 3
      );


    const spawnRate =
      Math.max(
        45,
        Math.round(
          originalRate /
          GAME_SPEED_MULTIPLIER
        )
      );


    if (
      frame %
      spawnRate === 0
    ) {

      createClassicObstacle();

    }

  }


  else if (
    currentBaseMode === "ground"
  ) {

    if (
      canSpawnGroundPattern()
    ) {

      createGroundPattern();

    }

  }


  else {

    if (
      canSpawnCorridorGate()
    ) {

      createCorridorGate(
        currentBaseMode
      );

    }

  }


  const H =
    getWorldHeight();


  const multiplier =
    getGameplayMultiplier(
      currentBaseMode
    );


  obstacles.forEach(
    obstacle => {

      obstacle.x -=
        speed;


      if (
        obstacle.type === "floating"
      ) {

        obstacle.y +=

          obstacle.moveSpeed *

          multiplier *

          obstacle.direction;


        if (
          obstacle.y <=
          FLOOR_HEIGHT + 15
        ) {

          obstacle.direction =
            1;

        }


        if (
          obstacle.y +
          obstacle.height >=
          H -
          FLOOR_HEIGHT -
          15
        ) {

          obstacle.direction =
            -1;

        }

      }


      if (
        obstacle.type === "groundMover"
      ) {

        obstacle.phase +=
          0.025 *
          multiplier;


        const movement =
          (
            Math.sin(
              obstacle.phase
            ) +
            1
          ) * 12;


        obstacle.y =
          obstacle.fromFloor
            ? obstacle.baseY -
              movement
            : obstacle.baseY +
              movement;

      }

    }
  );


  obstacles =
    obstacles.filter(
      obstacle =>
        obstacle.x +
        obstacle.width >
        -120
    );

}


// ==========================================================
// SPARKS
// ==========================================================

function rollSparkData() {

  const blueChance =
    Math.min(
      0.07,

      BLUE_SPARK_CHANCE +

      getAbilityValue(
        "blueChanceBonus",
        0
      )
    );


  if (
    Math.random() <
    blueChance
  ) {

    return {

      kind:"blue",

      value:
        5 +
        Math.floor(
          Math.random() * 3
        )

    };

  }


  return {

    kind:"normal",

    value:1

  };

}


function createSparkAt(
  x,
  y
) {

  const data =
    rollSparkData();


  sparksOnScreen.push({

    x,
    y,

    size:
      data.kind === "blue"
        ? 34
        : 28,

    rotation:0,

    pulse:
      Math.random() *
      Math.PI * 2,

    kind:data.kind,

    value:data.value

  });

}


function getClusterSize() {

  const random =
    Math.random();


  if (
    random < 0.35
  ) {

    return 1;

  }


  if (
    random < 0.65
  ) {

    return 2;

  }


  if (
    random < 0.87
  ) {

    return 3;

  }


  return 4;

}


function createSparkCluster(
  startX,
  centerY,
  minY,
  maxY,
  forcedCount = null
) {

  const count =
    forcedCount ??
    getClusterSize();


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const x =
      startX +
      i * 48;


    const wave =
      Math.sin(
        i * 1.35
      ) * 28;


    const y =
      Math.max(
        minY,
        Math.min(
          maxY,
          centerY +
          wave
        )
      );


    createSparkAt(
      x,
      y
    );

  }

}


function spawnSurfaceSparkCluster(
  x,
  safeSide
) {

  if (
    Math.random() > 0.7
  ) {

    return;

  }


  const H =
    getWorldHeight();


  const y =
    safeSide === "ceiling"
      ? FLOOR_HEIGHT + 20
      : H -
        FLOOR_HEIGHT -
        42;


  createSparkCluster(

    x,
    y,

    FLOOR_HEIGHT + 12,

    H -
    FLOOR_HEIGHT -
    42

  );

}


function spawnSafeGapSparkCluster(
  x,
  centerY,
  minY,
  maxY
) {

  if (
    Math.random() > 0.7
  ) {

    return;

  }


  createSparkCluster(
    x,
    centerY,
    minY,
    maxY
  );

}


function isCollectiblePositionClear(
  x,
  y,
  size
) {

  for (
    const obstacle of
    obstacles
  ) {

    if (

      x + size >
      obstacle.x - 30 &&

      x <
      obstacle.x +
      obstacle.width +
      30 &&

      y + size >
      obstacle.y - 20 &&

      y <
      obstacle.y +
      obstacle.height +
      20

    ) {

      return false;

    }

  }


  return true;

}


function spawnClassicSparkCluster() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const count =
    getClusterSize();


  const minY =
    FLOOR_HEIGHT + 70;


  const maxY =
    H -
    FLOOR_HEIGHT -
    70;


  for (
    let attempt = 0;
    attempt < 20;
    attempt++
  ) {

    const centerY =
      minY +
      Math.random() *
      Math.max(
        1,
        maxY - minY
      );


    let valid =
      true;


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const x =
        W +
        100 +
        i * 48;


      const y =
        centerY +
        Math.sin(
          i * 1.35
        ) * 28;


      if (
        !isCollectiblePositionClear(
          x,
          y,
          34
        )
      ) {

        valid = false;

        break;

      }

    }


    if (
      valid
    ) {

      createSparkCluster(

        W + 100,

        centerY,

        minY,

        maxY,

        count

      );


      return;

    }

  }

}


// ==========================================================
// HEART DROPS
// ==========================================================

function getHeartDropChance() {

  if (
    score <
    HEART_SCORE_STEP
  ) {

    return 0;

  }


  const steps =
    Math.floor(
      score /
      HEART_SCORE_STEP
    );


  // Every 200 = +1%, maximum 20%.

  return Math.min(

    HEART_MAX_CHANCE,

    steps *
    HEART_CHANCE_PER_STEP

  );

}


function findSafeHeartPosition() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const x =
    W + 120;


  const minY =
    FLOOR_HEIGHT + 55;


  const maxY =
    H -
    FLOOR_HEIGHT -
    80;


  if (
    currentBaseMode === "ground"
  ) {

    const candidates = [

      FLOOR_HEIGHT + 20,

      H -
      FLOOR_HEIGHT -
      55

    ];


    for (
      const y of candidates
    ) {

      if (
        isCollectiblePositionClear(
          x,
          y,
          36
        )
      ) {

        return {
          x,
          y
        };

      }

    }

  }


  if (
    currentBaseMode === "noGround"
  ) {

    const y =
      FLOOR_HEIGHT + 80;


    if (
      isCollectiblePositionClear(
        x,
        y,
        36
      )
    ) {

      return {
        x,
        y
      };

    }

  }


  if (
    currentBaseMode === "noCeiling"
  ) {

    const y =
      H -
      FLOOR_HEIGHT -
      120;


    if (
      isCollectiblePositionClear(
        x,
        y,
        36
      )
    ) {

      return {
        x,
        y
      };

    }

  }


  if (
    currentBaseMode === "noTouch"
  ) {

    const y =
      Math.max(
        minY,
        Math.min(
          maxY,
          corridorCenter
        )
      );


    if (
      isCollectiblePositionClear(
        x,
        y,
        36
      )
    ) {

      return {
        x,
        y
      };

    }

  }


  for (
    let attempt = 0;
    attempt < 30;
    attempt++
  ) {

    const y =
      minY +
      Math.random() *
      Math.max(
        1,
        maxY - minY
      );


    if (
      isCollectiblePositionClear(
        x,
        y,
        36
      )
    ) {

      return {
        x,
        y
      };

    }

  }


  return {

    x,

    y:H / 2

  };

}


function maybeSpawnSurvivalHeart() {

  if (
    !isSurvivalMode()
  ) {

    return;

  }


  if (
    heartSpawnsThisRun >=
    HEART_MAX_SPAWNS_PER_RUN
  ) {

    return;

  }


  if (
    heartsOnScreen.length > 0
  ) {

    return;

  }


  if (
    frame %
    HEART_CHECK_INTERVAL !== 0
  ) {

    return;

  }


  const chance =
    getHeartDropChance();


  if (
    chance <= 0
  ) {

    return;

  }


  if (
    Math.random() >=
    chance
  ) {

    return;

  }


  const position =
    findSafeHeartPosition();


  heartsOnScreen.push({

    x:position.x,

    y:position.y,

    size:36,

    pulse:0

  });


  heartSpawnsThisRun++;

}


// ==========================================================
// MAGNET
// ==========================================================

function applyMagnet(
  collectible,
  radius
) {

  if (
    radius <= 0
  ) {

    return;

  }


  const playerX =
    player.x +
    player.width / 2;


  const playerY =
    player.y +
    player.height / 2;


  const itemX =
    collectible.x +
    collectible.size / 2;


  const itemY =
    collectible.y +
    collectible.size / 2;


  const dx =
    playerX -
    itemX;


  const dy =
    playerY -
    itemY;


  const distance =
    Math.hypot(
      dx,
      dy
    );


  if (
    distance > radius ||
    distance < 1
  ) {

    return;

  }


  collectible.x +=
    dx * 0.13;


  collectible.y +=
    dy * 0.13;

}


// ==========================================================
// UPDATE COLLECTIBLES
// ==========================================================

function updateCollectibles() {

  if (
    bossActive ||
    bossWarningMs > 0
  ) {

    return;

  }


  const classicInterval =
    Math.round(
      190 /
      GAME_SPEED_MULTIPLIER
    );


  if (
    currentBaseMode === "classic" &&
    frame %
    classicInterval === 0
  ) {

    spawnClassicSparkCluster();

  }


  maybeSpawnSurvivalHeart();


  const multiplier =
    getGameplayMultiplier(
      currentBaseMode
    );


  const sparkMagnet =
    getAbilityValue(
      "magnetRadius",
      0
    );


  const heartMagnet =
    getAbilityValue(
      "heartMagnetRadius",
      0
    );


  sparksOnScreen.forEach(
    spark => {

      spark.x -=
        speed;


      applyMagnet(
        spark,
        sparkMagnet
      );


      spark.rotation +=

        (
          spark.kind === "blue"
            ? 0.09
            : 0.06
        ) *
        multiplier;


      spark.pulse +=
        0.08 *
        multiplier;

    }
  );


  heartsOnScreen.forEach(
    heart => {

      heart.x -=
        speed;


      applyMagnet(
        heart,
        heartMagnet
      );


      heart.pulse +=
        0.08 *
        multiplier;

    }
  );


  sparksOnScreen =
    sparksOnScreen.filter(
      spark =>
        spark.x > -80
    );


  heartsOnScreen =
    heartsOnScreen.filter(
      heart =>
        heart.x > -80
    );

}


// ==========================================================
// BOSS
// ==========================================================

function startBossWarning() {

  if (
    bossActive ||
    bossWarningMs > 0
  ) {

    return;

  }


  obstacles = [];

  sparksOnScreen = [];

  heartsOnScreen = [];

  bossProjectiles = [];


  bossMode =
    currentBaseMode;


  bossWarningMs =
    1300;


  bossWarning.classList.remove(
    "hidden"
  );


  levelHud.classList.add(
    "hidden"
  );

}


function startBoss() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  bossWarning.classList.add(
    "hidden"
  );


  bossWarningMs = 0;

  bossActive = true;


  bossDuration =
    modeConfig[
      bossMode
    ].bossDuration;


  bossTimeRemaining =
    bossDuration;


  bossAttackCooldown =
    900;


  bossSurfaceSide =
    "floor";


  bossCorridorCenter =
    H / 2;


  boss = {

    x:
      W - 145,

    y:
      H / 2 - 55,

    width:110,

    height:110,

    direction:1,

    pulse:0

  };


  bossNameElement.textContent =
    getBossName(
      bossMode,
      currentLevel
    );


  bossTimerText.textContent =
    (
      bossDuration /
      1000
    ).toFixed(1) +
    "s";


  bossHealthFill.style.width =
    "100%";


  bossHud.classList.remove(
    "hidden"
  );


  if (
    screenShakeEnabled
  ) {

    screenShake = 11;

  }

}


function updateBoss(
  deltaMs
) {

  if (
    bossWarningMs > 0
  ) {

    bossWarningMs -=
      deltaMs;


    if (
      bossWarningMs <= 0
    ) {

      startBoss();

    }


    return;

  }


  if (
    !bossActive
  ) {

    return;

  }


  bossTimeRemaining -=
    deltaMs;


  bossAttackCooldown -=
    deltaMs;


  const H =
    getWorldHeight();


  const multiplier =
    getGameplayMultiplier(
      bossMode
    );


  const moveSpeed =
    (
      0.7 +
      currentLevel * 0.05
    ) *
    multiplier;


  boss.y +=
    moveSpeed *
    boss.direction;


  boss.pulse +=
    0.08 *
    multiplier;


  if (
    boss.y <=
    FLOOR_HEIGHT + 20
  ) {

    boss.direction = 1;

  }


  if (
    boss.y +
    boss.height >=
    H -
    FLOOR_HEIGHT -
    20
  ) {

    boss.direction = -1;

  }


  if (
    bossAttackCooldown <= 0
  ) {

    fireBossAttack();

  }


  bossProjectiles.forEach(
    projectile => {

      projectile.x +=
        projectile.vx;


      projectile.y +=
        projectile.vy;


      projectile.rotation +=
        projectile.rotationSpeed || 0;

    }
  );


  const W =
    getWorldWidth();


  bossProjectiles =
    bossProjectiles.filter(
      projectile =>
        projectile.x > -250 &&
        projectile.x < W + 250
    );


  const percentage =
    Math.max(
      0,
      bossTimeRemaining /
      bossDuration *
      100
    );


  bossHealthFill.style.width =
    percentage + "%";


  bossTimerText.textContent =
    Math.max(
      0,
      bossTimeRemaining /
      1000
    ).toFixed(1) +
    "s";


  if (
    bossTimeRemaining <= 0
  ) {

    defeatBoss();

  }

}


function fireBossAttack() {

  if (
    bossMode === "classic"
  ) {

    fireClassicBossAttack();

  }


  else if (
    bossMode === "ground"
  ) {

    fireGroundBossAttack();

  }


  else {

    fireCorridorBossAttack(
      bossMode
    );

  }

}


function getBossProjectileModifier() {

  return getAbilityValue(
    "bossProjectileSpeedMult",
    1
  );

}


function getBossCooldownModifier() {

  return getAbilityValue(
    "bossAttackCooldownMult",
    1
  );

}


function fireClassicBossAttack() {

  const multiplier =
    getGameplayMultiplier(
      "classic"
    );


  const projectileSpeed =

    (
      4.4 +
      currentLevel * 0.12
    ) *

    multiplier *

    getBossProjectileModifier();


  const x =
    boss.x;


  const y =
    boss.y +
    boss.height / 2;


  const targetY =
    player.y +
    player.height / 2;


  const distance =
    Math.max(
      1,
      x -
      player.x
    );


  const aimVelocity =
    (
      targetY -
      y
    ) /
    distance *
    projectileSpeed;


  const count =
    Math.min(
      5,
      1 +
      Math.floor(
        currentLevel / 4
      )
    );


  const middle =
    (
      count - 1
    ) / 2;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    createOrbProjectile(

      x,
      y,

      -projectileSpeed,

      aimVelocity +
      (
        i -
        middle
      ) *
      1.35 *
      multiplier

    );

  }


  bossAttackCooldown =

    Math.max(
      700,
      1250 -
      currentLevel * 32
    ) *

    getBossCooldownModifier() /

    multiplier;

}


function fireGroundBossAttack() {

  const multiplier =
    getGameplayMultiplier(
      "ground"
    );


  const blockedSide =
    bossSurfaceSide;


  bossSurfaceSide =
    oppositeSide(
      bossSurfaceSide
    );


  const H =
    getWorldHeight();


  const W =
    getWorldWidth();


  const height =
    Math.min(
      H * 0.24,
      100 +
      currentLevel * 4
    );


  const projectileSpeed =

    (
      4 +
      currentLevel * 0.085
    ) *

    multiplier *

    getBossProjectileModifier();


  createRectProjectile({

    x:W + 35,

    y:
      surfaceObstacleY(
        blockedSide,
        height
      ),

    width:60,

    height,

    vx:
      -projectileSpeed,

    vy:0,

    type:"bossBlock"

  });


  bossAttackCooldown =

    Math.max(
      1750,
      2450 -
      currentLevel * 38
    ) *

    getBossCooldownModifier() /

    multiplier;

}


function fireCorridorBossAttack(
  mode
) {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const multiplier =
    getGameplayMultiplier(
      mode
    );


  const playableTop =
    FLOOR_HEIGHT;


  const playableBottom =
    H -
    FLOOR_HEIGHT;


  const playableHeight =
    playableBottom -
    playableTop;


  let gapPercent =
    mode === "noTouch"
      ? 0.62
      : 0.68;


  gapPercent -=
    currentLevel * 0.003;


  gapPercent =
    Math.max(
      mode === "noTouch"
        ? 0.55
        : 0.60,

      gapPercent
    );


  const gapHeight =
    playableHeight *
    gapPercent;


  bossCorridorCenter +=
    (
      Math.random() -
      0.5
    ) *
    playableHeight *
    0.1;


  let minCenter =
    playableTop +
    gapHeight / 2 +
    18;


  let maxCenter =
    playableBottom -
    gapHeight / 2 -
    18;


  if (
    mode === "noGround"
  ) {

    maxCenter -=
      playableHeight *
      0.1;

  }


  if (
    mode === "noCeiling"
  ) {

    minCenter +=
      playableHeight *
      0.1;

  }


  bossCorridorCenter =
    Math.max(
      minCenter,
      Math.min(
        maxCenter,
        bossCorridorCenter
      )
    );


  const gapY =
    bossCorridorCenter -
    gapHeight / 2;


  const projectileSpeed =

    (
      3.5 +
      currentLevel * 0.075
    ) *

    multiplier *

    getBossProjectileModifier();


  const topHeight =
    gapY -
    playableTop;


  if (
    topHeight > 5
  ) {

    createRectProjectile({

      x:W + 35,

      y:playableTop,

      width:56,

      height:topHeight,

      vx:
        -projectileSpeed,

      vy:0,

      type:"bossGate"

    });

  }


  const bottomY =
    gapY +
    gapHeight;


  const bottomHeight =
    playableBottom -
    bottomY;


  if (
    bottomHeight > 5
  ) {

    createRectProjectile({

      x:W + 35,

      y:bottomY,

      width:56,

      height:bottomHeight,

      vx:
        -projectileSpeed,

      vy:0,

      type:"bossGate"

    });

  }


  bossAttackCooldown =

    Math.max(
      1250,
      1750 -
      currentLevel * 25
    ) *

    getBossCooldownModifier() /

    multiplier;

}


function createOrbProjectile(
  x,
  y,
  vx,
  vy
) {

  bossProjectiles.push({

    type:"orb",

    x,
    y,

    vx,
    vy,

    size:
      18 +
      Math.min(
        10,
        currentLevel
      ),

    rotation:0,

    rotationSpeed:
      0.08 *
      getGameplayMultiplier(
        bossMode
      )

  });

}


function createRectProjectile(
  data
) {

  bossProjectiles.push({

    type:data.type,

    x:data.x,
    y:data.y,

    width:data.width,
    height:data.height,

    vx:data.vx,
    vy:data.vy,

    rotation:0,
    rotationSpeed:0

  });

}


// ==========================================================
// BOSS COMPLETE
// ==========================================================

function defeatBoss() {

  if (
    !bossActive
  ) {

    return;

  }


  bossActive = false;

  running = false;

  bossProjectiles = [];


  bossHud.classList.add(
    "hidden"
  );


  createBossExplosion();


  const progress =
    getCurrentProgress();


  const completed =
    progress.completed[
      currentBaseMode
    ];


  if (
    !completed.includes(
      currentLevel
    )
  ) {

    completed.push(
      currentLevel
    );


    completed.sort(
      (
        a,
        b
      ) =>
        a - b
    );

  }


  const previouslyNoGround =
    progress.unlocks.noGround;


  const previouslyNoCeiling =
    progress.unlocks.noCeiling;


  repairProgressUnlocks(
    progress
  );


  saveDimensionProgress(
    currentDimension
  );


  renderAllLevelMenus();

  updateUI();


  if (

    currentBaseMode === "ground" &&

    allLevelsComplete(
      progress.completed.ground
    ) &&

    (
      !previouslyNoGround ||
      !previouslyNoCeiling
    )

  ) {

    hideAllScreens();

    modeRuleHud.classList.add(
      "hidden"
    );

    abilityHud.classList.add(
      "hidden"
    );

    dualModeUnlockScreen.classList.remove(
      "hidden"
    );

    return;

  }


  if (
    allCampaignsComplete()
  ) {

    hideAllScreens();


    masterCompleteText.textContent =
      "You completed all 80 levels in the " +
      dimensions[
        currentDimension
      ].name +
      ".";


    masterCompleteScreen.classList.remove(
      "hidden"
    );


    return;

  }


  showLevelComplete();

}


function createBossExplosion() {

  if (
    !boss
  ) {

    return;

  }


  if (
    particlesEnabled
  ) {

    const color =
      getModeColor(
        currentBaseMode
      );


    for (
      let i = 0;
      i < 90;
      i++
    ) {

      particles.push({

        x:
          boss.x +
          boss.width / 2,

        y:
          boss.y +
          boss.height / 2,

        vx:
          (
            Math.random() -
            0.5
          ) * 16,

        vy:
          (
            Math.random() -
            0.5
          ) * 16,

        life:50,

        size:
          3 +
          Math.random() * 7,

        color

      });

    }

  }


  if (
    screenShakeEnabled
  ) {

    screenShake = 22;

  }

}


// ==========================================================
// COLLISION
// ==========================================================

function rectangleCollision(
  ax,
  ay,
  aw,
  ah,
  bx,
  by,
  bw,
  bh
) {

  return (

    ax < bx + bw &&

    ax + aw > bx &&

    ay < by + bh &&

    ay + ah > by

  );

}


function checkObstacleCollision() {

  if (
    reviveInvulnerableMs > 0
  ) {

    return;

  }


  if (
    bossActive ||
    bossWarningMs > 0
  ) {

    return;

  }


  const hitbox =
    getPlayerHitbox();


  for (
    const obstacle of
    obstacles
  ) {

    if (
      rectangleCollision(

        hitbox.x,
        hitbox.y,
        hitbox.width,
        hitbox.height,

        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height

      )
    ) {

      gameOver(
        "obstacle"
      );


      return;

    }

  }

}


function checkBossCollision() {

  if (
    reviveInvulnerableMs > 0 ||
    !bossActive
  ) {

    return;

  }


  const hitbox =
    getPlayerHitbox();


  for (
    const projectile of
    bossProjectiles
  ) {

    if (
      projectile.type === "orb"
    ) {

      if (
        rectangleCollision(

          hitbox.x,
          hitbox.y,
          hitbox.width,
          hitbox.height,

          projectile.x -
          projectile.size / 2,

          projectile.y -
          projectile.size / 2,

          projectile.size,
          projectile.size

        )
      ) {

        gameOver(
          "boss"
        );


        return;

      }

    }


    else if (
      rectangleCollision(

        hitbox.x,
        hitbox.y,
        hitbox.width,
        hitbox.height,

        projectile.x,
        projectile.y,
        projectile.width,
        projectile.height

      )
    ) {

      gameOver(
        "boss"
      );


      return;

    }

  }

}


// ==========================================================
// COLLECT COLLISION
// ==========================================================

function checkSparkCollision() {

  const hitbox =
    getPlayerHitbox();


  for (
    let i =
      sparksOnScreen.length - 1;

    i >= 0;

    i--
  ) {

    const spark =
      sparksOnScreen[i];


    if (
      rectangleCollision(

        hitbox.x,
        hitbox.y,
        hitbox.width,
        hitbox.height,

        spark.x,
        spark.y,
        spark.size,
        spark.size

      )
    ) {

      let gained =
        spark.value;


      const bonusChance =
        getAbilityValue(
          "sparkBonusChance",
          0
        );


      if (
        Math.random() <
        bonusChance
      ) {

        gained++;

      }


      sparks +=
        gained;


      runSparks +=
        gained;


      createSparkBurst(
        spark
      );


      sparksOnScreen.splice(
        i,
        1
      );


      saveGlobalShop();

      updateUI();

    }

  }

}


function checkHeartCollision() {

  const hitbox =
    getPlayerHitbox();


  for (
    let i =
      heartsOnScreen.length - 1;

    i >= 0;

    i--
  ) {

    const heart =
      heartsOnScreen[i];


    if (
      rectangleCollision(

        hitbox.x,
        hitbox.y,
        hitbox.width,
        hitbox.height,

        heart.x,
        heart.y,
        heart.size,
        heart.size

      )
    ) {

      hearts++;


      heartsOnScreen.splice(
        i,
        1
      );


      createHeartBurst(
        heart
      );


      saveGlobalShop();

      updateUI();


      showGameMessage(
        "❤️ HEART FOUND!",
        "Added to your Heart inventory."
      );

    }

  }

}


// ==========================================================
// COLLECTION PARTICLES
// ==========================================================

function createSparkBurst(
  spark
) {

  if (
    !particlesEnabled
  ) {

    return;

  }


  const color =
    spark.kind === "blue"
      ? "#41caff"
      : "#ffe85a";


  const amount =
    spark.kind === "blue"
      ? 38
      : 24;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    particles.push({

      x:
        spark.x +
        spark.size / 2,

      y:
        spark.y +
        spark.size / 2,

      vx:
        (
          Math.random() -
          0.5
        ) * 10,

      vy:
        (
          Math.random() -
          0.5
        ) * 10,

      life:38,

      size:
        2 +
        Math.random() * 6,

      color

    });

  }

}


function createHeartBurst(
  heart
) {

  if (
    !particlesEnabled
  ) {

    return;

  }


  for (
    let i = 0;
    i < 36;
    i++
  ) {

    particles.push({

      x:
        heart.x +
        heart.size / 2,

      y:
        heart.y +
        heart.size / 2,

      vx:
        (
          Math.random() -
          0.5
        ) * 11,

      vy:
        (
          Math.random() -
          0.5
        ) * 11,

      life:42,

      size:
        2 +
        Math.random() * 6,

      color:"#ff4f86"

    });

  }

}


// ==========================================================
// GAME OVER
// ==========================================================

function gameOver(
  reason = "obstacle"
) {

  if (
    !running
  ) {

    return;

  }


  running = false;


  levelHud.classList.add(
    "hidden"
  );


  modeRuleHud.classList.add(
    "hidden"
  );


  abilityHud.classList.add(
    "hidden"
  );


  bossHud.classList.add(
    "hidden"
  );


  bossWarning.classList.add(
    "hidden"
  );


  if (
    screenShakeEnabled
  ) {

    screenShake = 18;

  }


  const finalScore =
    Math.floor(
      score
    );


  finalScoreElement.textContent =
    finalScore;


  runSparksElement.textContent =
    runSparks;


  newBestText.classList.add(
    "hidden"
  );


  const progress =
    getCurrentProgress();


  const previousBest =
    progress.best[
      currentBaseMode
    ];


  if (
    isSurvivalMode() &&
    finalScore >
    previousBest
  ) {

    progress.best[
      currentBaseMode
    ] =
      finalScore;


    newBestText.classList.remove(
      "hidden"
    );

  }


  const oldGround =
    progress.unlocks.ground;


  const oldNoTouch =
    progress.unlocks.noTouch;


  repairProgressUnlocks(
    progress
  );


  saveDimensionProgress(
    currentDimension
  );


  updateUI();


  if (
    !oldGround &&
    progress.unlocks.ground
  ) {

    hideAllScreens();


    groundUnlockDimensionName.textContent =
      dimensions[
        currentDimension
      ].name;


    groundUnlockScreen.classList.remove(
      "hidden"
    );


    return;

  }


  if (
    !oldNoTouch &&
    progress.unlocks.noTouch
  ) {

    hideAllScreens();


    noTouchUnlockScreen.classList.remove(
      "hidden"
    );


    return;

  }


  if (
    reason === "surface"
  ) {

    if (
      currentBaseMode === "noGround"
    ) {

      levelFailText.textContent =
        "🔥 You touched the forbidden ground.";

    }


    else if (
      currentBaseMode === "noCeiling"
    ) {

      levelFailText.textContent =
        "❄️ You touched the forbidden ceiling.";

    }


    else {

      levelFailText.textContent =
        "☠ You touched a forbidden surface.";

    }

  }


  else if (
    reason === "boss"
  ) {

    levelFailText.textContent =
      "👾 " +
      getBossName(
        currentBaseMode,
        currentLevel
      ) +
      " defeated you.";

  }


  else if (
    isLevelMode()
  ) {

    levelFailText.textContent =
      "🎯 Reach " +
      getLevelTarget(
        currentLevel
      ) +
      " and defeat the boss.";

  }


  else {

    levelFailText.textContent =
      dimensions[
        currentDimension
      ].icon +
      " " +
      modeConfig[
        currentBaseMode
      ].name +
      " Survival";

  }


  deathHeartCount.textContent =
    hearts;


  secondLifePanel.classList.remove(
    "hidden"
  );


  gameOverScreen.classList.remove(
    "hidden"
  );

}


// ==========================================================
// SECOND LIFE
// ==========================================================

function useSecondLife() {

  if (
    hearts <= 0
  ) {

    return;

  }


  if (
    gameOverScreen
      .classList
      .contains(
        "hidden"
      )
  ) {

    return;

  }


  hearts--;


  saveGlobalShop();


  hideAllScreens();


  running = true;


  reviveInvulnerableMs =
    2200 +
    getAbilityValue(
      "reviveBonusMs",
      0
    );


  const H =
    getWorldHeight();


  if (
    currentBaseMode === "ground"
  ) {

    player.y =
      getFloorY();


    player.gravityDirection =
      1;


    player.velocityY =
      0;

  }


  else if (
    currentBaseMode === "noGround"
  ) {

    player.y =
      FLOOR_HEIGHT + 10;


    player.gravityDirection =
      -1;


    player.velocityY =
      0;

  }


  else if (
    currentBaseMode === "noCeiling"
  ) {

    player.y =
      getFloorY() - 10;


    player.gravityDirection =
      1;


    player.velocityY =
      0;

  }


  else {

    player.y =
      H / 2 -
      player.height / 2;


    player.velocityY =
      0;

  }


  obstacles =
    obstacles.filter(
      obstacle =>
        obstacle.x <
          player.x - 180 ||
        obstacle.x >
          player.x + 500
    );


  bossProjectiles = [];

  heartsOnScreen = [];


  if (
    bossActive
  ) {

    bossHud.classList.remove(
      "hidden"
    );

  }


  if (
    isLevelMode() &&
    !bossActive
  ) {

    levelHud.classList.remove(
      "hidden"
    );

  }


  abilityHud.classList.remove(
    "hidden"
  );


  updateModeRuleHud();

  updateUI();


  showGameMessage(
    "❤️ SECOND LIFE!",
    "Temporary invulnerability activated."
  );

}


// ==========================================================
// LEVEL COMPLETE
// ==========================================================

function showLevelComplete() {

  hideAllScreens();


  levelHud.classList.add(
    "hidden"
  );


  modeRuleHud.classList.add(
    "hidden"
  );


  abilityHud.classList.add(
    "hidden"
  );


  completeScore.textContent =
    Math.floor(
      score
    );


  completeSparks.textContent =
    runSparks;


  completeIcon.textContent =
    currentLevel === MAX_LEVEL
      ? "👑"
      : modeConfig[
          currentBaseMode
        ].icon;


  levelCompleteText.textContent =
    dimensions[
      currentDimension
    ].icon +
    " " +
    dimensions[
      currentDimension
    ].name +
    " • " +
    modeConfig[
      currentBaseMode
    ].name +
    " Level " +
    currentLevel +
    " complete!";


  completeBadge.textContent =
    currentLevel === MAX_LEVEL
      ? "✓ CAMPAIGN COMPLETE"
      : "✓ BOSS DEFEATED";


  nextLevelButton.style.display =
    currentLevel >= MAX_LEVEL
      ? "none"
      : "inline-block";


  levelCompleteScreen.classList.remove(
    "hidden"
  );

}


// ==========================================================
// PARTICLE UPDATE
// ==========================================================

function updateParticles() {

  particles.forEach(
    particle => {

      particle.x +=
        particle.vx;


      particle.y +=
        particle.vy;


      particle.life--;


      particle.size *=
        0.97;

    }
  );


  particles =
    particles.filter(
      particle =>
        particle.life > 0
    );

}


// ==========================================================
// STARFIELD
// ==========================================================

function createStars() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  stars = [];


  for (
    let i = 0;
    i < 150;
    i++
  ) {

    stars.push({

      x:
        Math.random() * W,

      y:
        Math.random() * H,

      size:
        Math.random() * 2 +
        0.4,

      speed:
        Math.random() * 1.4 +
        0.25

    });

  }

}


function updateStars() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const multiplier =
    getGameplayMultiplier(
      currentBaseMode
    );


  stars.forEach(
    star => {

      star.x -=

        star.speed *
        multiplier +

        speed * 0.07;


      if (
        star.x < 0
      ) {

        star.x = W;

        star.y =
          Math.random() * H;

      }

    }
  );

}


// ==========================================================
// BACKGROUND DRAW
// ==========================================================

function getCurrentBackground() {

  return (
    backgrounds.find(
      item =>
        item.id ===
        selectedBackground
    ) ||
    backgrounds[0]
  );

}


function drawBackground() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const background =
    getCurrentBackground();


  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );


  gradient.addColorStop(
    0,
    background.colors[0]
  );


  gradient.addColorStop(
    0.5,
    background.colors[1]
  );


  gradient.addColorStop(
    1,
    background.colors[2]
  );


  ctx.fillStyle =
    gradient;


  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  drawStars();

}


function drawStars() {

  stars.forEach(
    star => {

      ctx.globalAlpha =
        0.65;


      ctx.fillStyle =
        "#ffffff";


      ctx.beginPath();


      ctx.arc(
        star.x,
        star.y,
        star.size,
        0,
        Math.PI * 2
      );


      ctx.fill();

    }
  );


  ctx.globalAlpha =
    1;

}


// ==========================================================
// MODE COLOR
// ==========================================================

function getModeColor(
  mode
) {

  if (
    mode === "ground"
  ) {

    return "#ffc247";

  }


  if (
    mode === "noGround"
  ) {

    return "#ff653d";

  }


  if (
    mode === "noCeiling"
  ) {

    return "#69d9ff";

  }


  if (
    mode === "noTouch"
  ) {

    return "#d478ff";

  }


  return "#34e7ff";

}


// ==========================================================
// WORLD
// ==========================================================

function drawWorld() {

  const W =
    getWorldWidth();


  const H =
    getWorldHeight();


  const color =
    getModeColor(
      currentBaseMode
    );


  let ceilingColor =
    "rgba(2,7,16,0.78)";


  let floorColor =
    "rgba(2,7,16,0.78)";


  if (
    modeElapsedMs >
    getSurfaceGraceTime()
  ) {

    if (
      currentBaseMode === "noGround" ||
      currentBaseMode === "noTouch"
    ) {

      floorColor =
        "rgba(100,0,20,0.9)";

    }


    if (
      currentBaseMode === "noCeiling" ||
      currentBaseMode === "noTouch"
    ) {

      ceilingColor =
        "rgba(100,0,20,0.9)";

    }

  }


  ctx.fillStyle =
    ceilingColor;


  ctx.fillRect(
    0,
    0,
    W,
    FLOOR_HEIGHT
  );


  ctx.fillStyle =
    floorColor;


  ctx.fillRect(
    0,
    H -
    FLOOR_HEIGHT,
    W,
    FLOOR_HEIGHT
  );


  ctx.fillStyle =
    color;


  ctx.shadowBlur =
    12;


  ctx.shadowColor =
    color;


  ctx.fillRect(
    0,
    FLOOR_HEIGHT,
    W,
    4
  );


  ctx.fillRect(
    0,
    H -
    FLOOR_HEIGHT -
    4,
    W,
    4
  );


  ctx.shadowBlur =
    0;


  ctx.strokeStyle =
    color;


  ctx.globalAlpha =
    0.1;


  const offset =
    (
      frame *
      Math.max(
        speed,
        1
      )
    ) % 80;


  for (
    let x = -offset;
    x < W;
    x += 80
  ) {

    ctx.beginPath();


    ctx.moveTo(
      x,
      FLOOR_HEIGHT
    );


    ctx.lineTo(
      x,
      H -
      FLOOR_HEIGHT
    );


    ctx.stroke();

  }


  ctx.globalAlpha =
    1;

}


// ==========================================================
// PLAYER COLOR
// ==========================================================

function getSelectedColor() {

  if (
    selectedColor === "rainbow"
  ) {

    return (
      "hsl(" +
      (
        frame * 4
      ) %
      360 +
      ",100%,60%)"
    );

  }


  if (
    selectedColor === "plasma"
  ) {

    return (
      "hsl(" +
      (
        290 +
        Math.sin(
          frame * 0.08
        ) * 45
      ) +
      ",100%,60%)"
    );

  }


  const found =
    characterColors.find(
      item =>
        item.id ===
        selectedColor
    );


  return found
    ? found.color
    : "#34e7ff";

}


// ==========================================================
// PLAYER DRAW
// ==========================================================

function drawPlayer() {

  const color =
    getSelectedColor();


  const icon =
    characterIcons.find(
      item =>
        item.id ===
        selectedIcon
    );


  const symbol =
    icon?.symbol || "■";


  ctx.save();


  ctx.translate(

    player.x +
    player.width / 2,

    player.y +
    player.height / 2

  );


  ctx.rotate(
    player.rotation
  );


  if (
    reviveInvulnerableMs > 0
  ) {

    ctx.globalAlpha =
      0.45 +
      Math.abs(
        Math.sin(
          frame * 0.25
        )
      ) * 0.55;


    ctx.strokeStyle =
      "#ffffff";


    ctx.lineWidth =
      3;


    ctx.beginPath();


    ctx.arc(
      0,
      0,
      30,
      0,
      Math.PI * 2
    );


    ctx.stroke();

  }


  ctx.shadowBlur =
    27;


  ctx.shadowColor =
    color;


  ctx.fillStyle =
    color;


  if (
    selectedIcon === "square"
  ) {

    ctx.fillRect(
      -21,
      -21,
      42,
      42
    );

  }


  else if (
    selectedIcon === "circle"
  ) {

    ctx.beginPath();


    ctx.arc(
      0,
      0,
      21,
      0,
      Math.PI * 2
    );


    ctx.fill();

  }


  else if (
    selectedIcon === "diamond"
  ) {

    ctx.beginPath();

    ctx.moveTo(0,-22);
    ctx.lineTo(22,0);
    ctx.lineTo(0,22);
    ctx.lineTo(-22,0);

    ctx.closePath();

    ctx.fill();

  }


  else if (
    selectedIcon === "triangle"
  ) {

    ctx.beginPath();

    ctx.moveTo(0,-23);
    ctx.lineTo(22,20);
    ctx.lineTo(-22,20);

    ctx.closePath();

    ctx.fill();

  }


  else {

    ctx.font =
      "bold 34px Arial";


    ctx.textAlign =
      "center";


    ctx.textBaseline =
      "middle";


    ctx.fillText(
      symbol,
      0,
      1
    );

  }


  ctx.globalAlpha =
    1;


  ctx.shadowBlur =
    0;


  ctx.fillStyle =
    "#ffffff";


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    3.5,
    0,
    Math.PI * 2
  );


  ctx.fill();


  ctx.restore();

}


// ==========================================================
// OBSTACLE DESIGN
// ==========================================================

function getObstacleDesign() {

  return (
    obstacleDesigns.find(
      item =>
        item.id ===
        selectedObstacleDesign
    ) ||
    obstacleDesigns[0]
  );

}


function drawObstacleSkin(
  x,
  y,
  width,
  height
) {

  const design =
    getObstacleDesign();


  ctx.save();


  ctx.shadowBlur =
    14;


  ctx.shadowColor =
    design.accent;


  const gradient =
    ctx.createLinearGradient(
      x,
      y,
      x + width,
      y + height
    );


  gradient.addColorStop(
    0,
    design.base
  );


  gradient.addColorStop(
    1,
    design.accent
  );


  ctx.fillStyle =
    gradient;


  ctx.fillRect(
    x,
    y,
    width,
    height
  );


  ctx.shadowBlur =
    0;


  ctx.strokeStyle =
    design.accent;


  ctx.lineWidth =
    2;


  ctx.globalAlpha =
    0.8;


  ctx.strokeRect(

    x + 2,
    y + 2,

    Math.max(
      0,
      width - 4
    ),

    Math.max(
      0,
      height - 4
    )

  );


  // NO STRIPES OVER BLOCK DESIGNS.

  ctx.globalAlpha =
    0.10;


  ctx.fillStyle =
    "#ffffff";


  ctx.fillRect(

    x + 4,
    y + 4,

    Math.max(
      0,
      width - 8
    ),

    Math.min(
      5,
      Math.max(
        0,
        height - 8
      )
    )

  );


  ctx.globalAlpha =
    1;


  ctx.restore();

}


function drawObstacles() {

  obstacles.forEach(
    obstacle => {

      drawObstacleSkin(

        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height

      );

    }
  );

}


// ==========================================================
// BOSS DRAW
// ==========================================================

function getBossFace(
  level
) {

  if (
    level === 1
  ) {

    return "🙂";

  }


  if (
    level <= 3
  ) {

    return "😐";

  }


  if (
    level <= 6
  ) {

    return "😠";

  }


  if (
    level <= 10
  ) {

    return "😡";

  }


  if (
    level <= 13
  ) {

    return "👿";

  }


  if (
    level <= 15
  ) {

    return "👹";

  }


  return "🤬";

}


function drawBoss() {

  if (
    !bossActive ||
    !boss
  ) {

    return;

  }


  const color =
    getModeColor(
      bossMode
    );


  ctx.save();


  ctx.translate(

    boss.x +
    boss.width / 2,

    boss.y +
    boss.height / 2

  );


  const scale =
    1 +
    currentLevel * 0.018;


  ctx.scale(
    scale,
    scale
  );


  ctx.globalAlpha =
    0.16;


  ctx.fillStyle =
    color;


  ctx.beginPath();


  ctx.arc(

    0,
    0,

    62 +
    Math.sin(
      boss.pulse
    ) * 7,

    0,

    Math.PI * 2

  );


  ctx.fill();


  ctx.globalAlpha =
    1;


  const gradient =
    ctx.createRadialGradient(

      -12,
      -15,
      4,

      0,
      0,
      53

    );


  gradient.addColorStop(
    0,
    "#ffffff"
  );


  gradient.addColorStop(
    0.25,
    color
  );


  gradient.addColorStop(
    1,
    "#18000c"
  );


  ctx.shadowBlur =
    30;


  ctx.shadowColor =
    color;


  ctx.fillStyle =
    gradient;


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    46,
    0,
    Math.PI * 2
  );


  ctx.fill();


  ctx.shadowBlur =
    0;


  ctx.font =
    "38px Arial";


  ctx.textAlign =
    "center";


  ctx.textBaseline =
    "middle";


  ctx.fillText(
    getBossFace(
      currentLevel
    ),
    0,
    2
  );


  ctx.restore();

}


function drawBossProjectiles() {

  bossProjectiles.forEach(
    projectile => {

      if (
        projectile.type === "orb"
      ) {

        ctx.save();


        ctx.translate(
          projectile.x,
          projectile.y
        );


        ctx.rotate(
          projectile.rotation
        );


        ctx.shadowBlur =
          20;


        ctx.shadowColor =
          "#ff315f";


        ctx.fillStyle =
          "#ff315f";


        const half =
          projectile.size / 2;


        ctx.beginPath();

        ctx.moveTo(0,-half);
        ctx.lineTo(half,0);
        ctx.lineTo(0,half);
        ctx.lineTo(-half,0);

        ctx.closePath();

        ctx.fill();


        ctx.restore();

      }


      else {

        drawObstacleSkin(

          projectile.x,
          projectile.y,
          projectile.width,
          projectile.height

        );

      }

    }
  );

}


// ==========================================================
// SPARK DRAW
// ==========================================================

function drawSparks() {

  sparksOnScreen.forEach(
    spark => {

      ctx.save();


      ctx.translate(

        spark.x +
        spark.size / 2,

        spark.y +
        spark.size / 2

      );


      ctx.rotate(
        spark.rotation
      );


      const scale =
        1 +
        Math.sin(
          spark.pulse
        ) * 0.15;


      ctx.scale(
        scale,
        scale
      );


      if (
        spark.kind === "blue"
      ) {

        ctx.shadowBlur =
          40;


        ctx.shadowColor =
          "#3bc7ff";


        ctx.fillStyle =
          "#48cfff";

      }


      else {

        ctx.shadowBlur =
          27;


        ctx.shadowColor =
          "#ffe85a";


        ctx.fillStyle =
          "#ffe85a";

      }


      const half =
        spark.size / 2;


      ctx.beginPath();

      ctx.moveTo(0,-half);
      ctx.lineTo(half,0);
      ctx.lineTo(0,half);
      ctx.lineTo(-half,0);

      ctx.closePath();

      ctx.fill();


      ctx.shadowBlur =
        0;


      ctx.fillStyle =
        "#ffffff";


      ctx.beginPath();


      ctx.arc(
        0,
        0,
        4,
        0,
        Math.PI * 2
      );


      ctx.fill();


      if (
        spark.kind === "blue"
      ) {

        ctx.fillStyle =
          "#06345f";


        ctx.font =
          "bold 10px Arial";


        ctx.textAlign =
          "center";


        ctx.textBaseline =
          "middle";


        ctx.fillText(
          spark.value,
          0,
          1
        );

      }


      ctx.restore();

    }
  );

}


// ==========================================================
// HEART DRAW
// ==========================================================

function drawHearts() {

  heartsOnScreen.forEach(
    heart => {

      ctx.save();


      ctx.translate(

        heart.x +
        heart.size / 2,

        heart.y +
        heart.size / 2

      );


      const pulseScale =
        1 +
        Math.sin(
          heart.pulse
        ) * 0.12;


      ctx.scale(
        pulseScale,
        pulseScale
      );


      ctx.shadowBlur =
        30;


      ctx.shadowColor =
        "#ff4f86";


      ctx.fillStyle =
        "#ff4f86";


      ctx.font =
        "bold 34px Arial";


      ctx.textAlign =
        "center";


      ctx.textBaseline =
        "middle";


      ctx.fillText(
        "♥",
        0,
        1
      );


      ctx.restore();

    }
  );

}


// ==========================================================
// PARTICLE DRAW
// ==========================================================

function drawParticles() {

  particles.forEach(
    particle => {

      ctx.globalAlpha =
        Math.max(
          0,
          particle.life / 50
        );


      ctx.fillStyle =
        particle.color;


      ctx.fillRect(

        particle.x,
        particle.y,
        particle.size,
        particle.size

      );

    }
  );


  ctx.globalAlpha = 1;

}


// ==========================================================
// MESSAGES
// ==========================================================

let gameMessageTimeout =
  null;


function showGameMessage(
  title,
  text
) {

  gameMessageTitle.textContent =
    title;


  gameMessageText.textContent =
    text;


  gameMessage.classList.remove(
    "hidden"
  );


  if (
    gameMessageTimeout
  ) {

    clearTimeout(
      gameMessageTimeout
    );

  }


  gameMessageTimeout =
    setTimeout(
      () => {

        gameMessage.classList.add(
          "hidden"
        );

      },
      1200
    );

}


function checkSpeedMilestone() {

  if (
    !isSurvivalMode()
  ) {

    return;

  }


  const step =
    modeConfig[
      currentBaseMode
    ].survivalStep;


  const milestone =
    Math.floor(
      score / step
    );


  if (
    milestone >
    lastSpeedMilestone
  ) {

    lastSpeedMilestone =
      milestone;


    if (
      milestone > 0
    ) {

      showGameMessage(
        "⚡ SPEED UP!",
        "Survival just became faster."
      );

    }

  }

}


// ==========================================================
// SHOP RENDER
// ==========================================================

function renderDimensionShop() {

  dimensionShopItems.innerHTML =
    "";


  [
    "normal",
    "mirror",
    "down",
    "up"
  ]
  .forEach(
    dimensionId => {

      const dimension =
        dimensions[
          dimensionId
        ];


      const owned =
        ownedDimensions.includes(
          dimensionId
        );


      const active =
        currentDimension ===
        dimensionId;


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "dimension-shop-item";


      if (
        active
      ) {

        card.classList.add(
          "active"
        );

      }


      card.innerHTML =
        `
          <div class="dimension-shop-icon">
            ${dimension.icon}
          </div>

          <h4>
            ${dimension.name}
          </h4>

          <p>
            ${dimension.shopDescription}
          </p>

          <span class="dimension-price">
            ${
              dimension.price === 0
                ? "FREE"
                : "💎 " +
                  dimension.price.toLocaleString()
            }
          </span>
        `;


      const button =
        document.createElement(
          "button"
        );


      if (
        active
      ) {

        button.textContent =
          "✓ ACTIVE";


        button.disabled =
          true;


        button.classList.add(
          "equipped"
        );

      }


      else if (
        owned
      ) {

        button.textContent =
          "ENTER";


        button.addEventListener(
          "click",
          () => {

            switchDimension(
              dimensionId
            );

          }
        );

      }


      else {

        button.textContent =
          "BUY & ENTER";


        if (
          sparks <
          dimension.price
        ) {

          button.classList.add(
            "cant-afford"
          );

        }


        button.addEventListener(
          "click",
          () => {

            buyDimension(
              dimensionId
            );

          }
        );

      }


      card.appendChild(
        button
      );


      dimensionShopItems.appendChild(
        card
      );

    }
  );

}


function createShopButton(
  owned,
  equipped,
  price,
  callback
) {

  const button =
    document.createElement(
      "button"
    );


  if (
    equipped
  ) {

    button.textContent =
      "✓ EQUIPPED";


    button.classList.add(
      "equipped"
    );

  }


  else if (
    owned
  ) {

    button.textContent =
      "EQUIP";

  }


  else {

    button.textContent =
      "BUY";


    if (
      sparks < price
    ) {

      button.classList.add(
        "cant-afford"
      );

    }

  }


  button.addEventListener(
    "click",
    callback
  );


  return button;

}


function renderColorShop() {

  colorShopItems.innerHTML =
    "";


  characterColors.forEach(
    item => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "shop-item";


      const preview =
        document.createElement(
          "div"
        );


      preview.className =
        "color-preview";


      if (
        item.rainbow
      ) {

        preview.classList.add(
          "rainbow-preview"
        );

      }


      else {

        preview.style.background =
          item.color;

      }


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        item.name;


      const price =
        document.createElement(
          "p"
        );


      price.textContent =
        item.price === 0
          ? "FREE"
          : "💎 " +
            item.price;


      const button =
        createShopButton(

          ownedColors.includes(
            item.id
          ),

          selectedColor ===
          item.id,

          item.price,

          () => {

            buyCosmetic(
              "color",
              item
            );

          }

        );


      card.append(
        preview,
        title,
        price,
        button
      );


      colorShopItems.appendChild(
        card
      );

    }
  );

}


function renderIconShop() {

  iconShopItems.innerHTML =
    "";


  characterIcons.forEach(
    item => {

      const ability =
        iconAbilities[
          item.id
        ];


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "icon-shop-card";


      const preview =
        document.createElement(
          "div"
        );


      preview.className =
        "icon-preview";


      preview.textContent =
        item.symbol;


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        item.name;


      const price =
        document.createElement(
          "span"
        );


      price.className =
        "icon-price";


      price.textContent =
        item.price === 0
          ? "FREE"
          : "💎 " +
            item.price;


      const abilityBox =
        document.createElement(
          "div"
        );


      abilityBox.className =
        "icon-ability";


      abilityBox.innerHTML =
        `
          <strong>
            ⚡ ${ability.name}
          </strong>

          <small>
            ${ability.description}
          </small>
        `;


      const button =
        createShopButton(

          ownedIcons.includes(
            item.id
          ),

          selectedIcon ===
          item.id,

          item.price,

          () => {

            buyCosmetic(
              "icon",
              item
            );

          }

        );


      card.append(
        preview,
        title,
        price,
        abilityBox,
        button
      );


      iconShopItems.appendChild(
        card
      );

    }
  );

}


function renderObstacleShop() {

  obstacleShopItems.innerHTML =
    "";


  obstacleDesigns.forEach(
    item => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "shop-item";


      const preview =
        document.createElement(
          "div"
        );


      preview.className =
        "obstacle-preview";


      preview.style.background =
        item.preview;


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        item.name;


      const price =
        document.createElement(
          "p"
        );


      price.textContent =
        item.price === 0
          ? "FREE"
          : "💎 " +
            item.price;


      const button =
        createShopButton(

          ownedObstacleDesigns.includes(
            item.id
          ),

          selectedObstacleDesign ===
          item.id,

          item.price,

          () => {

            buyCosmetic(
              "obstacle",
              item
            );

          }

        );


      card.append(
        preview,
        title,
        price,
        button
      );


      obstacleShopItems.appendChild(
        card
      );

    }
  );

}


function renderBackgroundShop() {

  backgroundShopItems.innerHTML =
    "";


  backgrounds.forEach(
    item => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "background-item";


      const preview =
        document.createElement(
          "div"
        );


      preview.className =
        "background-preview";


      preview.style.background =
        item.preview;


      const info =
        document.createElement(
          "div"
        );


      info.className =
        "background-info";


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        item.name;


      const price =
        document.createElement(
          "p"
        );


      price.textContent =
        item.price === 0
          ? "FREE"
          : "💎 " +
            item.price;


      const button =
        createShopButton(

          ownedBackgrounds.includes(
            item.id
          ),

          selectedBackground ===
          item.id,

          item.price,

          () => {

            buyCosmetic(
              "background",
              item
            );

          }

        );


      info.append(
        title,
        price,
        button
      );


      card.append(
        preview,
        info
      );


      backgroundShopItems.appendChild(
        card
      );

    }
  );

}


function buyCosmetic(
  category,
  item
) {

  let ownedArray;


  if (
    category === "color"
  ) {

    ownedArray =
      ownedColors;

  }


  else if (
    category === "icon"
  ) {

    ownedArray =
      ownedIcons;

  }


  else if (
    category === "obstacle"
  ) {

    ownedArray =
      ownedObstacleDesigns;

  }


  else {

    ownedArray =
      ownedBackgrounds;

  }


  if (
    !ownedArray.includes(
      item.id
    )
  ) {

    if (
      sparks <
      item.price
    ) {

      alert(
        "You need more Sparks!"
      );


      return;

    }


    sparks -=
      item.price;


    ownedArray.push(
      item.id
    );

  }


  if (
    category === "color"
  ) {

    selectedColor =
      item.id;

  }


  else if (
    category === "icon"
  ) {

    selectedIcon =
      item.id;

  }


  else if (
    category === "obstacle"
  ) {

    selectedObstacleDesign =
      item.id;

  }


  else {

    selectedBackground =
      item.id;

  }


  saveGlobalShop();

  renderShop();

}


function renderShop() {

  renderDimensionShop();

  renderColorShop();

  renderIconShop();

  renderObstacleShop();

  renderBackgroundShop();

  updateUI();

}


// ==========================================================
// GAME LOOP
// ==========================================================

function gameLoop(
  now
) {

  const deltaMs =
    Math.min(
      50,
      Math.max(
        0,
        now -
        previousLoopTime
      )
    );


  previousLoopTime =
    now;


  if (
    running
  ) {

    modeElapsedMs +=
      deltaMs;


    if (
      reviveInvulnerableMs > 0
    ) {

      reviveInvulnerableMs -=
        deltaMs;

    }


    updatePlayer();


    if (
      running
    ) {

      updateObstacles();

    }


    if (
      running
    ) {

      updateCollectibles();

    }


    if (
      running
    ) {

      updateBoss(
        deltaMs
      );

    }


    updateParticles();

    updateStars();


    if (
      running
    ) {

      checkObstacleCollision();

    }


    if (
      running
    ) {

      checkBossCollision();

    }


    if (
      running
    ) {

      checkSparkCollision();

    }


    if (
      running
    ) {

      checkHeartCollision();

    }


    if (
      running
    ) {

      if (
        !bossActive &&
        bossWarningMs <= 0
      ) {

        score +=

          SCORE_RATE *

          getAbilityValue(
            "scoreMult",
            1
          );

      }


      scoreElement.textContent =
        Math.floor(
          score
        );


      if (
        isSurvivalMode()
      ) {

        speed =
          getSurvivalSpeed(

            currentBaseMode,

            score

          );


        checkSpeedMilestone();

      }


      else {

        speed =
          getLevelSpeed(

            currentBaseMode,

            currentLevel

          );

      }


      if (

        isLevelMode() &&

        !bossActive &&

        bossWarningMs <= 0 &&

        score >=
        getLevelTarget(
          currentLevel
        )

      ) {

        startBossWarning();

      }

    }

  }


  ctx.save();


  if (
    screenShake > 0
  ) {

    ctx.translate(

      (
        Math.random() -
        0.5
      ) *
      screenShake,

      (
        Math.random() -
        0.5
      ) *
      screenShake

    );


    screenShake *=
      0.85;

  }


  applyDimensionTransform();


  drawBackground();

  drawWorld();

  drawObstacles();

  drawSparks();

  drawHearts();

  drawBoss();

  drawBossProjectiles();

  drawParticles();

  drawPlayer();


  ctx.restore();


  requestAnimationFrame(
    gameLoop
  );

}


// ==========================================================
// RESTART
// ==========================================================

function restartCurrentGame() {

  if (
    isSurvivalMode()
  ) {

    startSurvival(
      currentBaseMode
    );

  }


  else if (
    isLevelMode()
  ) {

    startLevel(

      currentBaseMode,

      currentLevel

    );

  }

}


function startNextLevel() {

  if (
    currentLevel >=
    MAX_LEVEL
  ) {

    return;

  }


  startLevel(

    currentBaseMode,

    currentLevel + 1

  );

}


// ==========================================================
// BUTTONS
// ==========================================================

classicModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "classic"
    )
);


groundModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "ground"
    )
);


noGroundModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noGround"
    )
);


noCeilingModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noCeiling"
    )
);


noTouchModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noTouch"
    )
);


// SURVIVAL

classicSurvivalButton.addEventListener(
  "click",
  () =>
    startSurvival(
      "classic"
    )
);


groundSurvivalButton.addEventListener(
  "click",
  () =>
    startSurvival(
      "ground"
    )
);


noGroundSurvivalButton.addEventListener(
  "click",
  () =>
    startSurvival(
      "noGround"
    )
);


noCeilingSurvivalButton.addEventListener(
  "click",
  () =>
    startSurvival(
      "noCeiling"
    )
);


noTouchSurvivalButton.addEventListener(
  "click",
  () =>
    startSurvival(
      "noTouch"
    )
);


// LEVEL MENUS

classicLevelsButton.addEventListener(
  "click",
  () =>
    openLevelMenu(
      "classic"
    )
);


groundLevelsButton.addEventListener(
  "click",
  () =>
    openLevelMenu(
      "ground"
    )
);


noGroundLevelsButton.addEventListener(
  "click",
  () =>
    openLevelMenu(
      "noGround"
    )
);


noCeilingLevelsButton.addEventListener(
  "click",
  () =>
    openLevelMenu(
      "noCeiling"
    )
);


noTouchLevelsButton.addEventListener(
  "click",
  () =>
    openLevelMenu(
      "noTouch"
    )
);


// LEVEL BACK

classicLevelsBackButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "classic"
    )
);


groundLevelsBackButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "ground"
    )
);


noGroundLevelsBackButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noGround"
    )
);


noCeilingLevelsBackButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noCeiling"
    )
);


noTouchLevelsBackButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noTouch"
    )
);


// BACK

document
  .querySelectorAll(
    '.backButton[data-back="main"]'
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        openMainMenu
      );

    }
  );


// DIMENSIONS

dimensionButton.addEventListener(
  "click",
  openDimensionMenu
);


dimensionBadge.addEventListener(
  "click",
  () => {

    if (
      !running
    ) {

      openDimensionMenu();

    }

  }
);


dimensionBackButton.addEventListener(
  "click",
  openMainMenu
);


// SHOP

shopButton.addEventListener(
  "click",
  () => {

    hideAllScreens();

    renderShop();

    shopMenu.classList.remove(
      "hidden"
    );

  }
);


buyHeartButton.addEventListener(
  "click",
  buyHeart
);


// OPTIONS

optionsButton.addEventListener(
  "click",
  () => {

    hideAllScreens();

    optionsMenu.classList.remove(
      "hidden"
    );

  }
);


shakeToggle.addEventListener(
  "click",
  () => {

    screenShakeEnabled =
      !screenShakeEnabled;


    localStorage.setItem(
      "gravityFlipShake",
      String(
        screenShakeEnabled
      )
    );


    updateUI();

  }
);


particlesToggle.addEventListener(
  "click",
  () => {

    particlesEnabled =
      !particlesEnabled;


    localStorage.setItem(
      "gravityFlipParticles",
      String(
        particlesEnabled
      )
    );


    updateUI();

  }
);


// GAME OVER

useHeartButton.addEventListener(
  "click",
  useSecondLife
);


restartButton.addEventListener(
  "click",
  restartCurrentGame
);


gameOverMenuButton.addEventListener(
  "click",
  openMainMenu
);


// LEVEL COMPLETE

nextLevelButton.addEventListener(
  "click",
  startNextLevel
);


replayLevelButton.addEventListener(
  "click",
  () => {

    startLevel(

      currentBaseMode,

      currentLevel

    );

  }
);


levelCompleteMenuButton.addEventListener(
  "click",
  openMainMenu
);


// UNLOCK SCREENS

enterGroundModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "ground"
    )
);


groundUnlockMenuButton.addEventListener(
  "click",
  openMainMenu
);


enterNoGroundModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noGround"
    )
);


enterNoCeilingModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noCeiling"
    )
);


dualUnlockMenuButton.addEventListener(
  "click",
  openMainMenu
);


enterNoTouchModeButton.addEventListener(
  "click",
  () =>
    openModeMenu(
      "noTouch"
    )
);


noTouchUnlockMenuButton.addEventListener(
  "click",
  openMainMenu
);


masterCompleteMenuButton.addEventListener(
  "click",
  openMainMenu
);


// ==========================================================
// KEYBOARD
// ==========================================================

document.addEventListener(
  "keydown",
  event => {

    // R RESTARTS ONLY ON GAME OVER.

    if (
      event.code === "KeyR"
    ) {

      if (
        !gameOverScreen
          .classList
          .contains(
            "hidden"
          )
      ) {

        event.preventDefault();

        restartCurrentGame();

      }


      return;

    }


    // SPACE NEVER RESTARTS.

    if (

      event.code === "Space" ||

      event.code === "KeyW" ||

      event.code === "ArrowUp"

    ) {

      if (
        running
      ) {

        event.preventDefault();

        flipGravity();

      }


      return;

    }


    if (
      event.code === "Escape"
    ) {

      openMainMenu();

    }

  }
);


// ==========================================================
// MOUSE + TOUCH
// ==========================================================

canvas.addEventListener(
  "mousedown",
  () => {

    if (
      running
    ) {

      flipGravity();

    }

  }
);


canvas.addEventListener(
  "touchstart",
  event => {

    if (
      running
    ) {

      event.preventDefault();

      flipGravity();

    }

  },
  {
    passive:false
  }
);


// ==========================================================
// SAVE REPAIR
// ==========================================================

repairProgressUnlocks(
  normalDimensionProgress
);

repairProgressUnlocks(
  mirrorDimensionProgress
);

repairProgressUnlocks(
  downDimensionProgress
);

repairProgressUnlocks(
  upDimensionProgress
);


saveDimensionProgress(
  "normal"
);

saveDimensionProgress(
  "mirror"
);

saveDimensionProgress(
  "down"
);

saveDimensionProgress(
  "up"
);


saveGlobalShop();


// ==========================================================
// INITIALIZE
// ==========================================================

createStars();

resetPlayer();

renderAllLevelMenus();

renderShop();

renderDimensionMenu();

updateUI();

openMainMenu();


requestAnimationFrame(
  gameLoop
);