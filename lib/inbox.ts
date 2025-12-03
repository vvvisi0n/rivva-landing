// lib/inbox.ts  (preferred location)

export type ThreadMeta = {
  id: string;
  matchId: string;
  name: string;

  lastMessage?: string;
  lastActive?: string;

  // UI expects these sometimes
  avatar?: string;
  unread?: boolean;
};

export const MOCK_THREADS: ThreadMeta[] = [
  {
    id: "t1",
    matchId: "m1",
    name: "Ari",
    lastMessage: "You up for tacos this week?",
    lastActive: "2h ago",
    avatar: "/matches/ari-1.jpg",
    unread: true,
  },
  {
    id: "t2",
    matchId: "m2",
    name: "Noah",
    lastMessage: "That playlist was fire lol",
    lastActive: "5h ago",
    avatar: "/matches/noah-1.jpg",
    unread: false,
  },
  {
    id: "t3",
    matchId: "m3",
    name: "Zee",
    lastMessage: "Send me your favorite song rn",
    lastActive: "1d ago",
    avatar: "/matches/zee-1.jpg",
    unread: false,
  },
];

export function formatThreadTime(lastActive?: string) {
  return lastActive ?? "";
}