export type ChipOption = {
  id: string;
  label: string;
  group?: string;
};

export type ChipGroup = {
  group: string;
  options: ChipOption[];
};

export const ABOUT_ME_GROUPS: ChipGroup[] = [
  {
    group: "About me",
    options: [
      { id: "am_calm", label: "Calm", group: "About me" },
      { id: "am_funny", label: "Funny", group: "About me" },
      { id: "am_ambitious", label: "Ambitious", group: "About me" },
      { id: "am_thoughtful", label: "Thoughtful", group: "About me" },
    ],
  },
];

export const LOOKING_FOR_GROUPS: ChipGroup[] = [
  {
    group: "Looking for",
    options: [
      { id: "lf_serious", label: "Serious", group: "Looking for" },
      { id: "lf_dating", label: "Dating", group: "Looking for" },
      { id: "lf_friendship", label: "Friendship", group: "Looking for" },
    ],
  },
];

export function flattenGroups(groups: ChipGroup[]): ChipOption[] {
  const out: ChipOption[] = [];
  for (const g of groups) {
    for (const o of g.options) out.push({ ...o, group: o.group ?? g.group });
  }
  return out;
}

export function idToLabel(id: string): string {
  const all = [
    ...flattenGroups(ABOUT_ME_GROUPS),
    ...flattenGroups(LOOKING_FOR_GROUPS),
  ];
  const hit = all.find((o) => o.id === id);
  return hit?.label ?? id;
}
