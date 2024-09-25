import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import gameSessionReducer from "../features/gameSessionSlice";
import gameCardReducer from '../features/gameCardSlice';
import inFavoritesReducer from '../features/addToFavoritesSlice';
import gameCampReducer from '../features/gameCardSlice';
import localizationReducer from '../features/localizationSlice'
import gamesForSearchReducer from "../features/gamesForSearchSlice";


const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
    getGameCard: gameCardReducer,
    takeFavorites: inFavoritesReducer,
    takeFavorite: inFavoritesReducer,
    gameCamp: gameCampReducer,
    localization: localizationReducer,
    gamesForSearch: gamesForSearchReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

