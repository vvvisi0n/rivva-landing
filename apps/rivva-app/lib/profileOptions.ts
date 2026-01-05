export type ChipOption = {
  id: string;
  label: string;
  group: string;
};

export type ChipGroup = {
  group: string;
  options: ChipOption[];
};

export const ABOUT_ME_GROUPS: ChipGroup[] = [
  {
    group: "About me",
    options: [
      { id: "abt_calm", label: "Calm", group: "About me" },
      { id: "abt_funny", label: "Funny", group: "About me" },
      { id: "abt_ambitious", label: "Ambitious", group: "About me" },
      { id: "abt_creative", label: "Creative", group: "About me" },
    ],
  },
];

export const LOOKING_FOR_GROUPS: ChipGroup[] = [
  {
    group: "Looking for",
    options: [
      { id: "lf_kind", label: "Kind", group: "Looking for" },
      { id: "lf_loyal", label: "Loyal", group: "Looking for" },
      { id: "lf_growth", label: "Growth-minded", group: "Looking for" },
      { id: "lf_communication", label: "Good communicator", group: "Looking for" },
    ],
  },
];

export function flattenGroups(groups: ChipGroup[]): ChipOption[] {
  return groups.flatMap((g) => g.options);
}

export function idToLabel(id: string): string {
  const all = flattenGroups([...ABOUT_ME_GROUPS, ...LOOKING_FOR_GROUPS]);
  return all.find((o) => o.id === id)?.label ?? id;
}
