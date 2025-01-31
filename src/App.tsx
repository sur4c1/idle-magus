// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   App.tsx                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: yyyyyy <yyyyyy@42.fr>                      +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2025/01/31 07:48:18 by yyyyyy            #+#    #+#             //
//   Updated: 2025/01/31 09:49:03 by yyyyyy           ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import { useEffect, useState } from "react";
import { GameState, useGame } from "./Game";

function App() {
	const [game, setGame] = useGame();
	const [meditating, setMeditating] = useState(false);
	const [concentration, setConcentration] = useState(0);

	const activateMeditate = () => {
		setMeditating(true);
		setGame((game: GameState) => ({ ...game, flow: 1 }));
	};
	const desactivateMeditate = () => {
		setMeditating(false);
		setConcentration(0);
		setGame((game: GameState) => ({ ...game, flow: 0 }));
	};

	useEffect(() => {
		const second = setInterval(() => {
			if (meditating) {
				setConcentration((old: number) => old + 1);
			}
		}, 1000);
		return () => clearInterval(second);
	}, [meditating]);

	useEffect(() => {
		if (meditating) {
			setGame((game: GameState) => (
				{
					...game,
					flow: Math.max(
						Math.ceil(Math.log1p(concentration) / Math.LN10),
						1,
					),
				}
			));
		}
	}, [concentration, meditating]);

	return (
		<>
			<h1>{game.mana.toFixed(1)} 🜛</h1>
			<h2>(+ {game.flow}/s)</h2>
			<button
				onMouseDown={activateMeditate}
				onMouseUp={desactivateMeditate}
				onMouseLeave={desactivateMeditate}
			>
				{meditating ? `Meditating (${concentration}s)` : "Meditate"}
			</button>
		</>
	);
}

export default App;
