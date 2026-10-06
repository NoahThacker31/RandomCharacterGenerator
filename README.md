# Oblivion Remastered: Random Character Generator

An offline Angular 22 + Electron desktop character generator for Oblivion Remastered.

## Run

Open `release/Oblivion-Random-Character-2.0.0.exe`. This portable Windows x64 app needs no Java or separate installation. The executable is unsigned.

## Develop

Use Node.js 24.15 or later: `npm ci`, then `npm run desktop`. `npm start` runs the browser preview, which saves to browser local storage. `npm test` checks generator constraints; `npm run package` builds the portable Windows executable.

## Characters and saves

The desktop app stores one `characters.json` in Electron's per-user app-data directory; the Characters tab displays its exact location. Writes use a temporary file and rename. Export JSON backup saves a copy wherever you choose. Keep this file when upgrading the app. A read error blocks saving instead of replacing unreadable records.

Records include identity, custom class, seven skills, hours played, quest milestones, completion flags, outcome, death cause, and journal. Progress is manually entered; the app does not read game saves. Won requires both questlines completed. Ended outcomes are locked. Deleting a dead character immediately removes its death credit.

## Randomization

True Random samples seven unique skills without constraints. Balanced Random samples uniformly from sets meeting: at most one armor type, at most one of Blade/Blunt/Hand to Hand, at least one damage skill (including Marksman, Destruction, Conjuration, Restoration), and at least two utility skills. Race, origin, sign, specialization and two distinct attributes remain random. Restoration is counted as requested, though its damage options are situational.

There is one continuous challenge, with no run selector. Each saved character created with Challenge Mode enabled and marked Dead adds one optional pre-run change; one skill or attribute slot counts as one change. The character name is free to edit. Earned changes can intentionally override balanced constraints. A race change uses that race's first origin; a separate origin change uses another allowance. Rerolling a draft is free, as in the original generator.

Quest pool preserves the original six: Fighters Guild, Mages Guild, Thieves Guild, Dark Brotherhood, Knights of the Nine, Shivering Isles. Race/origin data comes from the original Java source. Legacy text character files are not automatically imported.

Fan-made and unaffiliated with Bethesda.

## Journal

All record edits save automatically; journal text queues a save on every keystroke. Quest dropdowns track the last quest completed and derive completion from the final option. Legacy milestones are preserved as legacy options. Quest sources and branch/order details are in QUEST-SOURCES.md. Delete characters from the trash icon on their list card, with an anchored popup confirmation. Percentages use the selected quest stage divided by the final stage, rounded to a whole number.

Version remains 2.0.0 throughout development until Noah explicitly requests a version bump. Stat replacement choices display the actual attributes and skills alphabetically. Old multi-run saves are merged into the continuous challenge; only dead Challenge Mode characters still saved contribute credits.


Portraits load from assets/portraits by race and major skills. MHeavyArmor/FHeavyArmor take precedence over MLightArmor/FLightArmor; characters with neither use MUnarmored/FUnarmored. The same portrait appears in Forge and Characters.


New characters default to the male portrait. The rotate button flips between male and female artwork, and the choice is saved with the character. Reduced motion disables the animation. Edited names are capped at 24 characters and automatically shrink to fit the wider name field; existing names are preserved.

