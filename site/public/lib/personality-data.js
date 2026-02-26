export const questions = [
    {
        id: 'q1',
        text: "You are approaching Turn 1 on the opening lap from P4. What's your move?",
        options: [
            { text: "Divebomb the inside to snatch P2 immediately.", traits: { aggression: 20, risk: 20, consistency: -5 } },
            { text: "Hold your line and wait to capitalize on others' mistakes.", traits: { consistency: 15, aggression: 5, risk: -5 } },
            { text: "Brake early to guarantee you survive the first-lap chaos.", traits: { consistency: 20, risk: -15, aggression: -10 } },
            { text: "Take the wide outside line to carry speed into Turn 2.", traits: { adaptability: 20, risk: 10, technical: 5 } }
        ]
    },
    {
        id: 'q2',
        text: "Your engineer tells you it might rain in 5 laps. You are currently on slick tires.",
        options: [
            { text: "Box now for Intermediates! I want to jump the field.", traits: { risk: 25, adaptability: 10, consistency: -10 } },
            { text: "Stay out until the track is actually wet. Don't ruin the tires.", traits: { consistency: 15, technical: 10, risk: -10 } },
            { text: "Tell the team to keep checking the radar while I adapt to the grip loss.", traits: { adaptability: 20, technical: 15 } },
            { text: "Ignore them and push harder to build a gap before it rains.", traits: { aggression: 20, risk: 15, consistency: -5 } }
        ]
    },
    {
        id: 'q3',
        text: "You are stuck behind a slightly slower car for 10 laps, ruining your tires.",
        options: [
            { text: "Force a move at the next braking zone, even if it's tight.", traits: { aggression: 25, risk: 15 } },
            { text: "Ask the team for an alternate pit strategy to undercut them.", traits: { technical: 20, consistency: 10 } },
            { text: "Back off to cool the tires and wait for the DRS straight.", traits: { consistency: 20, technical: 10, aggression: -5 } },
            { text: "Change your racing lines through the corners to provoke a mistake.", traits: { adaptability: 20, technical: 10, aggression: 5 } }
        ]
    },
    {
        id: 'q4',
        text: "During Friday Practice, the car balance feels completely wrong.",
        options: [
            { text: "Spend the whole session in the garage changing the entire setup.", traits: { technical: 25, consistency: -5 } },
            { text: "Drive around the issues. The driver makes the difference, not the car.", traits: { adaptability: 25, technical: -10 } },
            { text: "Do long runs anyway to gather tire degradation data.", traits: { consistency: 20, technical: 10 } },
            { text: "Push to the absolute limit and see where the car snaps.", traits: { aggression: 15, risk: 20, adaptability: 5 } }
        ]
    },
    {
        id: 'q5',
        text: "You are leading the race with 2 laps to go, but your tires are dead. P2 is catching fast.",
        options: [
            { text: "Defend aggressively. They shall not pass.", traits: { aggression: 20, risk: 15 } },
            { text: "Focus entirely on getting perfect exits out of corners.", traits: { technical: 15, consistency: 15 } },
            { text: "Drive the absolute perfect racing line, no mistakes.", traits: { consistency: 25, risk: -10 } },
            { text: "Change settings on the steering wheel to maximize battery deployment.", traits: { technical: 20, adaptability: 10 } }
        ]
    },
    {
        id: 'q6',
        text: "A red flag comes out. You have 15 minutes before the restart.",
        options: [
            { text: "Put your headphones on and block everyone out.", traits: { consistency: 15, adaptability: -5 } },
            { text: "Stare down your rivals in the pit lane.", traits: { aggression: 20, risk: 5 } },
            { text: "Review data telemetry with your engineers.", traits: { technical: 25, consistency: 5 } },
            { text: "Check your phone and relax. It's just another race.", traits: { adaptability: 15, risk: 10 } }
        ]
    },
    {
        id: 'q7',
        text: "Your teammate is faster today and asking to be let past.",
        options: [
            { text: "Radio: 'Tell him to overtake me on track if he's so fast.'", traits: { aggression: 25, consistency: -5 } },
            { text: "Let them by immediately to help the team score points.", traits: { consistency: 20, risk: -15 } },
            { text: "Ask what the strategic benefit is before deciding.", traits: { technical: 20, adaptability: 5 } },
            { text: "Speed up and start setting faster lap times to prove you're quicker.", traits: { aggression: 15, risk: 10, adaptability: 10 } }
        ]
    },
    {
        id: 'q8',
        text: "You secure Pole Position on Saturday. How do you feel?",
        options: [
            { text: "Ecstatic. I drove the absolute perfect lap.", traits: { consistency: 20, risk: 10 } },
            { text: "Calm. The points are scored on Sunday.", traits: { consistency: 20, technical: 5 } },
            { text: "Ready. Nobody is beating me into Turn 1 tomorrow.", traits: { aggression: 20, adaptability: 5 } },
            { text: "Analytical. Looking at where I can find another tenth.", traits: { technical: 25, risk: -5 } }
        ]
    },
    {
        id: 'q9',
        text: "The Team Principal tells you the strategy has changed mid-race.",
        options: [
            { text: "Argue on the radio. You know what's best from the cockpit.", traits: { aggression: 15, risk: 15 } },
            { text: "Acknowledge and execute the new plan perfectly.", traits: { consistency: 20, technical: 5 } },
            { text: "Adapt your driving style immediately to the new stint length.", traits: { adaptability: 25 } },
            { text: "Ask for delta times and tire life projections before agreeing.", traits: { technical: 20, risk: -10 } }
        ]
    },
    {
        id: 'q10',
        text: "You just won the World Championship!",
        options: [
            { text: "Scream on the radio and do massive donuts.", traits: { aggression: 15, risk: 15 } },
            { text: "Thank the team, the factory, and everyone who built the car.", traits: { technical: 15, consistency: 15 } },
            { text: "Cry. It's the culmination of endless adaptation and struggle.", traits: { adaptability: 20 } },
            { text: "Celebrate briefly. Now I want the next one.", traits: { consistency: 20, aggression: 10 } }
        ]
    }
];

export const driverTraitMatrix = {
    // Scale of 0 - 100 for each driver
    VER: { aggression: 95, consistency: 95, technical: 85, risk: 90, adaptability: 98 },
    HAD: { aggression: 85, consistency: 70, technical: 70, risk: 85, adaptability: 75 },
    NOR: { aggression: 80, consistency: 90, technical: 85, risk: 75, adaptability: 90 },
    PIA: { aggression: 80, consistency: 95, technical: 80, risk: 70, adaptability: 95 },
    LEC: { aggression: 85, consistency: 80, technical: 80, risk: 95, adaptability: 85 },
    HAM: { aggression: 80, consistency: 90, technical: 90, risk: 70, adaptability: 95 },
    RUS: { aggression: 85, consistency: 85, technical: 90, risk: 80, adaptability: 80 },
    ANT: { aggression: 90, consistency: 70, technical: 75, risk: 85, adaptability: 80 },
    ALO: { aggression: 90, consistency: 95, technical: 95, risk: 85, adaptability: 100 },
    STR: { aggression: 85, consistency: 60, technical: 65, risk: 80, adaptability: 60 },
    ALB: { aggression: 70, consistency: 85, technical: 85, risk: 70, adaptability: 85 },
    SAI: { aggression: 75, consistency: 90, technical: 95, risk: 70, adaptability: 85 },
    GAS: { aggression: 80, consistency: 80, technical: 80, risk: 80, adaptability: 75 },
    COL: { aggression: 85, consistency: 75, technical: 70, risk: 85, adaptability: 80 },
    OCO: { aggression: 90, consistency: 80, technical: 75, risk: 85, adaptability: 75 },
    BEA: { aggression: 80, consistency: 80, technical: 75, risk: 80, adaptability: 85 },
    HUL: { aggression: 75, consistency: 90, technical: 85, risk: 70, adaptability: 80 },
    BOR: { aggression: 80, consistency: 80, technical: 75, risk: 75, adaptability: 80 },
    LAW: { aggression: 85, consistency: 80, technical: 75, risk: 85, adaptability: 80 },
    LIN: { aggression: 80, consistency: 75, technical: 70, risk: 80, adaptability: 75 },
    PER: { aggression: 70, consistency: 65, technical: 70, risk: 70, adaptability: 60 },
    BOT: { aggression: 65, consistency: 80, technical: 85, risk: 60, adaptability: 70 }
};

export const traitDescriptions = {
    aggression: "How hard you push the limits in wheel-to-wheel combat.",
    consistency: "Your ability to deliver relentless, error-free lap times.",
    technical: "Your analytical approach to car setup and strategy.",
    risk: "Your willingness to make bold, calculated gambles.",
    adaptability: "How well you handle changing conditions and unexpected setups."
};

// Initial trait state for a new user taking the quiz
export const initialUserTraits = {
    aggression: 50,
    consistency: 50,
    technical: 50,
    risk: 50,
    adaptability: 50
};

export const driverDescriptions = {
    VER: "You are a relentless force of nature. Uncompromising, aggressively fast, and you possess an innate ability to extract maximum performance from the car exactly when it matters most.",
    HAD: "You have explosive pace and a fiery determination to prove yourself, taking risks where others hesitate.",
    NOR: "You are incredibly consistent and fiercely self-critical, always striving for perfection while keeping your elbows out when defending.",
    PIA: "Ice in your veins. You approach high-pressure situations with a quiet calculated calmness that belies your aggressive speed.",
    LEC: "A pure qualifying specialist. You put it all on the line with breathtaking risk-taking, dragging the car to places it shouldn't go.",
    HAM: "You are the complete package. A master tactician who combines flawless consistency with ruthless adaptability in changing conditions.",
    RUS: "Analytical and sharp. You think three steps ahead of the competition and execute bold strategies with precision.",
    ANT: "A raw, prodigious talent. Fully fearless and willing to trust your instincts over the data.",
    ALO: "A wily, relentless fighter. Your adaptability is legendary, and you excel at exploiting every single variable to your advantage.",
    STR: "You thrive when the conditions are difficult and chaotic, relying on deep aggressive instinct.",
    ALB: "A methodical builder. You are the technical leader of your team, providing setup consistency that punches above the car's weight.",
    SAI: "The strategic mastermind. You calculate your moves with technical precision and unparalleled situational awareness.",
    GAS: "A tenacious competitor who balances calculated risks with solid Sunday consistency.",
    COL: "Fearless and daring. You are a natural opportunist who throws the car into corners with pure aggression.",
    OCO: "Fiercely defensive and unapologetically aggressive in wheel-to-wheel combat.",
    BEA: "A fast adapter. You take the tools given to you and immediately find the limit without overthinking.",
    HUL: "Experienced and solid. A qualifying star who relies on supreme technical consistency over a single lap.",
    BOR: "You are a calculated prospect who carefully builds up speed without making unnecessary errors.",
    LAW: "You race with a chip on your shoulder—aggressive, highly adaptable, and eager to prove you belong at the top.",
    LIN: "You rely on a consistent, smooth driving style that looks effortless but yields great results.",
    PER: "The tire whisperer. You have a unique technical ability to make rubber last longer than anyone else.",
    BOT: "A flying finn who pairs technical brilliance with raw qualifying speed when the conditions are right."
};
