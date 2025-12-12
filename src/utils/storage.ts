export const STORAGE_KEYS = {
  WISHES: 'sneha-wishes',
  PUZZLE_PROGRESS: 'puzzle-progress',
  AUDIO_MUTED: 'audio-muted',
  VISITED: 'has-visited'
};

export const saveWish = (wish: string) => {
  const wishes = getWishes();
  wishes.push(wish);
  localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(wishes));
};

export const getWishes = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.WISHES);
  return stored ? JSON.parse(stored) : [];
};

export const savePuzzleProgress = (step: number) => {
  localStorage.setItem(STORAGE_KEYS.PUZZLE_PROGRESS, JSON.stringify({ completedStep: step }));
};

export const getPuzzleProgress = (): number => {
  const stored = localStorage.getItem(STORAGE_KEYS.PUZZLE_PROGRESS);
  if (stored) {
    const { completedStep } = JSON.parse(stored);
    return completedStep;
  }
  return 0;
};

export const hasVisited = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.VISITED) === 'true';
};

export const markAsVisited = () => {
  localStorage.setItem(STORAGE_KEYS.VISITED, 'true');
};
