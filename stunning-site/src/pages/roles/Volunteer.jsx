import React, { useState } from "react";

const EVENTS = [
	{ t: "Beach Cleanup", when: "Sat • 7:00 AM", where: "4.2 km away" },
	{ t: "Mangrove Plantation", when: "Sun • 8:00 AM", where: "8.5 km away" },
	{ t: "Turtle Nest Watch", when: "Fri • 6:00 PM", where: "12.1 km away" },
	{ t: "Harbor Debris Audit", when: "Wed • 5:30 PM", where: "6.7 km away" },
	{ t: "Riverbank Sweep", when: "Thu • 7:30 AM", where: "9.3 km away" },
	{ t: "Hotspot Mapping Walk", when: "Tue • 4:00 PM", where: "3.9 km away" },
];

export default function Volunteer() {
	const [filter, setFilter] = useState({ type: "", urgency: "", proximity: "" });

	return (
		<div className="min-h-[100svh] bg-gradient-to-br from-[#E8F5E8] to-[#DFF5E3] text-navy px-4 py-10">
			{/* Hero Section */}
			<div className="w-full max-w-[72rem] mx-auto">
				<div className="pill bg-[#00E5FF] text-black">🤝 Volunteer</div>
				<div className="flex items-center gap-4 mt-3">
					<img
						src="/public/avatar-eco.png"
						alt="Profile Avatar"
						className="w-12 h-12 rounded-full"
					/>
					<h1 className="text-4xl font-bold">John Doe</h1>
				</div>
				<p className="text-lg mt-1">47 missions completed, 12 species saved</p>
			</div>

			{/* Live Map Interface */}
			<div className="mt-10 w-full max-w-[72rem] mx-auto">
				<h2 className="text-2xl font-semibold mb-4">Live Map Interface</h2>
				<div className="bg-[#1A2238] p-6 rounded-lg">
					<div className="h-64 rounded mb-4">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509423!2d-122.419415684681!3d37.77492977975937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1b6e6b1b%3A0x4c7c8f4c4c4c4c4c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1628888888888!5m2!1sen!2sus"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
						></iframe>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Incident Type</label>
							<select
								className="w-full p-2 bg-gray-800 text-white rounded"
								value={filter.type}
								onChange={(e) =>
									setFilter({ ...filter, type: e.target.value })
								}
							>
								<option value="">All</option>
								<option value="climate">🔥 Climate</option>
								<option value="marine">🌊 Marine</option>
								<option value="wildlife">🐾 Wildlife</option>
								<option value="waste">♻️ Waste</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Urgency</label>
							<select
								className="w-full p-2 bg-gray-800 text-white rounded"
								value={filter.urgency}
								onChange={(e) =>
									setFilter({ ...filter, urgency: e.target.value })
								}
							>
								<option value="">All</option>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Proximity</label>
							<select
								className="w-full p-2 bg-gray-800 text-white rounded"
								value={filter.proximity}
								onChange={(e) =>
									setFilter({ ...filter, proximity: e.target.value })
								}
							>
								<option value="">All</option>
								<option value="5">5 km</option>
								<option value="25">25 km</option>
								<option value="100">100 km</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Mission Selection Cards */}
			<div className="mt-10 w-full max-w-[72rem] mx-auto">
				<h2 className="text-2xl font-semibold mb-4">Mission Selection</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{EVENTS.map((e) => {
						let borderColor = "";
						let icon = "";

						if (e.t.includes("Beach")) {
							borderColor = "border-[#81D4FA]";
							icon = "🏖️";
						} else if (e.t.includes("Mangrove")) {
							borderColor = "border-[#A5D6A7]";
							icon = "🌿";
						} else if (e.t.includes("Turtle")) {
							borderColor = "border-[#FFAB91]";
							icon = "🐢";
						}

						return (
							<div
								key={e.t}
								className={`bg-white p-4 rounded-lg border ${borderColor} shadow-md hover:shadow-lg transition-shadow`}
							>
								<div className="font-semibold text-navy text-lg flex items-center gap-2">
									{icon} {e.t}
								</div>
								<div className="text-sm text-gray-600 mt-1">
									Location: {e.where}
								</div>
								<div className="text-sm text-gray-600 mt-1">
									Status: <span className="text-green-500">Active</span>
								</div>
								<div className="mt-3">
									<span className="text-sm text-gray-600">Threat Level:</span>
									<span className="ml-2 text-yellow-500">Medium</span>
								</div>
								<div className="mt-1">
									<span className="text-sm text-gray-600">Required Skills:</span>
									<span className="ml-2 text-blue-500">Teamwork, Navigation</span>
								</div>
								<div className="mt-1">
									<span className="text-sm text-gray-600">Team Size:</span>
									<span className="ml-2 text-green-500">3/5 volunteers needed</span>
								</div>
								<div className="mt-1">
									<span className="text-sm text-gray-600">Estimated Impact:</span>
									<span className="ml-2 text-purple-500">
										Could save 200+ marine animals
									</span>
								</div>
								<button className="mt-4 bg-gradient-to-r from-[#81D4FA] to-[#A5D6A7] text-white px-4 py-2 rounded font-semibold w-full hover:opacity-90">
									Accept Mission
								</button>
							</div>
						);
					})}
				</div>
			</div>

			{/* Climate Action War Room */}
			<div className="mt-10 w-full max-w-[72rem] mx-auto">
				<h2 className="text-2xl font-semibold mb-4">Climate Action War Room</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Real-Time Chat */}
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700">
						<h3 className="text-lg font-semibold text-white mb-4">
							Real-Time Chat
						</h3>
						<div className="h-64 bg-gray-700 rounded mb-4 overflow-y-auto p-4">
							<p className="text-sm text-gray-400">
								[Chat messages will appear here]
							</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="text"
								placeholder="Type a message..."
								className="flex-1 p-2 bg-gray-800 text-white rounded"
							/>
							<button className="bg-[#00E5FF] text-black px-4 py-2 rounded font-semibold">
								Send
							</button>
						</div>
					</div>

					{/* Mission Progress and Photo Uploads */}
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700">
						<h3 className="text-lg font-semibold text-white mb-4">
							Mission Progress
						</h3>
						<div className="mb-4">
							<p className="text-sm text-gray-400">Mission Milestones:</p>
							<ul className="mt-2 space-y-2">
								<li className="flex items-center gap-2">
									<span className="w-4 h-4 bg-green-500 rounded-full"></span>
									<span className="text-sm text-white">
										Phase 1: Site Assessment ✅
									</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
									<span className="text-sm text-white">
										Phase 2: Initial Action 🔄
									</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="w-4 h-4 bg-gray-500 rounded-full"></span>
									<span className="text-sm text-white">
										Phase 3: Data Collection ⏳
									</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="w-4 h-4 bg-gray-500 rounded-full"></span>
									<span className="text-sm text-white">
										Phase 4: Final Documentation ⏳
									</span>
								</li>
							</ul>
						</div>
						<div className="mb-4">
							<p className="text-sm text-gray-400">Real-Time Metrics:</p>
							<ul className="mt-2 space-y-2">
								<li className="text-sm text-white">
									Waste Collected:{" "}
									<span className="text-green-400">120 kg</span>
								</li>
								<li className="text-sm text-white">
									Area Covered:{" "}
									<span className="text-blue-400">3.5 km²</span>
								</li>
								<li className="text-sm text-white">
									Photos Taken:{" "}
									<span className="text-purple-400">15</span>
								</li>
							</ul>
						</div>
						<div>
							<p className="text-sm text-gray-400">Photo Uploads:</p>
							<div className="mt-2 bg-gray-700 p-4 rounded">
								<p className="text-sm text-gray-400">
									Drag and drop photos here or click to upload
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Active Tasks Management */}
			<div className="mt-10 w-full max-w-[72rem] mx-auto">
				<h2 className="text-2xl font-semibold mb-4">Active Tasks</h2>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* To Do Column */}
					<div className="bg-[#1A2238]/80 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg transform transition-transform">
						<h3 className="text-lg font-semibold text-white mb-4">To Do</h3>
						<div className="space-y-4">
							<div className="bg-gray-800/80 backdrop-blur-md p-4 rounded shadow-md">
								<p className="text-sm text-white">Beach Cleanup</p>
								<p className="text-xs text-gray-400">Deadline: 2 days</p>
								<div className="mt-2 w-full bg-gray-700 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full"
										style={{ width: "0%" }}
									></div>
								</div>
							</div>
							<div className="bg-gray-800/80 backdrop-blur-md p-4 rounded shadow-md">
								<p className="text-sm text-white">Mangrove Plantation</p>
								<p className="text-xs text-gray-400">Deadline: 5 days</p>
								<div className="mt-2 w-full bg-gray-700 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full"
										style={{ width: "0%" }}
									></div>
								</div>
							</div>
						</div>
					</div>

					{/* In Progress Column */}
					<div className="bg-[#1A2238]/80 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg transform transition-transform">
						<h3 className="text-lg font-semibold text-white mb-4">In Progress</h3>
						<div className="space-y-4">
							<div className="bg-gray-800/80 backdrop-blur-md p-4 rounded shadow-md">
								<p className="text-sm text-white">Turtle Nest Watch</p>
								<p className="text-xs text-gray-400">Deadline: 1 day</p>
								<div className="mt-2 w-full bg-gray-700 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full"
										style={{ width: "50%" }}
									></div>
								</div>
							</div>
						</div>
					</div>

					{/* Completed Column */}
					<div className="bg-[#1A2238]/80 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg transform transition-transform">
						<h3 className="text-lg font-semibold text-white mb-4">Completed</h3>
						<div className="space-y-4">
							<div className="bg-gray-800/80 backdrop-blur-md p-4 rounded shadow-md">
								<p className="text-sm text-white">Harbor Debris Audit</p>
								<p className="text-xs text-gray-400">Completed: 2 days ago</p>
								<div className="mt-2 w-full bg-gray-700 rounded-full h-2">
									<div
										className="bg-green-500 h-2 rounded-full"
										style={{ width: "100%" }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Impact Tracker */}
			<div className="mt-10 w-full max-w-[72rem] mx-auto">
				<h2 className="text-2xl font-semibold mb-4">Impact Tracker</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700 text-center">
						<h3 className="text-lg font-semibold text-white">Waste Removed</h3>
						<p className="text-4xl font-bold text-green-400 mt-2">1,200 kg</p>
						<p className="text-sm text-gray-400 mt-1">
							Trash-to-treasure visualization
						</p>
					</div>
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700 text-center">
						<h3 className="text-lg font-semibold text-white">Species Saved</h3>
						<p className="text-4xl font-bold text-blue-400 mt-2">47</p>
						<p className="text-sm text-gray-400 mt-1">
							Animal icons with rescue count
						</p>
					</div>
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700 text-center">
						<h3 className="text-lg font-semibold text-white">CO2 Prevented</h3>
						<p className="text-4xl font-bold text-purple-400 mt-2">3,500 kg</p>
						<p className="text-sm text-gray-400 mt-1">Tree growth animation</p>
					</div>
					<div className="bg-[#1A2238] p-6 rounded-lg border border-gray-700 text-center">
						<h3 className="text-lg font-semibold text-white">Water Protected</h3>
						<p className="text-4xl font-bold text-teal-400 mt-2">5,000 L</p>
						<p className="text-sm text-gray-400 mt-1">Ocean wave animation</p>
					</div>
				</div>
			</div>
		</div>
	);
}
