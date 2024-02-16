(() => {
	const classesInfo = [];
	const classContainers = document.querySelectorAll(".chart-row-bars .classContainer");

	classContainers.forEach((classContainer) => {
		const dayElement = classContainer.closest(".chart-row").querySelector(".chart-row-item");

		if (!dayElement) {
			console.error("Day element not found");
			return;
		}

		const day = dayElement.innerText.trim();
		const className = classContainer.querySelector(".className").innerText;
		const classType = classContainer.querySelector(".classType").innerText;
		const classRoomElement = classContainer.querySelector(".classRoom");

		if (classRoomElement) {
			const classRoom = classRoomElement.innerText;
      const classTime = classRoomElement.nextSibling.innerText;
      const eventDescription = `${className} - ${classType}\nRoom: ${classRoom}\nTime: ${classTime}\nDay: ${day}`;

			classesInfo.push({
				day: day,
				name: className,
				type: classType,
				room: classRoom,
				time: classTime,
				eventDescription: eventDescription,
			});
		}
	});

	chrome.runtime.sendMessage({ classesInfo: classesInfo });
})();
