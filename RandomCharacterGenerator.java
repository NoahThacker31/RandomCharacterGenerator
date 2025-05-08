import java.util.Random;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

class RandomCharacterGenerator {
	public static void main(String[] args) {
		System.out.println("Working on it...");
		generateCharacter();
	}

	public static void generateCharacter() {
		String race = getRace();
		String birthsign = getBirthsign();
		String specialization = getSpecialization();
		String[] attributes = getAttributes();
		String[] skills = getSkills();
		String[] quests = getQuests();
		String number = determineCharacterNumber();
		String content = formatText(number, race, birthsign, specialization, attributes, skills, quests);
		try {
			writeToFile(number, content);
		} catch (Exception e) {
			System.out.println("Failed to write to file.  Error: " + e.getMessage());
		}
	}

	public static String getRace() {
		Random random = new Random();
		int raceNumber = random.nextInt(20);

		String[] races = {
				"Argonian - Arnesia",
				"Argonian - Thornmarsh",
				"Breton - Systres",
				"Breton - High Rock",
				"Dark Elf - Vvardenfell",
				"Dark Elf - Mainland",
				"High Elf - Auridon",
				"High Elf - Summerset",
				"Imperial - Nibenay",
				"Imperial - Colovia",
				"Khajiit - Anequina",
				"Khajiit - Pellitine",
				"Nord - Western",
				"Nord - Eastern",
				"Orc - Stronghold",
				"Orc - Orsinium",
				"Redguard - Dragontail Mountains",
				"Redguard - Alik'r Desert",
				"Wood Elf - Grahtwood",
				"Wood Elf - Reaper's March"
		};

		String race = races[raceNumber];

		System.out.println("Generated Race");

		return race;
	}

	public static String getBirthsign() {
		Random random = new Random();
		int birthsignNumber = random.nextInt(13);

		String[] birthsigns = {
				"Apprentice",
				"Atronach",
				"Lady",
				"Lord",
				"Lover",
				"Mage",
				"Ritual",
				"Serpent",
				"Shadow",
				"Steed",
				"Thief",
				"Tower",
				"Warrior"
		};

		String birthsign = birthsigns[birthsignNumber];

		System.out.println("Generated Birthsign");

		return birthsign;
	}

	public static String getSpecialization() {
		Random random = new Random();
		int specializationNumber = random.nextInt(3);

		String[] specializations = {
				"Combat",
				"Magic",
				"Stealth"
		};

		String specialization = specializations[specializationNumber];
		System.out.println("Generated Specialization");

		return specialization;
	}

	public static String[] getAttributes() {
		String attribute1 = getAttribute();
		String attribute2 = getAttribute();

		while (attribute2.equals(attribute1)) {
			attribute2 = getAttribute();
		}

		String[] attributes = { attribute1, attribute2 };

		System.out.println("Generated Attributes");

		return attributes;
	}

	public static String getAttribute() {
		Random random = new Random();
		int attributeNumber = random.nextInt(8);

		String[] attributes = {
				"Agility     ",
				"Endurance   ",
				"Intelligence",
				"Luck        ",
				"Personality ",
				"Speed       ",
				"Strength    ",
				"Willpower   "
		};

		String attribute = attributes[attributeNumber];

		return attribute;
	}

	public static String[] getSkills() {
		String skill1 = getSkill();
		String skill2 = getSkill();
		String skill3 = getSkill();
		String skill4 = getSkill();
		String skill5 = getSkill();
		String skill6 = getSkill();
		String skill7 = getSkill();

		while (skill2.equals(skill1)) {
			skill2 = getSkill();
		}
		while (skill3.equals(skill1) || skill3.equals(skill2)) {
			skill3 = getSkill();
		}
		while (skill4.equals(skill1) || skill4.equals(skill2) || skill4.equals(skill3)) {
			skill4 = getSkill();
		}
		while (skill5.equals(skill1) || skill5.equals(skill2) || skill5.equals(skill3) || skill5.equals(skill4)) {
			skill5 = getSkill();
		}
		while (skill6.equals(skill1) || skill6.equals(skill2) || skill6.equals(skill3) || skill6.equals(skill4)
				|| skill6.equals(skill5)) {
			skill6 = getSkill();
		}
		while (skill7.equals(skill1) || skill7.equals(skill2) || skill7.equals(skill3) || skill7.equals(skill4)
				|| skill7.equals(skill5) || skill7.equals(skill6)) {
			skill7 = getSkill();
		}

		String[] skills = { skill1, skill2, skill3, skill4, skill5, skill6, skill7 };

		System.out.println("Generated Skills");

		return skills;
	}

	public static String getSkill() {
		Random random = new Random();
		int skillNumber = random.nextInt(21);

		String[] skills = {
				"Acrobatics  ",
				"Alchemy     ",
				"Alteration  ",
				"Armorer     ",
				"Athletics   ",
				"Blade       ",
				"Block       ",
				"Blunt       ",
				"Conjuration ",
				"Destruction ",
				"Hand to Hand",
				"Heavy Armor ",
				"Illusion    ",
				"Light Armor ",
				"Marksman    ",
				"Mercantile  ",
				"Mysticism   ",
				"Restoration ",
				"Security    ",
				"Sneak       ",
				"Speechcraft "
		};

		String skill = skills[skillNumber];

		return skill;
	}

	public static String[] getQuests() {
		Random random = new Random();
		int factionNumber = random.nextInt(6);

		String[] factions = {
			"Fighters Guild",
			"Mages Guild",
			"Thieves Guild",
			"Dark Brotherhood",
			"Knights of the Nine",
			"Shivering Isles"
		};

		String faction = factions[factionNumber];

		String[] quests = {
			"Main Quest",
			faction
		};
		return quests;
	}

	public static String determineCharacterNumber() {
		int number = 1;
		boolean exists = true;

		File directory = new File("Characters");
        if (!directory.exists()){
            directory.mkdirs();
        }

		while (exists == true) {
			String stringNumber = Integer.toString(number);
			if (number < 10) {
				stringNumber = "0" + stringNumber;
			}
			String filePath = "Characters/Character " + stringNumber + ".txt";
			File file = new File(filePath);

			if (!file.exists()) {
				exists = false;
			} else {
				number = number + 1;
			}
		}

		String stringNumber = Integer.toString(number);
		if (number < 10) {
			stringNumber = "0" + stringNumber;
		}

		return stringNumber;
	}

	public static String formatText(String number, String race, String birthsign, String specialization,
			String[] attributes, String[] skills, String[] quests) {
		String content = " ___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "|                         New Character #" + number + "\r\n";
		content = content + "|___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "| Race:\r\n";
		content = content + "|    " + race + "\r\n";
		content = content + "|\r\n";
		content = content + "| Birthsign:\r\n";
		content = content + "|    " + birthsign + "\r\n";
		content = content + "|\r\n";
		content = content + "| Class:\r\n";
		content = content + "|    Specialization:\r\n";
		content = content + "|       " + specialization + "\r\n";
		content = content + "|\r\n";
		content = content + "|    Attributes:\r\n";
		content = content + "|       " + attributes[0] + "     " + attributes[1] + "\r\n";
		content = content + "|\r\n";
		content = content + "|    Skills:\r\n";
		content = content + "|       " + skills[0] + "     " + skills[1] + "\r\n";
		content = content + "|       " + skills[2] + "     " + skills[3] + "\r\n";
		content = content + "|       " + skills[4] + "     " + skills[5] + "\r\n";
		content = content + "|       " + skills[6] + "\r\n";
		content = content + "|___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "|    Quests:\r\n";
		content = content + "|       " + quests[0] + " + " + quests[1] + "\r\n";
		content = content + "|___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "|                              Rules\r\n";
		content = content + "|___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "| - Create a new character using 'Random Character Generator.exe'.\r\n";
		content = content + "| - Difficulty must be on Expert (or higher).\r\n";
		content = content + "| - No Fast Travel.\r\n";
		content = content + "| - You CANNOT use weapons not in your class.\r\n";
		content = content + "| - You CANNOT use armor not in your class.\r\n";
		content = content + "| - You CANNOT wear a shield if Block is not in your class.\r\n";
		content = content + "| - You CANNOT use Repair Hammers if Armorer is not in your class.\r\n";
		content = content + "| - You CANNOT use spells not in your class.\r\n";
		content = content + "| - You CAN use any spell scrolls or staff (even if they\r\n";
		content = content + "|     use spell scrolls that are not in your class).\r\n";
		content = content + "| - You CANNOT lockpick if Security is not in your class.\r\n";
		content = content + "| - You CANNOT haggle if Mercantile is not in your class.\r\n";
		content = content + "| - You CANNOT use the Persuasion Wheel if Speechcraft is\r\n";
		content = content + "|     not in your class.\r\n";
		content = content + "| - No mods that change gameplay.\r\n";
		content = content + "| - If you die, you reset at the sewers exit with a new\r\n";
		content = content + "|     random character.\r\n";
		content = content + "| - When generating characters, you may change one thing about your\r\n";
		content = content + "|     character per death you have suffered.\r\n";
		content = content + "| - You win if you complete the Main Quest + your random\r\n";
		content = content + "|     Faction Quest.\r\n";
		content = content + "| - Post your character sheet on the Nexus Mods page if you die or win.\r\n";
		content = content + "|     Note how many times you died.  Maybe we will have a leaderboard\r\n";
		content = content + "|     on the Nexus page based on number of attempts or time?\r\n";
		content = content + "|___________________________________________________________________\r\n";
		content = content + "|\r\n";
		content = content + "| Check out my videos at: https://www.youtube.com/@TheNoahThacker \r\n";
		content = content + "| Nexus Page: https://www.nexusmods.com/oblivionremastered/mods/2450\r\n";
		content = content + "|___________________________________________________________________\r\n";

		System.out.println("Generated Character Sheet:");
		System.out.println(content);

		return content;
	}

	public static void writeToFile(String number, String content) throws Exception {
		String fileName = "Characters/Character " + number + ".txt";

		File directory = new File("/Characters");
        if (!directory.exists()){
            directory.mkdirs();
        }
		
		FileWriter file = new FileWriter(fileName);

		file.write(content);
		file.close();

		System.out.println("File Created: " + fileName + ".  Enjoy!");
	}
}