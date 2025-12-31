export type Option = {
  id: string;
  label: string;
  helper?: string;
};

export const ABOUT_ME_OPTIONS: Option[] = [
  { id: "emotionally_intelligent", label: "Emotionally intelligent", helper: "I value clarity + calm communication" },
  { id: "gentle_confident", label: "Gentle but confident", helper: "Soft energy, firm boundaries" },
  { id: "playful_real", label: "Playful + real", helper: "I like humor with honesty" },
  { id: "slow_builder", label: "Slow builder", helper: "I open up through consistency" },
  { id: "deep_talks", label: "Deep talks", helper: "I like meaning, not small talk" },
  { id: "affectionate", label: "Affectionate", helper: "Warm, expressive, intentional" },
  { id: "low_drama", label: "Low drama", helper: "Peace > chaos" },
  { id: "ambitious", label: "Ambitious", helper: "I’m building something" },
  { id: "creative", label: "Creative", helper: "Art, music, design, ideas" },
  { id: "homebody", label: "Homebody", helper: "Cozy nights count as dates" },
  { id: "outdoors", label: "Outdoorsy", helper: "Walks, nature, fresh air" },
  { id: "social_but_balanced", label: "Social but balanced", helper: "I need both people + alone time" },

  // Inclusion-forward, non-invasive (opt-in vibes, not identities)
  { id: "low_stimulation", label: "Low-stimulation friendly", helper: "I like calm spaces + gentle pacing" },
  { id: "direct_communicator", label: "Direct communicator", helper: "Kind honesty, no guessing games" },
  { id: "privacy_minded", label: "Privacy-minded", helper: "I keep things respectful + discreet" },

  // Freeform is handled by profile text field later (not here)
];

export const LOOKING_FOR_OPTIONS: Option[] = [
  { id: "serious", label: "Serious relationship", helper: "Long-term, intentional" },
  { id: "dating", label: "Dating", helper: "Exploring with intention" },
  { id: "slow_dating", label: "Slow dating", helper: "No rushing, build trust" },
  { id: "emotionally_safe", label: "Emotional safety", helper: "Consistency + respect" },
  { id: "clear_communication", label: "Clear communication", helper: "Say what you mean kindly" },
  { id: "playful_connection", label: "Playful connection", helper: "Chemistry + laughter" },
  { id: "shared_values", label: "Shared values", helper: "Alignment over aesthetics" },
  { id: "growth_minded", label: "Growth-minded partner", helper: "Self-aware, accountable" },
  { id: "monogamy", label: "Monogamy", helper: "Exclusive, committed" },
  { id: "open_to_explore", label: "Open to explore", helper: "Flexible, respectful" },

  // Safety-first preferences
  { id: "verified_only", label: "Verified profiles only", helper: "Extra trust layer" },
  { id: "respectful_pacing", label: "Respectful pacing", helper: "No pressure, no coercion" },
];

export const MAX_ABOUT_ME = 6;
export const MAX_LOOKING_FOR = 6;
