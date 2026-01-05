export type ChipOption = {
  id: string;
  label: string;
  group?: string;
};

export type ChipGroup = {
  id: string;
  title: string;
  options: ChipOption[];
};

// Minimal MVP sets — expand later without changing the shape
export const ABOUT_ME_GROUPS: ChipGroup[] = [
  {
    id: "about-core",
    title: "About me",
    options: [
      { id: "calm", label: "Calm", group: "About me" },
      { id: "ambitious", label: "Ambitious", group: "About me" },
      { id: "creative", label: "Creative", group: "About me" },
      { id: "faith", label: "Faith", group: "About me" },
    ],
  },
];

export const LOOKING_FOR_GROUPS: ChipGroup[] = [
  {
    id: "looking-core",
    title: "Looking for",
    options: [
      { id: "serious", label: "Serious relationship", group: "Looking for" },
      { id: "dating", label: "Dating", group: "Looking for" },
      { id: "friendship", label: "Friendship", group: "Looking for" },
    ],
  },
];

export function flattenGroups(groups: ChipGroup[]): ChipOption[] {
  return groups.flatMap((g) => g.options);
}

export function idToLabel(id: string): string {
  const all = [
    ...flattenGroups(ABOUT_ME_GROUPS),
    ...flattenGroups(LOOKING_FOR_GROUPS),
  ];
  return all.find((o) => o.id === id)?.label ?? id;
}
