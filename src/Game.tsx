// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Game.tsx                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: yyyyyy <yyyyyy@42.fr>                      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/01/31 07:54:35 by yyyyyy            #+#    #+#             //
//   Updated: 2025/01/31 09:33:16 by yyyyyy           ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import { createContext, useContext, useEffect, useState } from "react";

export type GameState = {
	mana: number;
};

const defaultGameState: GameState = { mana: 0 };

export const GameContext = createContext();

const loadGameState = (): GameState => {
	const saveData = localStorage.getItem("save");
	if (!saveData) return defaultGameState;
	return { ...defaultGameState, ...JSON.parse(atob(saveData)) };
};

const saveGameState = (state: GameState, setLastSave) => {
	console.log("Game saved");
	state.flow = 0;
	localStorage.setItem("save", btoa(JSON.stringify(state)));
	setLastSave(Date.now());
};

export const GameContextProvider = ({ children }) => {
	const [game, setGame] = useState<GameState>(loadGameState());
	const [lastSave, setLastSave] = useState(Date.now());
	const [mustSave, setMustSave] = useState(false);

	useEffect(() => {
		const saver = setInterval(() => {
			setMustSave(true);
		}, 30 * 1000);
		return () => clearInterval(saver);
	}, []);

	useEffect(() => {
		if (mustSave) {
			saveGameState(game, setLastSave);
			setMustSave(false);
		}
	}, [mustSave, game]);

	useEffect(() => {
		const tick = setInterval(() => {
			setGame((game) => ({
				...game,
				mana: game.mana + game.flow * 30 / 1000,
			}));
		}, 1000 / 30);
		return () => clearInterval(tick);
	}, [game.flow]);

	return (
		<GameContext.Provider value={[game, setGame]}>
			{children}
			<div>
				<button
					onClick={() => {
						saveGameState(game, setLastSave);
					}}
				>
					Saved {((Date.now() - lastSave) / 1000).toFixed(2)}s ago
				</button>
				<span>v{import.meta.env.VERSION}</span>
			</div>
		</GameContext.Provider>
	);
};

export const useGame = () => {
	return useContext(GameContext);
};
