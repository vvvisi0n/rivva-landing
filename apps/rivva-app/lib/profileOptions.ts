export type ChipOption = {
  id: string;
  label: string;
  group?: string;
};

export const ABOUT_ME_GROUPS: { group: string; options: ChipOption[] }[] = [];
export const LOOKING_FOR_GROUPS: { group: string; options: ChipOption[] }[] = [];

export function flattenGroups(groups: { group: string; options: ChipOption[] }[]): ChipOption[] {
  return (groups ?? []).flatMap((g) =>
    (g.options ?? []).map((o) => ({
      id: o.id,
      label: o.label,
      group: o.group ?? g.group,
    }))
  );
}

export function idToLabel(id: string): string {
  const all = [
    ...flattenGroups(ABOUT_ME_GROUPS),
    ...flattenGroups(LOOKING_FOR_GROUPS),
  ];

  return all.find((x) => x.id === id)?.label ?? id;
}
