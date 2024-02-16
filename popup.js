document.addEventListener("DOMContentLoaded", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const activeTab = tabs[0];

		chrome.scripting.executeScript({
			target: { tabId: activeTab.id },
			files: ["content.js"],
		});
	});
});

chrome.runtime.onMessage.addListener(function (message) {
	const classesInfo = message.classesInfo;

	const popupContent = document.getElementById("popupContent");
	const contentTable = document.getElementById("contentTable");

	if (classesInfo && classesInfo.length > 0) {
		popupContent.innerHTML = "<b>Class Information:</b><br><br>";

		const tableHeaders = "<tr><th>Name</th><th>Type</th><th>Room</th><th>Day</th><th>Time</th><th>Actions</th></tr>";
		contentTable.innerHTML = tableHeaders;

		classesInfo.forEach((classInfo) => {
			const tableRow = `<tr><td>${classInfo.name}</td><td>${classInfo.type}</td><td>${classInfo.room}</td><td>${
				classInfo.day
			}</td><td>${classInfo.time}</td><td><button class="addToCalendarButton" data-class="${encodeURIComponent(
				JSON.stringify(classInfo)
			)}">Add to Calendar</button></td></tr>`;

			contentTable.innerHTML += tableRow;
		});

		contentTable.addEventListener("click", function (event) {
			if (event.target.classList.contains("addToCalendarButton")) {
				const classInfo = JSON.parse(decodeURIComponent(event.target.getAttribute("data-class")));
				const eventLocation = `Location: ${classInfo.room}`;
				const eventDescription = `${classInfo.name} - ${classInfo.type}\n${eventLocation}\nTime: ${classInfo.time}\nDay: ${classInfo.day}`;

				// Open Google Calendar link in a new tab
				const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
					classInfo.name
				)}&details=${encodeURIComponent(eventDescription)}`;
				window.open(googleCalendarLink, "_blank");
			}
		});
	} else {
		popupContent.innerHTML = "<b>No class information found on the page.</b>";
		contentTable.innerHTML = "";
	}
});
