document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    addButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();

        if (taskText === '') {
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', () => {
            li.remove();
            // Optionally send a request to the server to delete this item
        });

        li.appendChild(removeButton);
        li.addEventListener('click', () => {
            li.classList.toggle('done');
            // Optionally send a request to the server to update this item
        });

        todoList.appendChild(li);
        todoInput.value = '';

        // Send POST request to save the new task
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: taskText })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
        })
        .catch(error => console.error('Error:', error));
    });

    // Allow pressing Enter to add a task
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    // Fetch existing tasks from the server
    fetch('/api/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.name;
                if (todo.done) {
                    li.classList.add('done');
                }
                
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-btn';
                removeButton.addEventListener('click', () => {
                    li.remove();
                    // Optionally send a request to the server to delete this item
                });

                li.appendChild(removeButton);
                li.addEventListener('click', () => {
                    li.classList.toggle('done');
                    // Optionally send a request to the server to update this item
                });

                todoList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
});
