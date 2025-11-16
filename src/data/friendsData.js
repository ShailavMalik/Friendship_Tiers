/**
 * Friends Data
 * Predefined friends with their current tier levels
 * Names are normalized (lowercase, common variations handled)
 */

export const knownFriends = {
  // Close Friends
  closeFriends: [
    { names: ["tarun"], displayName: "Tarun" },
    { names: ["bhawan", "bhawna", "bawana"], displayName: "Bhawana" },
    { names: ["shaili", "shaily"], displayName: "Shaili" },
    { names: ["shivam", "shivam shakya"], displayName: "Shivam" },
    { names: ["rahul", "rahul chauchan"], displayName: "Rahul" },
  ],

  // BFF (Best Friends Forever)
  bff: [
    { names: ["sarthak", "sarthak vats"], displayName: "Sarthak" },
    { names: ["jay", "jay gupta"], displayName: "Jay" },
    {
      names: ["vaani", "vaani pal"],
      displayName: "Vaani",
      message: "You are some arrogant but still a bff 😁",
    },
  ],

  // Close Acquaintance (new tier after insertion in UI)
  closeAcquaintance: [
    { names: ["vipul", "vipul bhardwaj"], displayName: "Vipul" },
    { names: ["isha"], displayName: "Isha" },
    { names: ["vikas", "vikas kumar"], displayName: "Vikas" },
    { names: ["jayant"], displayName: "Jayant" },
    { names: ["anuskha"], displayName: "Anuskha" },
    { names: ["rachit","rachit kumar"], displayName: "Rachit" },
    { names: ["shivani","shivani sharma"], displayName: "Shivani" },
    { names: ["kumkum","kumkum"], displayName: "Kumkum" },
    { names: ["shivansh","shivansh poonia"], displayName: "Shivansh" },
    { names: ["aman","aman anand"], displayName: "Aman" },
    { names: ["vishu","vishu rajput"], displayName: "Vishu" },
    { names: ["sahil"], displayName: "Sahil" },
  ],

  // Just Knowing
  justKnowing: [
    { names: ["tanvi"], displayName: "Tanvi" },
    { names: ["khushi"], displayName: "Khushi" },
    { names: ["parisha"], displayName: "Parisha" },
    { names: ["nikky chaudhary","nikki"], displayName: "Nikky" },
    { names: ["nisha","nisha"], displayName: "Nisha" },
    { names: ["n","nisha"], displayName: "Nisha" },
    { names: ["divyani","divyani soni"], displayName: "Divyani" },
    { names: ["chirag","chirag tomar"], displayName: "Chirag" },
    { names: ["shivansh","shivansh poonia"], displayName: "Shivansh" },
    { names: ["aarti","aarti saini"], displayName: "Aarti" },
    { names: ["pooja"], displayName: "Pooja" },
  ],

  // Friends
  friends: [
    {
      names: ["gungun", "gungun singh"],
      displayName: "Gungun",
      message: "Your transparent & simple nature is really appreciable.",
    },
    {
      names: ["sakshi", "sakshi poonia"],
      displayName: "Sakshi",
      message: "Your transparent & simple nature is really appreciable.",
    },
    { names: ["ritika", "ritika sharma"], displayName: "Ritika" },
    { names: ["nishant", "nishant tomar"], displayName: "Nishant" },
    {
      names: ["aishi", "aishi mitra"],
      displayName: "Aishi",
      message:
        "The way you keep giving relationship advice – you'll soon become a Close Friend!",
    },
    { names: ["aditya", "aditya mudhgal"], displayName: "Aditya" },
    { names: ["ananya", "ananya jain"], displayName: "Ananya" },
    { names: ["bhupendra", "bhupendra hapawat"], displayName: "Bhupendra" },
    { names: ["vansh", "vansh tomar"], displayName: "Vansh" },
    { names: ["rakshit", "rakshit chaudhary"], displayName: "Rakshit" },
  ],
};

/**
 * Normalize a name for matching
 * - Convert to lowercase
 * - Remove extra spaces
 * - Remove common suffixes (sir names, etc.)
 */
export const normalizeName = (name) => {
  if (!name) return "";

  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(
      /\b(malik|sir|kumar|sharma|vats|chauchan|poonia|singh|gupta|pal|tomar|shakya|bhardwaj|mitra|mudhgal|jain)\b/gi,
      ""
    ) // Remove common surnames
    .trim();
};

/**
 * Find if a name matches any known friend
 * Returns { tier, displayName } or null
 */
export const findFriendTier = (inputName) => {
  const normalized = normalizeName(inputName);

  if (!normalized) return null;

  // Check Close Friends
  for (const friend of knownFriends.closeFriends) {
    if (
      friend.names.some((name) => {
        const normalizedFriendName = normalizeName(name);
        // Exact match or substring match for typos
        return (
          normalizedFriendName === normalized ||
          normalized.includes(normalizedFriendName) ||
          normalizedFriendName.includes(normalized) ||
          calculateSimilarity(normalized, normalizedFriendName) > 0.7
        );
      })
    ) {
      return {
        tier: "Close Friends",
        displayName: friend.displayName,
        tierLevel: 4,
        message: friend.message,
      };
    }
  }

  // Check BFF
  for (const friend of knownFriends.bff) {
    if (
      friend.names.some((name) => {
        const normalizedFriendName = normalizeName(name);
        return (
          normalizedFriendName === normalized ||
          normalized.includes(normalizedFriendName) ||
          normalizedFriendName.includes(normalized) ||
          calculateSimilarity(normalized, normalizedFriendName) > 0.7
        );
      })
    ) {
      return { tier: "BFF", displayName: friend.displayName, tierLevel: 5 };
    }
  }

  // Check Close Acquaintance
  if (knownFriends.closeAcquaintance) {
    for (const friend of knownFriends.closeAcquaintance) {
      if (
        friend.names.some((name) => {
          const normalizedFriendName = normalizeName(name);
          return (
            normalizedFriendName === normalized ||
            normalized.includes(normalizedFriendName) ||
            normalizedFriendName.includes(normalized) ||
            calculateSimilarity(normalized, normalizedFriendName) > 0.7
          );
        })
      ) {
        return {
          tier: "Close Acquaintance",
          displayName: friend.displayName,
          tierLevel: 3,
        };
      }
    }
  }

  // Check Just Knowing
  if (knownFriends.justKnowing) {
    for (const friend of knownFriends.justKnowing) {
      if (
        friend.names.some((name) => {
          const normalizedFriendName = normalizeName(name);
          return (
            normalizedFriendName === normalized ||
            normalized.includes(normalizedFriendName) ||
            normalizedFriendName.includes(normalized) ||
            calculateSimilarity(normalized, normalizedFriendName) > 0.7
          );
        })
      ) {
        return {
          tier: "Just Knowing",
          displayName: friend.displayName,
          tierLevel: 2,
          message: friend.message,
        };
      }
    }
  }

  // Check Friends
  for (const friend of knownFriends.friends) {
    if (
      friend.names.some((name) => {
        const normalizedFriendName = normalizeName(name);
        return (
          normalizedFriendName === normalized ||
          normalized.includes(normalizedFriendName) ||
          normalizedFriendName.includes(normalized) ||
          calculateSimilarity(normalized, normalizedFriendName) > 0.7
        );
      })
    ) {
      return {
        tier: "Friends",
        displayName: friend.displayName,
        tierLevel: 4,
        message: friend.message,
      };
    }
  }

  return null;
};

/**
 * Simple string similarity calculator (Levenshtein-like)
 * Returns value between 0 and 1 (1 = identical)
 */
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * Calculate Levenshtein distance between two strings
 */
const getEditDistance = (str1, str2) => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};
