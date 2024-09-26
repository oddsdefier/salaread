// import React, { useState } from "react";
// import { Button, Modal } from "flowbite-react";

// const ConfigModal: React.FC = () => {
// 	const [openModal, setOpenModal] = useState(false);
// 	const [workingHours, setWorkingHours] = useState<number>(0);

// 	const handleWeekend = () => {
// 		const currentDate = new Date();
// 		const month = currentDate.getMonth();
// 		const year = currentDate.getFullYear();

// 		let workingHours: number = 0;
// 		const daysInMonth: number = new Date(year, month + 1, 0).getDate();

// 		// Loop through each day of the month
// 		for (let day = 1; day <= daysInMonth; day++) {
// 			const date = new Date(year, month, day);
// 			const dayOfWeek: number = date.getDay();

// 			// Check if it's not a weekend (0 is Sunday, 6 is Saturday)
// 			if (dayOfWeek !== 0 && dayOfWeek !== 6) {
// 				workingHours++; // Only count weekdays (Mon-Fri)
// 			}
// 		}

// 		console.log(`Total working days (excluding weekends): ${workingHours}`);
// 	};
// 	handleWeekend();

// 	return (
// 		<>
// 			<div>
// 				<button onClick={() => setOpenModal(true)}>Configuration</button>
// 				<Modal show={openModal} onClose={() => setOpenModal(false)}>
// 					<Modal.Header>Terms of Service</Modal.Header>
// 					<Modal.Body>
// 						<div className="space-y-6">
// 							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
// 							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>

// 							<div>
// 								<label htmlFor="default-range" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
// 									Default range
// 								</label>
// 								<input
// 									id="default-range"
// 									type="range"
// 									min="1"
// 									max="16"
// 									value={workingHours}
// 									onChange={(e) => {
// 										setWorkingHours(Number(e.target.value));
// 										console.log(workingHours);
// 									}}
// 									className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"></input>
// 							</div>
// 						</div>
// 					</Modal.Body>
// 					<Modal.Footer>
// 						<Button onClick={() => setOpenModal(false)}>I accept</Button>
// 						<Button color="gray" onClick={() => setOpenModal(false)}>
// 							Decline
// 						</Button>
// 					</Modal.Footer>
// 				</Modal>
// 			</div>
// 		</>
// 	);
// };

// export default ConfigModal;
