function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function changeCategory(category) {
	const categoryButton = document.querySelector('.dropbtn');
	categoryButton.textContent = category;
	categoryButton.dataset.category = category;
}


window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchButton');
	const tasks = list_el.getElementsByClassName('task');
	const noResultsMessage = document.getElementById('noResults');


		// ... (your existing code)
	
		// Add a reference to the "Sort by Date" button
		const sortButton = document.getElementById('sortButton');
	
		// Function to sort tasks by date
		function sortTasksByDate() {
			const tasksArray = Array.from(tasks);
	
			tasksArray.sort((taskA, taskB) => {
				const dateA = new Date(taskA.querySelector('.due-date').textContent.split(': ')[1]);
				const dateB = new Date(taskB.querySelector('.due-date').textContent.split(': ')[1]);
				return dateA - dateB;
			});
	
			// Remove tasks from the list and re-append them in the sorted order
			tasksArray.forEach(task => {
				list_el.removeChild(task);
				list_el.appendChild(task);
			});
		}
	
		// Event listener for the "Sort by Date" button
		sortButton.addEventListener('click', () => {
			sortTasksByDate();
		});
	
		// ... (your existing code)

	

	


	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		const selectedCategory = document.querySelector('.dropbtn').dataset.category;
		const dueDate = document.querySelector('#due-date').value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);


		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_due_date_el = document.createElement('div');
		task_due_date_el.classList.add('due-date');
		task_due_date_el.textContent = `Due Date: ${dueDate}`;

		task_content_el.appendChild(task_due_date_el);

		const task_category_el = document.createElement('div');
		task_category_el.classList.add('category');
		task_category_el.textContent = `Category: ${selectedCategory}`;
		task_content_el.appendChild(task_category_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});

	searchButton.addEventListener('click', () => {
		const searchTerm = searchInput.value.toLowerCase();

		for (const task of tasks) {
			const taskContent = task.querySelector('.text').value.toLowerCase();
			const taskActions = task.querySelector('.actions');

			if (taskContent.includes(searchTerm)) {
				task.style.display = 'flex';
				taskActions.style.display = 'flex';
			} else {
				task.style.display = 'none';
				taskActions.style.display = 'none';
			}
		}
		// Reset the display of all tasks when clearing the search input
		searchInput.addEventListener('input', () => {
			if (!searchInput.value) {
				for (const task of tasks) {
					task.style.display = 'flex';
					task.querySelector('.actions').style.display = 'flex';
				}
				noResultsMessage.style.display = 'none';
			}
		});

		// Show/hide the "No Results Found" message
		let resultsFound = Array.from(tasks).some(task => task.style.display === 'flex');
		if (resultsFound) {
			noResultsMessage.style.display = 'none';
		} else {
			noResultsMessage.style.display = 'block';
		}

	});
})

	