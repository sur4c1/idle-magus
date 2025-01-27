import { useEffect, useState } from "react";

function App() {
	const [mana, setMana] = useState(0);
	const [flow, setFlow] = useState(0);
	const [meditating, setMeditating] = useState(false);
	const [concentration, setConcentration] = useState(0);

	const activateMeditate = () => {
		setMeditating(true);
		setFlow(1);
	};
	const desactivateMeditate = () => {
		setMeditating(false);
		setConcentration(0);
		setFlow(0);
	};

	useEffect(() => {
		const second = setInterval(() => {
			if (meditating) {
				setConcentration((old) => old + 1);
			}
			setMana((old) => old + flow);
		}, 1000);
		return () => clearInterval(second);
	}, [meditating, flow]);

	useEffect(() => {
		if (meditating) {
			setFlow(
				Math.max(Math.ceil(Math.log1p(concentration) / Math.LN10), 1),
			);
		}
	}, [concentration, meditating]);

	return (
		<>
			<h1>{mana} 🜛 (+ {flow}/s)</h1>
			<button
				onMouseDown={activateMeditate}
				onMouseUp={desactivateMeditate}
			>
				{meditating ? `Meditating (${concentration}s)` : "Meditate"}
			</button>
		</>
	);
}

export default App;
