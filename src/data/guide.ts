export type Ignition = "carried" | "spark" | "coal" | "sun" | "compression" | "flame";

export type EraGroup = "before" | "stone" | "machine" | "metal" | "modern";

export type Step = { title: string; body: string };
export type Fault = { problem: string; fix: string };
export type KitItem = { item: string; note: string };
export type Drill = { title: string; goal: string; steps: string[]; success: string };

type LessonBase = {
  id: string;
  name: string;
  epithet: string;
  summary: string;
  principle: string;
  kit: KitItem[];
  steps: Step[];
  faults: Fault[];
  drill: Drill;
  caution?: string;
};

export type Craft = LessonBase;

export type Method = LessonBase & {
  number: number;
  eraGroup: EraGroup;
  era: string;
  circa: string;
  origin: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  ignition: Ignition;
  weather: string;
  learn: string;
  practiceRank: number;
  place: string;
};

export const difficultyLabel = ["", "Easy", "Fair", "Hard", "Stern", "Severe"] as const;

export const ignitionLabel: Record<Ignition, string> = {
  carried: "Kept coal",
  spark: "Spark",
  coal: "Friction coal",
  sun: "Focused sunlight",
  compression: "Compression coal",
  flame: "Open flame",
};

export const eraGroups: { id: EraGroup; label: string }[] = [
  { id: "before", label: "Before a fire-making tool" },
  { id: "stone", label: "Stone and simple friction" },
  { id: "machine", label: "The wooden machines" },
  { id: "metal", label: "Metal, sun, and pressure" },
  { id: "modern", label: "From the match to the battery" },
];

export const craft: Craft = {
  id: "craft",
  name: "The craft under every fire",
  epithet: "Ignition is half the skill. The lay is the other half.",
  summary:
    "Every method on this line only solves one problem: a coal, a spark, or a flame. The fire you build around it is the same craft whether the year is deep prehistory or this weekend. Learn the lay before you chase a harder ignition.",
  principle:
    "Fire needs heat, fuel, and air, in a size order. A coal or spark is the heat. Tinder takes that heat. Kindling takes the tinder. Fuel takes the kindling. Skip a rung and the fire goes out.",
  kit: [
    { item: "A legal place", note: "An existing, designated fire ring when one is there. A fire pan only where the site allows it. Bare soil is not a free pass. If you are not sure the fire is allowed, it is not." },
    { item: "Enough water", note: "More than one bottle. A full bottle may not put a fire out. Set the water down before you light anything." },
    { item: "A shovel", note: "To stir ashes, coals, and sticks while you drown the fire." },
    { item: "Tinder", note: "Dry, fine, and airy. Jute, cotton, dry grass, inner bark from dead wood, or cedar curls." },
    { item: "Kindling", note: "Pencil to thumb thickness, split so the dry inside shows. A handful, not three sticks." },
    { item: "Fuel", note: "Wrist thick, then larger. Add it only after the kindling is really burning." },
    { item: "A bag", note: "Dry tinder lives in a pocket or tin. The ground is a wet place to store it." },
  ],
  steps: [
    {
      title: "Choose the ground",
      body: "Prefer an existing, designated fire ring. Do not start a new scar, and do not treat any cleared patch as suitable. Where no ring exists, a fire pan is the alternative only if the site allows it, on mineral soil, not duff, not roots, not a stump. Look up: no low branches. Look around: nothing that can catch a spark. If the day is hazardously dry or windy, skip the flame. The Forest Service advises using an existing ring and not making fires in those conditions. Practice the lays cold instead.",
    },
    {
      title: "Build the ladder before the flame",
      body: "Sort three piles. Tinder is hair-fine and fluffy, shaped like a bird's nest, loose enough that you can blow through it. Kindling is split and dry. Fuel waits off to the side, not in a heap on the tinder. If you light first and gather second, you will hold a dying flame and have nothing to feed it.",
    },
    {
      title: "Learn three lays cold",
      body: "Teepee: tinder in the middle, kindling leaned into a cone. Lots of air. This is the lay for a new coal or a match. Lean-to: one wrist-thick stick on the windward side, tinder underneath, kindling stacked against the stick. This is the lay for a breeze. Top-down: big wood on the bottom, kindling above it, tinder on top. It burns downward and needs less tending. It is a poor home for a fragile coal.",
    },
    {
      title: "From coal or spark to flame",
      body: "Slide the coal into the nest on the leaf or bark it already sits on. Fold the nest loosely. Tight smothers it. Loose drops it. Hold it out of the wind and blow with long breaths, not blasts. When it flashes, lay it into the teepee you already built. Do not start building the teepee while the nest is burning in your hands.",
    },
    {
      title: "Put it out like you mean it",
      body: "Drown the fire thoroughly. Stir the ashes, coals, and sticks with a shovel, then add water and stir again. Keep going until everything is cold. Do not put a hand close to the ash to check. Do not bury coals or cover them with dirt or sand. Buried embers can keep smoldering. That is the National Park Service method: water, stir, more water, until it is cold, and never buried. Never leave a fire, even a small one, without a person watching it. If you have to walk away, put it out first.",
    },
  ],
  faults: [
    { problem: "The flame dies at the kindling.", fix: "The sticks are too thick, unsplit, or wet inside. Split them. Add smaller pieces. Give the cone more air, not more wood." },
    { problem: "Lots of smoke, no flame.", fix: "Fuel is damp, or the lay is packed into a solid mass. Open it up. Smoke is unburned fuel. It wants air and drier wood." },
    { problem: "The tinder bundle will not flash.", fix: "It is too tight, too coarse, or damp. Tease it apart. Add finer fiber. Blow steadily from underneath the coal, not a blast that throws the coal out." },
    { problem: "Sparks keep missing.", fix: "The tinder is in the wrong place. Move the tinder to the sparks. Do not try to steer sparks across a wide gap." },
  ],
  drill: {
    title: "Three cold lays",
    goal: "Build a teepee, a lean-to, and a top-down lay without lighting them. Then, where fire is legal and the day is not hazardously dry or windy, light one teepee with the easiest flame you have.",
    steps: [
      "Gather and sort tinder, kindling, and fuel into three piles before you touch an ignition.",
      "Build each lay, take it apart, and build it again until your hands know the order.",
      "Only then light the teepee. One light. If it fails, fix the lay before you try again.",
    ],
    success: "You can build all three lays without looking them up, and one of them burns on a single ignition.",
  },
  caution:
    "If the day is windy, or the country is dry enough to crackle, practice the lays and the motions with no flame. Skip flame practice in hazardous dry or windy conditions. A drill is not worth a wildfire. Chemical mixes, batteries shorted through steel wool, and homemade accelerants are left off this guide on purpose. They injure people and they do not teach a fire you can repeat.",
};

export const methods: Method[] = [
  {
    id: "kept",
    number: 1,
    name: "Kept fire",
    epithet: "A history of not letting the coal die.",
    eraGroup: "before",
    era: "Deep prehistory",
    circa: "As old as the use of fire",
    origin: "Everywhere a camp moved",
    difficulty: 2,
    ignition: "carried",
    weather: "Historically, a sheltered coal could ride out rain better than an unlit kit. Wind could feed it or strip it. This guide does not practice that carry.",
    learn: "Read it as history. The drill is a cold walk with an unlit nest.",
    practiceRank: 8,
    summary:
      "The oldest fire skill is not making fire. It is not losing it. Before a reliable spark, people carried a coal in punk, fungus, or bark and woke it at the next hearth. That is context. This lesson does not teach you to walk with a live ember.",
    principle:
      "A coal is already burning. Historically, the skill was balancing air and fuel so it smoldered instead of flaming or dying. A carried coal can also drop, flare, or smolder into a fire you did not mean to start.",
    place:
      "It sits first because keeping fire had to exist before anyone could count on making it. Hearths survive in the ground. The first fire-making tool mostly does not. Where the record is thin, this guide says so. The steps below are a cold simulation of that history.",
    kit: [
      { item: "An unlit stand-in", note: "A pebble or a cold piece of charcoal. Not a glowing coal." },
      { item: "Dry punk or crushed rotten hardwood", note: "Soft, dry, not green. Used here only as packing for the cold nest." },
      { item: "A wrap", note: "Fibrous bark or dry grass around the punk, loose enough that you can see how air would move." },
      { item: "No live ember", note: "Do not lift a coal out of a fire for this lesson. Do not walk with one." },
    ],
    steps: [
      {
        title: "Read what people did",
        body: "Historically, a camp that moved might set a glowing coal into dry punk, wrap it in bark or grass, and try to wake it at the next hearth. The balance was a glow and a thread of smoke: too tight and it died, too loose and it flamed. Knowing that explains the record. It is not a drill to copy with a live coal.",
      },
      {
        title: "Build a cold nest",
        body: "Make the nest, and a spare, with dry punk and a bark wrap. Put the pebble or cold charcoal in the middle. Set an unlit teepee where a hearth would have been, even if that place is ten steps away. Nothing in the nest is burning.",
      },
      {
        title: "Walk the loop unlit",
        body: "Carry the cold nest. Stop four times. At each stop, say whether you would loosen the wrap or close it, and why. You are rehearsing the checks. You are not tending a fire in your hands.",
      },
      {
        title: "Talk through the waking",
        body: "At the teepee, set the nest down and say how a historical coal would have been opened into the lay and blown to flame, and how the old hearth would have been drowned until cold. Leave this teepee unlit. Do not finish the lesson by lighting the nest.",
      },
    ],
    faults: [
      { problem: "The story skips the danger.", fix: "A live coal in punk can flare, fall out of the wrap, or smolder after you think it is out. That is why this lesson stays cold." },
      { problem: "You want to try it with a real coal.", fix: "Don't. Beginners do not practice by walking with an ember. Keep the coal in a fire ring, or put the fire out." },
      { problem: "The cold walk felt pointless.", fix: "The point is the checks: air, fuel, and a hearth that is already built. You can name those without carrying heat." },
    ],
    drill: {
      title: "A cold carry",
      goal: "Rehearse the historical carry with an unlit nest. Do not walk with a live ember.",
      steps: [
        "Pack a nest with dry punk or bark and a cold stand-in, such as a pebble.",
        "Walk a short loop. Stop four times and say whether you would loosen or close the wrap.",
        "At the end, set the nest down and talk through waking a coal into a teepee that is already built. Leave it unlit.",
      ],
      success: "You can describe each check, and you never carried a glowing coal.",
    },
    caution: "This lesson is history and a cold drill. Do not walk with a live ember, even a small one. A carried coal can flare, drop, or smolder into an uncontrolled fire. Beginners practice the motions unlit. Water and a shovel stay with any fire you do light, in a ring, and that fire is put out before anyone leaves.",
  },
  {
    id: "pyrite",
    number: 2,
    name: "Flint and pyrite",
    epithet: "A spark from stone, before iron.",
    eraGroup: "stone",
    era: "Stone Age",
    circa: "Upper Paleolithic toolkits; clear by about 3300 BCE",
    origin: "Wherever flint and iron pyrite occur together",
    difficulty: 5,
    ignition: "spark",
    weather: "These sparks are small. Damp air, damp tinder, or a breeze ends them.",
    learn: "Hours to land a spark on purpose. Longer to reach a flame.",
    practiceRank: 13,
    summary:
      "Strike a sharp flint, chert, or quartz edge against iron pyrite or marcasite. The sulfide rock sheds tiny hot grains. This is the spark people had before steel. Ötzi, around 3300 BCE, carried flint, pyrite, and fungus tinder for it.",
    principle:
      "The flint is the chisel. The spark is a shaving of pyrite, hot enough to glow. It is not a spark knocked off the flint, and it is nothing like a modern ferrocerium shower.",
    place:
      "It comes before the friction methods because we can still find the stones. Wooden drills rot, so their age is partly a guess. Pyrite with strike-a-lights is a thing the ground actually kept.",
    kit: [
      { item: "A sharp flint, chert, or quartz edge", note: "A real edge, not a river pebble. You are shaving rock." },
      { item: "A chunk of pyrite or marcasite", note: "Big enough to brace. Dust and tiny flakes will not do." },
      { item: "Charred tinder", note: "Char cloth or charred punk. Plain grass almost never catches these sparks. See flint and steel for the tin method." },
      { item: "A tinder nest", note: "The char only holds a glow. The nest turns that glow into flame." },
    ],
    steps: [
      {
        title: "Set the tinder where the sparks will be",
        body: "Lay a small piece of char cloth or charred punk against the pyrite, or just beside it on a bark chip. If you have to flick sparks across a handspan of dirt, you will lose every one.",
      },
      {
        title: "Shave the pyrite",
        body: "Brace the pyrite. Strike a glancing blow with the flint so the edge scrapes a fresh face. A steep, crushing blow makes chips and no sparks. Turn to a new face when one face goes dull.",
      },
      {
        title: "Watch for a glow that stays",
        body: "A spark that winks out has not caught. A spot that keeps glowing has. Fold that char into the nest and blow it to flame, then into a lay that is already built.",
      },
    ],
    faults: [
      { problem: "No sparks.", fix: "The angle is too steep, or that face of the pyrite is glazed. Glance, and turn the stone." },
      { problem: "Sparks that die in the air.", fix: "The tinder is not charred, or it is damp. Pyrite sparks will not light a cotton ball the way a ferro rod will." },
      { problem: "Stone chips in the hand.", fix: "Fingers stay below the edge. A glove on the holding hand is sense, not a failure of authenticity. Eye protection is reasonable." },
    ],
    drill: {
      title: "Twenty landed sparks",
      goal: "Make sparks go where you intend, and leave one glowing spot, before you chase a campfire.",
      steps: [
        "Char a scrap beside a fire you already have, or make char cloth with the tin method.",
        "Strike until you can predict the landing spot.",
        "Stop when a spot holds a glow you can blow brighter.",
      ],
      success: "A charred patch holds a glow. Flame can wait for a later session.",
    },
    caution: "Glancing stone throws chips. Work in open air so you are not breathing rock dust. Do not strike toward your eyes or your free hand.",
  },
  {
    id: "hand",
    number: 3,
    name: "Hand drill",
    epithet: "Palms, a spindle, and a board.",
    eraGroup: "stone",
    era: "Prehistoric friction",
    circa: "Old, and poorly preserved",
    origin: "Widespread. A common form in dry country, including the American Southwest.",
    difficulty: 5,
    ignition: "coal",
    weather: "Damp wood will not coal. Wind matters less than moisture, until you try to blow the coal into flame.",
    learn: "Days for many beginners. A minute, once the wood and the form are both right.",
    practiceRank: 10,
    summary:
      "Spin a straight dry spindle between your palms into a softwood board until the dust chars and becomes a coal. It is the simplest friction kit, and the one most people find the hardest to finish.",
    principle:
      "The spindle grinds wood into dust and heats that dust. You are not trying to set the board on fire. You are trying to cook a pile of powder until it smolders.",
    place:
      "It is the ancestral form of friction fire: two sticks, no cord, no bow. Wood rarely survives to prove the date, so treat 'oldest' as the simplest mechanism, not as a carbon date.",
    kit: [
      { item: "A spindle", note: "Finger-thick or a little less, straight, about as long as your thigh. Long enough that your hands have room to travel." },
      { item: "A hearth board", note: "About as thick as the spindle, wide enough for your foot, a foot or two long. Soft, dry, dead wood: cedar, willow, aspen, cottonwood, basswood, poplar." },
      { item: "A coal catcher", note: "A dry leaf, a chip of bark, or a thin sliver of wood under the notch." },
      { item: "A knife", note: "To burn in, then to cut the notch. Cut away from yourself." },
    ],
    steps: [
      {
        title: "Refuse bad wood",
        body: "Dead, dry, not rotten, not green, not resinous. Pine heartwood full of pitch glazes and quits. A cedar picket, a poplar scrap, or a willow branch from deadfall is an honest practice set. Do not peel living trees.",
      },
      {
        title: "Burn in a socket",
        body: "Spin gently until the spindle has a round, dark seat that will not skate. The socket wants to be deep enough to hold the tip, not a hole through the board.",
      },
      {
        title: "Cut the notch",
        body: "Cut a V from the edge of the board into the center of the socket. The point of the V reaches the middle. The mouth is about an eighth of the socket. This is where dust escapes and the coal is born. Set the catcher underneath.",
      },
      {
        title: "Take a stance you can keep",
        body: "Kneel. Foot beside the socket, close, pinning the board. Spindle straight up. Palms together at the top of the spindle. Thumbs quiet. If the spindle leans, it will walk out of the hole.",
      },
      {
        title: "Spin, and let your hands travel",
        body: "Rub the palms so the spindle spins. Your hands will walk down the shaft. That is the method, not a mistake. At the bottom, ease the pressure, slide back to the top, and keep the spindle in the socket the whole time.",
      },
      {
        title: "Read the dust, then stop",
        body: "Pale dust means more speed and a little more pressure. A shiny black crust in the hole is glaze: scrape it out and use more speed, less crushing. You want fine, dark dust packing the notch. When smoke stays thick and the pile looks knitted, lift the spindle straight up. If the pile smokes on its own, you have a coal. Fan it. Slide the catcher into the nest.",
      },
    ],
    faults: [
      { problem: "The spindle flies out.", fix: "The socket is too shallow, or you leaned. Burn the socket deeper and keep the spindle vertical." },
      { problem: "Lots of work, blond dust.", fix: "You are sanding, not charring. Faster. If the wood is damp or too hard, change wood. Oak is a poor beginner hearth." },
      { problem: "Smoke, then a polished hole.", fix: "Glaze. Knife it out. More speed, less downward crush, drier wood." },
      { problem: "The pile falls apart.", fix: "The notch is too wide, or you knocked it lifting the spindle. Narrow the V. Lift straight up." },
      { problem: "Hands blister and quit.", fix: "Shorter sessions. Form first. The bow drill is the friction method to learn before this one." },
    ],
    drill: {
      title: "Three sockets, then smoke",
      goal: "Burn in three clean sockets and cut three correct notches before you try to finish a coal.",
      steps: [
        "Make the sockets round and dark, with the spindle staying put.",
        "Cut each notch to the center. Look at them. Fix the wide ones.",
        "Only on the third set, chase continuous smoke. Stop while your form is still smooth.",
      ],
      success: "Twenty seconds of thick smoke from a notch full of dark dust. A coal is a bonus, not the pass mark.",
    },
    caution: "The board and dust get hot enough to char skin if you pinch the notch. Keep the catching leaf, not your fingers, under the coal.",
  },
  {
    id: "plow",
    number: 4,
    name: "Fire plow",
    epithet: "A groove, a stick, and a pile of dust at the far end.",
    eraGroup: "stone",
    era: "Pacific and beyond",
    circa: "Traditional, not a single invention date",
    origin: "Strongly associated with Polynesia; also recorded elsewhere",
    difficulty: 4,
    ignition: "coal",
    weather: "Same rule as every friction fire: dry wood or nothing. The long stroke is miserable in a cold rain.",
    learn: "A stubborn day. Faster if you already understand a coal from the bow drill.",
    practiceRank: 11,
    summary:
      "Rub a blunt stick hard along a groove in a softwood board. Dust piles at the far end of the stroke and, if the pace is high enough, chars into a coal. In Hawaiʻi the classic wood is hau, a hibiscus.",
    principle:
      "Same physics as the hand drill, different path. Heat and powder collect where the stroke stops, not in a spinning socket.",
    place:
      "A regional sibling of the hand drill, not a later invention with a patent. It sits here as the next simple friction form: still no cord, still no machine, a different motion.",
    kit: [
      { item: "A plow stick", note: "Arm's length, blunt at the working end, comfortable in two hands. Same dry soft wood as the board." },
      { item: "A hearth board", note: "Flat, soft, dry. Wider than the stick. For practice: cottonwood, willow, aspen, or cedar. Same species for both pieces is the usual advice." },
      { item: "A way to pin the board", note: "Your foot, a knee, or a partner. A board that walks backward wastes the stroke." },
    ],
    steps: [
      {
        title: "Start a narrow groove",
        body: "With the grain, not across it. The groove should stay narrow so dust is driven forward instead of spilling out the sides. A wide, shiny trough is a failure in progress.",
      },
      {
        title: "Use the whole body",
        body: "Kneel or sit so you can take long strokes. Both hands on the plow. Pressure builds through the stroke and is firmest at the far end, where the pile must form. Short, angry rubs polish the wood.",
      },
      {
        title: "Watch the stop-end",
        body: "The coal is the dark, clumped dust at the end of the groove, not a glow along the whole track. When that pile smokes on its own after you pause, ease it onto a leaf and into the nest. Speed is the ingredient beginners withhold.",
      },
    ],
    faults: [
      { problem: "A wide shiny groove and pale dust.", fix: "Too slow, too wide. Narrow the path, lengthen the stroke, and speed up. If the wood is hard or damp, change it." },
      { problem: "Dust scatters instead of piling.", fix: "The board is tilted the wrong way, or the groove has walls that are too low. Keep a slight run toward the stop-end and don't widen the slot." },
      { problem: "You are exhausted and have no coal.", fix: "This method is a sprint at the end, not a marathon of light rubbing. Rest, then give it one committed run." },
    ],
    drill: {
      title: "One groove, one pile",
      goal: "Cut a single groove that ends in a mound of dark dust, whether or not that mound coals today.",
      steps: [
        "Pin the board so it cannot creep.",
        "Ten slow strokes to seat the groove, then one fast set.",
        "Stop and look at the pile before you decide to keep going.",
      ],
      success: "Dark dust, heaped at the stop-end, from a groove that is still narrow.",
    },
  },
  {
    id: "saw",
    number: 5,
    name: "Fire saw",
    epithet: "Bamboo sawn against itself.",
    eraGroup: "stone",
    era: "Bamboo cultures",
    circa: "Traditional across Southeast Asia and the Pacific",
    origin: "Southeast Asia, with rattan-thong cousins nearby",
    difficulty: 4,
    ignition: "coal",
    weather: "Bamboo that feels dry and bamboo that is dry are different things. Wet walls will not coal.",
    learn: "An afternoon if the bamboo is right. A frustrating one if it is not.",
    practiceRank: 12,
    summary:
      "Saw one piece of dry bamboo across a notch in another. Hot dust falls through the cut onto tinder packed just beneath. A cousin method uses a rattan thong pulled like a saw through a wooden slot.",
    principle:
      "The edge shreds bamboo into a fine powder and dumps that powder, already hot, onto tinder waiting under the cut.",
    place:
      "Another simple friction form, tied to a material. It sits with the plow and the hand drill: no metal, no wheel, a body-powered sawing motion. The rattan thong is the same idea with a flexible blade.",
    kit: [
      { item: "Dry bamboo", note: "A section you can split, and a second piece with a sharp edge to saw with. Green bamboo bends and steams." },
      { item: "Tinder under the cut", note: "Scraped bamboo fuzz, or the same fiber you trust in a nest. It sits in the hollow, just under a notch cut through the wall." },
      { item: "A brace", note: "The hearth half needs to stay still. Foot, knee, or a second person." },
    ],
    steps: [
      {
        title: "Split and notch",
        body: "Split a dry section in half. In the middle of one half, cut a small window through the wall. Pack tinder in the curve so it nearly touches that window from below. The dust has to land in tinder, not on the ground.",
      },
      {
        title: "Saw across the window",
        body: "Use the sharp edge of the other piece of bamboo. Long strokes, across the notch, faster as the smoke comes. Keep the saw on one line so you are deepening a kerf, not sanding a patch.",
      },
      {
        title: "Look underneath",
        body: "The coal often appears in the tinder below, not on the saw. When smoke pours from the underside, stop and look. If a glow is there, fold it into a larger nest. Do not keep sawing until you have cut the coal in half.",
      },
    ],
    faults: [
      { problem: "White dust, no smoke.", fix: "Too slow, or the bamboo is damp. Speed up. If the walls feel cool and heavy, the culm is not dry enough." },
      { problem: "Smoke on top, nothing below.", fix: "The window does not go through, or the tinder is not against the cut. Open the slot and pack the tinder up to it." },
      { problem: "The hearth piece splits wide open.", fix: "The notch was a huge bite. A small window is enough. Start again rather than sawing a collapsing tube." },
    ],
    drill: {
      title: "The window and the fuzz",
      goal: "Prepare one hearth so tinder sits tight under a finished window, then saw until smoke appears below.",
      steps: [
        "Scrape a small pile of bamboo fuzz before you cut, so the tinder exists first.",
        "Cut a modest window and check from below that daylight comes through onto the fuzz.",
        "Saw in one committed bout. Check the underside before a second bout.",
      ],
      success: "Smoke from the underside, and a hearth you could set up again without rereading this.",
    },
    caution: "A split bamboo edge is a blade. Saw so that a slip does not run into your hand or thigh.",
  },
  {
    id: "bow",
    number: 6,
    name: "Bow drill",
    epithet: "A cord does the spinning your palms cannot sustain.",
    eraGroup: "machine",
    era: "Composite tool",
    circa: "Ancient as a drill; long established as a fire tool",
    origin: "Well recorded among Indigenous nations of North America, and in northern Asia",
    difficulty: 3,
    ignition: "coal",
    weather: "Dry wood still rules. A breeze is fine if the coal's nest is sheltered.",
    learn: "The friction method most people can actually finish. Often a day of tuning, then a coal.",
    practiceRank: 7,
    summary:
      "A bow reciprocates a cord wrapped once around a spindle, spinning it into a hearth board while your other hand holds a bearing block on top. It is the friction fire to learn first. The hand drill can wait until this coal is repeatable.",
    principle:
      "Same dust-and-heat coal as the hand drill. The bow supplies speed for longer than palms can, so you can spend your attention on pressure and the notch.",
    place:
      "The bow is a machine: stock, cord, spindle, board, bearing. Egypt used bow drills for boring; that does not by itself prove an Egyptian fire bow. As a fire tool it is famously documented in North America. In the Arctic the bearing was often a mouthpiece of bone or wood, both hands free to run the bow. Same fire, different brace.",
    kit: [
      { item: "Bow", note: "About the length from your sternum to your fingertips, stiff, a slight curve. A green, whippy bow steals the stroke." },
      { item: "Cord", note: "Leather, rawhide, or a rough shoelace. Slick nylon slips. One wrap around the spindle, tight enough that it does not slip, loose enough to move." },
      { item: "Spindle", note: "A thumb's thickness, a handspan or a bit more in length, straight. Soft wood is fine if the hearth matches. The top should be a point, the bottom blunter." },
      { item: "Hearth", note: "Same woods as the hand drill: cedar, willow, aspen, cottonwood, poplar, basswood. Thumb thick is plenty." },
      { item: "Bearing block", note: "Harder than the spindle. A hardwood socket, a stone, a shell, or bone. Lubricate it with a crushed green leaf or a little oil so the heat stays in the hearth." },
      { item: "Catcher", note: "Bark or a leaf under the notch, every time." },
    ],
    steps: [
      {
        title: "String the bow and wrap once",
        body: "The cord is tied at both tips so it is snug when the bow is unflexed. Twist the spindle into the cord so it stands on the outside of the string. One wrap. Two wraps bind and then snap.",
      },
      {
        title: "Burn the sockets, then notch the hearth",
        body: "Seat the spindle in the hearth and in the bearing with a short, easy spell of bowing. Then cut the V to the center of the hearth socket, same rule as the hand drill. Lubricate the bearing. If the top starts to smoke, the oil is missing or the bearing is too soft, and your work is happening in the wrong place.",
      },
      {
        title: "Lock your body",
        body: "Foot on the board, close to the socket. Bearing hand's wrist braced against the shin of the upright leg. That lock is the whole stability secret. The spindle stays vertical. The bow stays horizontal, stroking nearly its full length, not pecking at the tips.",
      },
      {
        title: "Speed from the bow, pressure from the hand",
        body: "Downward pressure is modest until smoke is steady, then firmer for a short finish. The bow keeps an even, fairly quick pace. Do not death-grip. When the notch is packed with dark dust and smoke is thick, stop cleanly and lift the spindle straight up so you do not scatter the pile.",
      },
      {
        title: "Confirm the coal",
        body: "If the pile smokes after you have stopped, you have it. Fan with the hand. Transfer on the catcher into a nest that is already in reach. Then the teepee, which is also already built.",
      },
    ],
    faults: [
      { problem: "The cord slips and squeals.", fix: "Tighten the cord. If it is glossy, switch to leather or a rougher lace. The spindle should spin, not the cord around a stuck spindle." },
      { problem: "Smoke at the top.", fix: "Lubricate the bearing, or make the bearing harder. The coal forms only in the hearth." },
      { problem: "The spindle wobbles out.", fix: "Wrist not locked to the shin, or the bow is sawing upward and downward. Level bow, vertical spindle, foot closer to the hole." },
      { problem: "Glazed socket, blond or crusty dust.", fix: "Scrape the crust. More speed, slightly less crush, drier or softer wood. A notch that does not reach the center packs dust in the hole and glazes it." },
      { problem: "A coal that dies as you cheer.", fix: "You had no nest ready, or you blew it apart. Nest first. Fan, then blow, then nest." },
    ],
    drill: {
      title: "Thirty seconds of true spin",
      goal: "A kit that spins without slipping, smokes at the bottom only, and packs a notch with dark dust.",
      steps: [
        "String the bow and wrap the spindle until it spins under a slow stroke.",
        "Burn both sockets. Lubricate the top. Confirm smoke is only at the hearth.",
        "Cut the notch and bow for a steady thirty seconds of smoke.",
      ],
      success: "Dark dust, bottom smoke only, and a spindle that stayed in the hole. Repeat it once on another day before you call it practiced.",
    },
    caution: "The bearing hand cramps and the cord can jump. Keep your face out of the plane of the bow. A cord that breaks at full tension stings.",
  },
  {
    id: "pump",
    number: 7,
    name: "Pump drill",
    epithet: "A flywheel that rewinds the cord for you.",
    eraGroup: "machine",
    era: "Machine drill",
    circa: "A later, more elaborate descendant of the bow",
    origin: "Used widely as a craft drill; only sometimes for fire",
    difficulty: 3,
    ignition: "coal",
    weather: "Indifferent to wind once it is going. Still helpless in damp wood.",
    learn: "An evening to build a pump that cycles. Fire comes after the machine feels boringly smooth.",
    practiceRank: 9,
    summary:
      "A crossbar and cord wind around a spindle. You push the bar down and the spindle spins. A flywheel stores the spin and rewinds the cord on the way back up. Push, rise, push. The bottom of the shaft is a drill in a hearth, notched like a bow-drill board.",
    principle:
      "Still a friction coal. The flywheel buys you a steady rhythm and saves the bow arm. The cost is a machine you have to tune before it teaches you anything.",
    place:
      "It sits after the bow because it is more machine than the bow, and because people mostly used it to bore holes and beads, not to make fire. It earns a place on the line as the mechanical next step, with that honesty attached.",
    kit: [
      { item: "A shaft", note: "Straight, a bit taller than the crossbar's travel. The fire tip is the bottom end." },
      { item: "A crossbar", note: "A hole in the middle that slides freely on the shaft. Cord from both ends of the bar up to a hole or notch near the top of the shaft." },
      { item: "A flywheel", note: "A wooden disk fixed low on the shaft, heavy enough to rewind the cord, light enough that you can still start it." },
      { item: "A hearth and notch", note: "The same board, socket, and V you already learned for the bow drill." },
    ],
    steps: [
      {
        title: "Learn the cycle with no hearth",
        body: "Wind the cord by turning the flywheel so the bar rises. Push down smoothly. Let the flywheel carry the shaft and rewind the cord so the bar climbs. If you fight the rebound, the cord tangles. Practice until the up-and-down is dull.",
      },
      {
        title: "Put it on a notched hearth",
        body: "Socket and V, catcher underneath, same as the bow. A little pressure comes from the push, not from leaning your weight on the bar. You want spin. Weight without spin glazes the hole.",
      },
      {
        title: "Finish like a bow drill",
        body: "Dark dust, smoke that continues after you stop, a coal transferred into a waiting nest. The pump does not invent a new kind of coal. It only changes the engine.",
      },
    ],
    faults: [
      { problem: "The bar slams and the cord goes slack.", fix: "The flywheel is too light, or you are shoving past the end of the wind. Shorten the stroke. Add mass to the disk." },
      { problem: "It will not rewind.", fix: "The cord is too long, or the crossbar hole is binding on the shaft. The bar has to slide without grabbing." },
      { problem: "Smoke, no coal.", fix: "Look at the notch, not the flywheel. The failure is the same as a bow drill's: glaze, a short notch, or damp wood." },
    ],
    drill: {
      title: "A boring machine first",
      goal: "Twenty clean down-up cycles that rewind themselves, then one smoking hearth.",
      steps: [
        "Cycle the pump in the air until you can talk while doing it.",
        "Only then set it on a notched board.",
        "Chase smoke with the rhythm you already have. Do not invent a new, violent one.",
      ],
      success: "The pump rewinds without a grab, and the hearth smokes at the notch.",
    },
  },
  {
    id: "steel",
    number: 8,
    name: "Flint and steel",
    epithet: "The tinderbox: flint, steel, and char cloth.",
    eraGroup: "metal",
    era: "Iron Age into the 1800s",
    circa: "From iron that can throw a spark, until matches replace the pocket kit",
    origin: "Widespread across Europe, Asia, and beyond once steel strikers exist",
    difficulty: 3,
    ignition: "spark",
    weather: "The spark is hardy. The char cloth is not. Damp cloth will not glow. Wind steals a small ember.",
    learn: "An hour to make char cloth. A little practice to land sparks. A reliable flame soon after.",
    practiceRank: 4,
    summary:
      "A high-carbon steel striker, hit with flint, throws sparks that are burning fragments of the steel itself. They are hotter and more numerous than pyrite sparks, and they still need charred tinder. This is the kit in a traveler's tinderbox for centuries.",
    principle:
      "The flint shaves the steel. The shaving burns in the air on the way to the char cloth. Mild steel and most stainless steels barely spark. The carbon is the point.",
    place:
      "Metal is the new ingredient, so the method sits after the wooden machines even where dates overlap from one country to another. It is the everyday fire kit that the match will eventually retire.",
    kit: [
      { item: "A carbon-steel striker", note: "A purpose-made striker, or an old file. If a grinder throws almost no sparks from it, it will not start your fire either." },
      { item: "Flint or chert", note: "A sharp edge. The same stone family as the pyrite method." },
      { item: "Char cloth", note: "Cotton or linen, charred in a closed tin. Synthetics melt. They do not char." },
      { item: "A tin with a pinhole", note: "A small tight tin. One nail hole in the lid. This is how you make the cloth." },
      { item: "A nest", note: "The cloth holds a spark. Jute, cedar, or dry grass turns it into flame." },
    ],
    steps: [
      {
        title: "Make char cloth outdoors",
        body: "Pack 100% cotton or linen in the tin, loose, not a brick. Close the lid. Set the tin on mineral soil beside coals, not in your hand. Smoke will jet from the pinhole. When the jet stops, move the tin off with tongs and let it cool completely before you open it. Opened hot, the cloth can flare. Finished cloth is black, not ashy grey, and a spark will make it glow.",
      },
      {
        title: "Hold flint and cloth together",
        body: "Cloth on top of the flint edge, in the non-dominant hand, fingers below the edge. Striker in the other hand. You are going to strike down onto the flint so sparks travel up onto the cloth.",
      },
      {
        title: "A glancing blow",
        body: "Strike down and across. Sparks that land and keep glowing have caught. Fold the glowing corner into the nest immediately and blow it to flame. Have the teepee built. Char cloth does not wait while you look for sticks.",
      },
    ],
    faults: [
      { problem: "No sparks from the steel.", fix: "The striker is the wrong steel, or you are hitting flat instead of shaving an edge. Glance. Try a known carbon steel if you are unsure." },
      { problem: "Sparks land and die.", fix: "The cloth is not fully charred, it got damp, or you opened the tin while it was hot and ashed it. Make a fresh batch." },
      { problem: "The tin flared when opened.", fix: "It was still hot, or still making gas. Next time wait until the tin is cool to the touch. Have water there anyway." },
      { problem: "A glow, then nothing in the nest.", fix: "The nest was too tight or too coarse. Loosen it. Blow sooner." },
    ],
    drill: {
      title: "One tin, three sparks",
      goal: "Make a tin of char cloth, then catch three separate sparks that hold a glow.",
      steps: [
        "Char a small batch and let the tin cool sealed.",
        "Test one scrap. If it will not glow, the batch is not done. Do not blame the flint yet.",
        "Catch three glows. Blow one of them into a nest if the place is legal for a flame.",
      ],
      success: "Three glows from one batch of cloth, and a tin you can do again without notes.",
    },
    caution:
      "The tin gets hotter than it looks and the smoke is a jet. Tongs, mineral soil, no opening the lid early, no synthetics in the tin. Strike so the steel cannot run into your fingers.",
  },
  {
    id: "lens",
    number: 9,
    name: "Burning lens",
    epithet: "The sun, brought to a point.",
    eraGroup: "metal",
    era: "Classical into the early modern",
    circa: "Joked about on a Greek stage in 424 BCE; practiced whenever the sky allows",
    origin: "Wherever someone had a clear convex lens or a polished curve",
    difficulty: 2,
    ignition: "sun",
    weather: "Needs a hard shadow. Thick cloud, deep shade, and night are a closed door. Wind still steals the first ember.",
    learn: "Minutes, on a bright day, with char cloth. Longer with pale natural tinder.",
    practiceRank: 5,
    summary:
      "A clear convex lens focuses sunlight into a small spot hot enough to char tinder. Aristophanes has a character reach for a burning-glass in The Clouds, in 424 BCE. A parabolic metal reflector, such as an old flashlight reflector, is the sibling. A flat mirror only redirects light. It does not focus it.",
    principle:
      "You are not heating the whole tinder. You are pouring a patch of sun into the smallest, brightest point you can make, and holding it still until that point smokes.",
    place:
      "Optics overlap the age of steel strikers. The lens sits just after flint and steel because it is a different idea — stored sunlight rather than a struck spark — and because it stays a fair-weather method beside a kit that works at night.",
    kit: [
      { item: "A clear convex lens", note: "A magnifying glass is the practice tool. Weak eyeglasses often will not do. Stronger reading lenses sometimes will, slowly." },
      { item: "Dark, fine tinder", note: "Char cloth is ideal. Punk and charcoal dust work. Pale grass reflects the very light you are trying to use." },
      { item: "A still hand, or a rest", note: "Brace the lens on a knee or a forked stick so the spot does not dance." },
    ],
    steps: [
      {
        title: "Find the real spot",
        body: "Aim through the lens at the tinder and move in and out until the bright patch is as small as you can make it. A big warm disk will never light anything. If you cannot see a hard-edged spot, the sun is not strong enough. Stop.",
      },
      {
        title: "Hold still",
        body: "Keep that spot on one point. Smoke should come. Then a glow. Do not chase the smoke around the tinder and restart the heat each time. When it glows, set the lens down and blow the ember into a nest.",
      },
      {
        title: "Know the closed doors",
        body: "No hard shadow, no fire. Window glass between you and the sun usually ruins it. High latitude winter may never give you a steep enough sun. This is a method with office hours.",
      },
    ],
    faults: [
      { problem: "A bright patch and no smoke.", fix: "The spot is not small enough, the tinder is pale or damp, or the sun is too low. Shrink the spot. Switch to char cloth." },
      { problem: "It smokes and then you lose the spot.", fix: "You moved. Brace the lens. Mark the distance with a finger against a stick if you have to." },
      { problem: "Nothing through a window.", fix: "Go outside. Glass in the path is a common reason a perfectly good lens seems broken." },
    ],
    drill: {
      title: "One spot, one smoke",
      goal: "On a day with hard shadows, char a single point in tinder and decide, honestly, whether the sun was good enough.",
      steps: [
        "Test for a hard shadow before you unpack anything else.",
        "Find the smallest spot on a scrap of char cloth or dark punk.",
        "Hold it until smoke. Record the time of day. That note will teach you more than another lens would.",
      ],
      success: "Smoke from a spot you held still, or a clear note that the day was never going to work.",
    },
    caution: "The focal spot can burn skin and can land somewhere you did not intend if you swing the lens around. Cap it or pocket it when you are not using it. Do not look through it at the sun. A magnifying glass can burn skin in seconds. Cap it or keep it in a sleeve when you are not using it. Do not leave it where sun can shine through it onto cloth, a car seat, or dry grass. A flat signal mirror is for flashing help. It is not a fire starter by itself.",
  },
  {
    id: "piston",
    number: 10,
    name: "Fire piston",
    epithet: "Air, squeezed until it is hot enough.",
    eraGroup: "metal",
    era: "Compression",
    circa: "Traditional in Southeast Asia; noticed in Europe in the early 1800s",
    origin: "Southeast Asia, in horn, hardwood, or bamboo; later a philosopher's demonstration",
    difficulty: 3,
    ignition: "compression",
    weather: "The cylinder does not care about wind. A wet crumb of tinder still fails. Cold, thick grease can kill the seal.",
    learn: "Minutes with a piston that already seals. A shop project if you are making the seal yourself.",
    practiceRank: 6,
    summary:
      "A piston slammed down a sealed cylinder compresses the air so fast that it heats enough to light a crumb of tinder on the piston face. Traditional in parts of Southeast Asia. In Europe it became a parlor of physics in the early 1800s, and the idea is one ancestor of the diesel engine. The ember it makes is the smallest on this line.",
    principle:
      "Fast compression heats air. Slow compression does not, because the heat leaks out as you go. One committed stroke, a real seal, and tiny dry tinder. That is the whole method.",
    place:
      "It sits after the lens and before the match. As a traditional tool it is older than 1826. As a European science story it arrives in the same generation as the match. Either way it is the last method here that makes a coal with no spark and no sun.",
    kit: [
      { item: "A piston that seals", note: "Bought, or made carefully. The gasket is the device. A leaky tube teaches nothing." },
      { item: "A crumb of char cloth or punk", note: "Tiny. A wad will not heat through, and it can spoil the seal." },
      { item: "A little lubricant", note: "Enough that the piston moves and seals. Too much oil wets the tinder and you light nothing." },
      { item: "A nest within reach", note: "This ember is small and easy to talk to death." },
    ],
    steps: [
      {
        title: "Load a crumb",
        body: "Stick a small flake of char cloth into the notch on the piston face. If there is no notch, a flake that simply stays put is enough. Smear a thin film of lubricant on the piston wall, not a glob on the tinder.",
      },
      {
        title: "One stroke",
        body: "Drive the piston home in one fast stroke. Hesitation leaks the heat. Withdraw the piston promptly and transfer the glowing tinder at once. Do not hold it down for a breath. Draw it back smoothly rather than yanking, which can scatter the ember, then move the glow into the nest. Follow the device maker's instructions for that piston.",
      },
      {
        title: "Move it now",
        body: "Tip the ember into the nest immediately and blow it up. The transfer happens as soon as the piston is back, not after a pause. If you set the piston down to admire it, you will come back to ash.",
      },
    ],
    faults: [
      { problem: "No glow, stroke felt easy.", fix: "The seal is leaking. Repair the gasket before you change tinder, your arm, or your philosophy." },
      { problem: "No glow, stroke felt like a hammer.", fix: "Tinder too big, too damp, or oiled. Use a smaller, drier crumb and less grease." },
      { problem: "A glow that dies in the cylinder.", fix: "You waited, or you pulled out so fast the ember flew apart. Smoother withdrawal, nest already in the other hand." },
    ],
    drill: {
      title: "Seal, then ember",
      goal: "Prove the piston seals, then land one ember in a nest.",
      steps: [
        "Stroke it empty. You want resistance that you cannot do slowly.",
        "Load a crumb and take one real stroke. Look immediately.",
        "If it failed, change one thing only: seal, tinder size, or speed. Not all three.",
      ],
      success: "One visible ember transferred into a nest.",
    },
    caution:
      "Do not improvise this from a glass syringe or a brittle plastic tube. A seal that lets go, or a cylinder that shatters, is an injury, not a lesson. Use a piston made for the job.",
  },
  {
    id: "match",
    number: 11,
    name: "The match",
    epithet: "Fire tucked into a stick, at last.",
    eraGroup: "modern",
    era: "1826, and then the safety match",
    circa: "John Walker, developed 1826, sold from April 1827. Safety match, Gustaf Erik Pasch, 1844.",
    origin: "England, then Sweden for the safety match you still know",
    difficulty: 1,
    ignition: "flame",
    weather: "Wind is the enemy. Damp heads are a dead kit. A storm match buys you a few extra seconds.",
    learn: "The strike is trivial. One-match fires are a real skill.",
    practiceRank: 2,
    summary:
      "John Walker, a chemist in Stockton-on-Tees, developed the friction match in 1826. The Science Museum Group says he began selling the wooden splints in April 1827. They lit when drawn through a fold of sandpaper. They could flare and drop burning bits. White-phosphorus matches came next and poisoned the workers who made them. In 1844 Gustaf Erik Pasch moved the phosphorus to the strip on the box. The Lundström brothers in Sweden made that safety match a product in the 1850s. A safety match lights on its box. A strike-anywhere match lights on a rough surface, and also in a pocket if you are unlucky.",
    principle:
      "The head is already a complete fuel-and-oxidizer mix. Friction supplies the little heat that sets it off. Your skill is not the chemistry. It is having a fire ready to receive a flame that lasts a few seconds.",
    place:
      "This is the break in the line. Everything before it makes a coal or a spark you must nurse. From here on, a manufactured flame is the starting point, and the old skills become backups and crafts rather than the daily way.",
    kit: [
      { item: "Matches in a dry case", note: "Safety matches stay with their striking strip. The strip wears out before the matches do. Keep a second strip." },
      { item: "A finished lay", note: "Built before you open the case. The match is not the time to go looking for kindling." },
      { item: "Optional wax", note: "Wooden matches dipped in wax resist damp and burn a little longer. Melt the wax in a tin set in hot water, outdoors. Never over an open flame you cannot take away." },
    ],
    steps: [
      {
        title: "Build the lay first",
        body: "Teepee or lean-to, tinder in the place the flame will touch, kindling already sized. If you are practicing the one-match standard, put the matchbox down and look at the lay before you are allowed to strike.",
      },
      {
        title: "Strike away from yourself",
        body: "Brace the box. Draw the head away from your body, not toward it. Cup the new flame with your other hand. A match held straight up in a breeze dies. Tip it slightly so the flame climbs the stick, or shield it.",
      },
      {
        title: "Light the tinder, not the air",
        body: "Put the flame where the tinder is finest. Let the match burn a moment so the stick is really alight, then set it into the lay. If it fails, do not strike a second match until you can say why. Wind, damp, a tight lay, or you lit the wrong spot.",
      },
    ],
    faults: [
      { problem: "The head crumbles.", fix: "Damp, or old. Dry storage. A safety head struck on a rock will also crumble. Use its own strip." },
      { problem: "It lights and dies in the wind.", fix: "Turn your back to the wind, cup harder, or switch to a lean-to. A longer storm match helps only if the lay is ready." },
      { problem: "You used four matches.", fix: "The lay was the problem by match two. Rebuild it smaller and airier before another strike." },
    ],
    drill: {
      title: "The one-match fire",
      goal: "One safety match, one fire that reaches kindling, on a day with a little wind.",
      steps: [
        "Build the lay completely. Step back and look at it.",
        "Strike once. Shield the flame. Set it into the tinder.",
        "If it fails, write the reason in the log before a second match.",
      ],
      success: "Kindling is burning, and you still have the rest of the box because you only needed one.",
    },
    caution:
      "Matches are the method most likely to be treated like a toy. If you are teaching a child, you hold the match. Store them dry, striking strips included, where they cannot be pocketed by accident. Wax melts in hot water, not in a pot over a flame.",
  },
  {
    id: "ferro",
    number: 12,
    name: "Ferrocerium",
    epithet: "The spark in every lighter, made large.",
    eraGroup: "modern",
    era: "1903",
    circa: "Carl Auer von Welsbach patents ferrocerium",
    origin: "An Austrian chemist's alloy; now the standard camp spark",
    difficulty: 2,
    ignition: "spark",
    weather: "The rod works wet. The tinder still has to be dry. Sparks laugh at a breeze that would kill a match.",
    learn: "An hour to be competent. A day to be tidy about it.",
    practiceRank: 3,
    summary:
      "In 1903 Carl Auer von Welsbach patented ferrocerium, a pyrophoric alloy of rare-earth metals and iron. Scrape it with a hard edge and it throws a dense shower of sparks far hotter than steel. The 'flint' in a lighter is this metal, not flint. A modern ferro rod is that flint, made thick enough to hold in the hand.",
    principle:
      "You are shaving a metal that burns as soon as the shaving is torn off. The scraper is not the fuel. The rod is. Soft stainless edges polish it instead of cutting it.",
    place:
      "Seventy-seven years after Walker's match, the spark makes a comeback in industrial form. It does not replace the match. It replaces the fuss of flint, steel, and a tin of char cloth for anyone who can carry a rod.",
    kit: [
      { item: "A ferro rod and a hard scraper", note: "The supplied striker, or the square spine of a high-carbon knife. Not the sharp edge, and not a soft stainless edge." },
      { item: "Tinder that can take a hot spark", note: "Petroleum-jelly cotton is a modern practice tinder and lights easily. Birch bark, fatwood curls, cedar bark, and unraveled jute are the fair test." },
      { item: "A lay, already built", note: "The flare is short if you scrape a pile of dust. Kindling must already be close." },
    ],
    steps: [
      {
        title: "Put the rod in the tinder",
        body: "The tip of the rod touches, or nearly touches, the tinder. Sparks die across distance. Scrape off the dull factory skin until the sparks are bright.",
      },
      {
        title: "Lock the scraper, pull the rod",
        body: "Brace the scraper. Pull the rod back, away from the tinder, so the sparks fly forward onto it. The edge is not traveling toward your other hand. Pushing the scraper works and also sends a hard edge toward your fingers. Practice the pull.",
      },
      {
        title: "Catch, then feed",
        body: "A good tinder will glow or flame on the first solid scrape. Fold a glow into a nest, or set a flaming cotton or bark curl into the teepee. For stubborn tinder, scrape a small pile of rod dust into it and throw one more spark into the pile. That pile burns hot and brief.",
      },
    ],
    faults: [
      { problem: "Black streaks, no sparks.", fix: "The scraper is too soft, or you are rubbing instead of cutting. Use a sharper, harder corner and a faster scrape." },
      { problem: "Sparks everywhere except the tinder.", fix: "The rod is too far away, or pointed past the bundle. Touch the tinder with the tip." },
      { problem: "A flare that dies.", fix: "You lit ferro dust or a jelly cotton with no kindling against it. Build the next size of fuel before you scrape." },
    ],
    drill: {
      title: "Pull, don't push",
      goal: "Light tinder three times using only the pull-the-rod stroke, then once with a natural tinder instead of jelly cotton.",
      steps: [
        "Scrape until the sparks are bright, into a safe pan, so the motion is boring.",
        "Light an easy tinder three times. Extinguish between tries.",
        "Switch to bark, fatwood, or jute and do it once more.",
      ],
      success: "Three controlled lights with the safe stroke, and one of them not from petroleum jelly.",
    },
    caution:
      "A knife spine is still steel. Know where it would go if it slipped. Scrape so sparks fly away from your face, not toward your eyes. Wear eye protection if sparks come toward you. Magnesium bars, the camping blocks that are half soft metal and half ferro rod, throw shavings that burn white-hot. Scrape them away from you, a small pile only, and do not stare from an inch away. No dry grass around that pile.",
  },
  {
    id: "lighter",
    number: 13,
    name: "Fuel lighter",
    epithet: "A flame that lives in a chimney or a valve.",
    eraGroup: "modern",
    era: "1932, and the disposable that followed",
    circa: "Zippo, 1932. The everyday butane lighter, 1973.",
    origin: "An American pocket lighter, then a French disposable",
    difficulty: 1,
    ignition: "flame",
    weather: "A wick lighter in a chimney stands up to wind. A butane flame does not. Butane also sulks in the cold. A wick lighter handles cold better.",
    learn: "Minutes to operate. Longer to maintain, and to stop trusting it as your only fire.",
    practiceRank: 1,
    summary:
      "George G. Blaisdell's Zippo, 1932, put a naphtha-soaked wick inside a wind screen and lit it with a ferrocerium wheel. The flame is sheltered, so wind that kills a match often leaves it burning. The disposable butane lighter, famous from Bic in 1973, is a valve and the same kind of wheel: easy, wind-shy, and poor when cold because the gas will not leave the tank. A long-neck butane lighter is the practical camp version. Your hand stays out of the lay.",
    principle:
      "The wheel shaves a tiny ferrocerium flint into sparks, and those sparks light fuel vapor. No vapor, no flame, however pretty the sparks. There is an older chemical lighter, Döbereiner's 1823 lamp, that glowed platinum in hydrogen. It belongs in the history. Do not build one.",
    place:
      "The match gave everyone a flame. The lighter gave them a flame they could relight. It is the same ferrocerium as 1903, married to a fuel supply, which is why it comes after the rod on this line even though the famous pocket lighter is what most people meet first.",
    kit: [
      { item: "A lighter you have tested today", note: "Fuel in it, flint in it, flame witnessed before you need dinner." },
      { item: "The right fuel", note: "Naphtha for a wick lighter. Butane for a gas lighter. They are not substitutes for each other." },
      { item: "A lay", note: "Still required. A lighter is a long match, not a stove, unless it is a stove." },
    ],
    steps: [
      {
        title: "Light it before you trust it",
        body: "At home or at the pit, before the cookware comes out, prove the flame. A wick lighter that has run dry burns its wick and then becomes a spark toy. Refill before that. A butane lighter that has sat in the cold goes in a pocket to warm up. Not over another flame.",
      },
      {
        title: "Use the shelter it has",
        body: "On a wick lighter, the chimney is the point. Face it into the wind and light the tinder through that window. Close the lid to put it out. Blowing it out can throw burning fuel. On a butane lighter, cup hard or use a long neck so the flame reaches the tinder without your knuckles in the fire.",
      },
      {
        title: "Maintain it, or carry a second method",
        body: "Replace the flint when the wheel sparks poorly. Trim a charred wick. Do not overfill a wick lighter: fuel on your hands can light. And carry matches or a ferro rod. A lighter is one puncture or one cold night away from being a paperweight.",
      },
    ],
    faults: [
      { problem: "Sparks, no flame.", fix: "Empty, or a flooded wick, or butane too cold. Refill when it is cool. Warm a butane lighter in a pocket. Check you did not just drown the wick." },
      { problem: "The flame blows sideways and dies.", fix: "You are using an unsheltered butane flame in wind. Cup it, move to the lean-to, or switch to a chimney lighter or a ferro rod." },
      { problem: "It lit your hand.", fix: "Overfilled wick lighter, or a leak. Wipe fuel off skin before the next strike. If it is leaking, retire it." },
    ],
    drill: {
      title: "The first fire, on purpose",
      goal: "Use a lighter to learn the lay, not to skip learning it. One flick, one teepee, on a mildly windy pit.",
      steps: [
        "Test the lighter away from the lay.",
        "Build a teepee. Light the tinder, not the tips of the kindling.",
        "Put the lighter down before you feed the fire, so you are not holding fuel over flame.",
      ],
      success: "A fire that reaches wrist-thick wood, started with one light, lighter closed and cool in your pocket.",
    },
    caution:
      "Fuel on skin, fuel in a hot tent, and fuel poured 'to help' a struggling fire are how lighters stop being tools. Never add liquid fuel to a flame. Never light one in a cloud of stove fuel. Close a wick lighter to extinguish it.",
  },
  {
    id: "arc",
    number: 14,
    name: "Piezo and the arc",
    epithet: "A spark with no flint left in it.",
    eraGroup: "modern",
    era: "Late 20th century, then the 2010s",
    circa: "Piezoelectric gas lighters spread in the 1960s and 70s. USB arc lighters, about the 2010s.",
    origin: "Kitchen and grill first, pocket later",
    difficulty: 1,
    ignition: "spark",
    weather: "A piezo spark lights gas, not a stick, and it does not care about wind until the flame it lit is exposed. An arc lighter is oddly windproof and oddly helpless in rain or with a dead battery.",
    learn: "An evening to understand what they cannot do.",
    practiceRank: 14,
    summary:
      "A piezoelectric igniter slams a spring-loaded hammer into a crystal and the voltage jumps a gap as a spark. The effect was described in the 19th century. The clicker on a gas grill is the late-20th-century tool. It lights fuel. It will not light a feather of cedar the way a ferro rod will. The electric-arc lighter of the 2010s uses a battery to hold a small plasma arc between two electrodes. The arc is hot and shrugs off a breeze. It fails when wet, when dirty, and when the battery is empty.",
    principle:
      "Both tools make an electrical spark. The piezo spark is a single snap meant to ignite gas that is already flowing. The arc is a continuous hot path that can light tinder directly, until the battery or the electrodes quit. Neither one is a fuel. Neither one is a plan.",
    place:
      "They are last because they are newest, not because they are best. The line ends on a method that can be undone by a forgotten charging cable. That is the lesson to leave with.",
    kit: [
      { item: "A piezo gas lighter", note: "Long-neck, with fuel. The spark without the gas click is not a fire tool." },
      { item: "Or an arc lighter", note: "Charged, dry, electrodes not bent together or packed with lint." },
      { item: "A backup that is not electric", note: "Matches or a ferro rod in the same kit. This drill is incomplete if the backup is theoretical." },
      { item: "Tinder and a lay", note: "Still. The newest spark on the line does not repeal the ladder." },
    ],
    steps: [
      {
        title: "Know which spark you hold",
        body: "If it clicks once and hisses gas, it is a piezo lighter. Hold the button so gas and spark meet, and shield the young flame. Clicking it empty into a tinder pile will disappoint you. If it holds a violet arc with no fuel smell, it is an arc lighter. Touch the arc to fine tinder the way you would touch a flame, briefly.",
      },
      {
        title: "Light a real lay with it",
        body: "Same teepee as the match lesson. The point is not to discover that a lighter lights. The point is to see how little of the skill moved when the flint disappeared.",
      },
      {
        title: "Kill it on purpose",
        body: "In a safe, unlit moment, notice the failure: a wet electrode, a dead battery, an empty gas tank. Then light the same lay with the ferro rod or the matches you are carrying because of this paragraph. The newest method is the one you are not allowed to trust alone.",
      },
    ],
    faults: [
      { problem: "Click, no flame.", fix: "No gas, or the spark gap is looking at the wrong place. Confirm fuel. Watch where the snap actually jumps." },
      { problem: "The arc will not start.", fix: "Battery, water, or debris across the electrodes. Dry it. Charge it. Do not pry the electrodes with a knife while it is on." },
      { problem: "It lit and the fire still failed.", fix: "The lay failed. Newest ignition on the line, oldest mistake. Smaller kindling, more air, drier tinder." },
    ],
    drill: {
      title: "The dead-battery drill",
      goal: "Light one fire with the newest tool, and the next fire without it.",
      steps: [
        "Charge the arc lighter or fill the piezo lighter. Prove it away from the lay.",
        "Light a teepee with it.",
        "Put it in your pocket and light a second teepee with a match or a ferro rod.",
      ],
      success: "Two fires. Only one of them depended on a battery or a fuel tank you might not have next time.",
    },
    caution:
      "An arc will bite skin and will light fumes you did not mean to light, including stove fuel in a tent. Keep it off until it is at the tinder. Do not carry a lithium battery loose with keys and coins. A piezo lighter is still a fuel lighter: no pouring, no leaking, no flame in a fuel cloud.",
  },
];

export const indoorWarning =
  "Never light charcoal, a hibachi, a campfire, a fuel-burning stove, a lantern, a gas or propane device, or any open flame indoors, in a tent, in a camper, or in a garage. Burning charcoal, wood, and other fuels make carbon monoxide, a gas you cannot see or smell, and it can kill people and pets. Cook and burn only outdoors with fresh air. A carbon monoxide alarm is for the house. It is not permission to burn fuel inside.";

export type GuideSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  ordered?: boolean;
};

export type GuidePage = {
  id: string;
  name: string;
  epithet: string;
  navNote: string;
  summary: string;
  sections: GuideSection[];
};

export const pages: GuidePage[] = [
  {
    id: "start",
    name: "Start here",
    epithet: "Seven steps before you chase an older method.",
    navNote: "First visit",
    summary: "New to making fire? Read this page, then the craft chapter. The whole guide is free.",
    sections: [
      {
        title: "New to making fire?",
        ordered: true,
        items: [
          "Read the craft chapter first.",
          "Check burn rules for your place today. Use an existing fire ring when one is there.",
          "Set enough water and a shovel down before anything sparks.",
          "Build the tinder, kindling, and fuel piles before you light.",
          "Practice one easy method (match or ferro rod) until it is boring.",
          "Only then try older methods.",
          "Put every fire all the way out. Drown and stir until it is cold. Do not bury it.",
        ],
      },
    ],
  },
  {
    id: "kit",
    name: "Starter kit",
    epithet: "What belongs in a beginner box for this volume.",
    navNote: "Membership boxes",
    summary:
      "A good beginner kit for this volume. Practice the craft chapter with this kit before you try friction methods.",
    sections: [
      {
        title: "A good beginner kit for this volume",
        items: [
          "A ferrocerium rod with a scraper (works when wet; easy to mail).",
          "Storm or 'forever' matches in a waterproof case, OR skip mailed matches and use the ferro rod (see Shipping note).",
          "Dry tinder: cotton balls, jute twine, cedar curls, or commercial tinder tabs that are legal to ship.",
          "A small signal mirror.",
          "A magnifying glass with a cover.",
          "A printed safety card: enough water and a shovel, existing fire ring, adult in charge, drown and stir until cold, never bury coals, never burn indoors.",
        ],
        paragraphs: [
          "Practice the craft chapter with this kit before you try friction methods.",
        ],
      },
      {
        title: "Shipping / hazmat",
        paragraphs: [
          "If you mail kit boxes in the United States, check USPS Publication 52 and your shipper before you pack anything. The rules are specific, and they change. Safety matches may go in domestic mail only by surface transportation, and only when packed the way those rules require. Strike-anywhere matches are nonmailable. Fuel tabs are not one category: whether a tab may be mailed depends on that product and the rules that apply to it. Ferro rods, cotton or jute tinder, signal mirrors, and covered magnifying glasses are usually the safer items to mail. Never put lighter fluid or loose lithium batteries in a surprise box.",
        ],
      },
    ],
  },
  {
    id: "glossary",
    name: "Glossary",
    epithet: "The words this guide uses, in plain language.",
    navNote: "Words",
    summary: "Short meanings for the words you will meet in the lessons.",
    sections: [
      {
        title: "Words",
        items: [
          "Tinder: the finest, fluffiest dry material that catches a spark or coal.",
          "Kindling: pencil- to thumb-thick dry sticks that take the flame from the tinder.",
          "Fuel: the larger wood that keeps the fire going.",
          "Coal / ember: a glowing piece of fuel without a flame.",
          "Lay: how you stack the wood (teepee, lean-to, top-down).",
          "Ferrocerium (ferro rod): a man-made spark metal used in modern rods and lighter 'flints'.",
          "Char cloth: cotton or linen cooked in a tin until it catches a spark easily.",
          "Burn ban: a rule that forbids open flames for a time or place.",
          "Carbon monoxide: a deadly gas from burning charcoal, wood, or other fuel with too little air, including stoves, lanterns, and gas or propane devices.",
        ],
      },
    ],
  },
  {
    id: "about",
    name: "About",
    epithet: "What this volume is, and what it is not.",
    navNote: "Disclaimer",
    summary: "Part of The Education Revolution pocket guide series.",
    sections: [
      {
        title: "About and disclaimer",
        paragraphs: [
          "This pocket guide is for learning outdoors where fire is legal. It is not a permit, and it is not a substitute for local fire rules. You are responsible for every fire you light. Blue and the Awesome Dudes are not responsible for burns, wildfire, property damage, injury, or death. Part of The Education Revolution pocket guide series.",
        ],
      },
    ],
  },
];

export function isMethod(entry: Craft | Method | GuidePage): entry is Method {
  return "number" in entry;
}

export function isPage(entry: Craft | Method | GuidePage): entry is GuidePage {
  return "sections" in entry;
}

export function lineEntries(sort: "age" | "practice"): Array<Craft | Method> {
  if (sort === "age") return [craft, ...methods];
  return [craft, ...[...methods].sort((a, b) => a.practiceRank - b.practiceRank)];
}

export function readingOrder(sort: "age" | "practice"): Array<GuidePage | Craft | Method> {
  return [...pages, ...lineEntries(sort)];
}

export function findEntry(id: string): GuidePage | Craft | Method {
  const page = pages.find((item) => item.id === id);
  if (page) return page;
  if (id === craft.id) return craft;
  return methods.find((method) => method.id === id) ?? craft;
}
