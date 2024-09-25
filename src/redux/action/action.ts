export const UPDATE_GAME_SESSION = 'UPDATE_GAME_SESSION';

export interface UpdateGameSessionAction {
  type: typeof UPDATE_GAME_SESSION;
  payload: {
    date: string;
  };
}

export const updateGameSession = (date: string): UpdateGameSessionAction => ({
  type: UPDATE_GAME_SESSION,
  payload: { date },
});