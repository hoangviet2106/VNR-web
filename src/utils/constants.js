export const ROUTES = {
  home: '/',
  travel: (year) => `/travel/${year}`,
  era: (year) => `/era/${year}`,
  quiz: (year) => `/era/${year}/quiz`,
};

export const STORAGE_KEY = 'time-machine:v1';

// Thời lượng (ms) các bước của hiệu ứng du hành
export const TRAVEL = {
  countdownStep: 700,
  tunnel: 2200,
  flash: 400,
};
