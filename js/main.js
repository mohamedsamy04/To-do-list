$(document).ready(function() {
    loadTasks();

    $('#add-task-btn').click(function() {
        addTask();
    });

    $('#new-task').keypress(function(e) {
        if (e.which == 13) {
            addTask();
        }
    });

    function addTask() {
        var taskText = $('#new-task').val();
        if (taskText !== '') {
            var newTask = $('<li></li>').text(taskText);
            var checkbox = $('<input type="checkbox">');
            var customCheckbox = $('<div class="custom-checkbox"></div>');
            var deleteBtn = $('<button class="delete-btn"><i class="fas fa-trash"></i></button>');


            deleteBtn.click(function() {
                $(this).parent().addClass('remove');
                setTimeout(() => {
                    $(this).parent().remove();
                    saveTasks();
                }, 300);
            });


            customCheckbox.click(function() {
                $(this).parent().toggleClass('completed');
                $(this).prev('input[type="checkbox"]').prop('checked', function(_, checked) {
                    return !checked;
                });
                saveTasks();
            });

            newTask.prepend(checkbox).prepend(customCheckbox);
            newTask.append(deleteBtn);
            $('#task-list').append(newTask);
            $('#new-task').val('');
            saveTasks();
        }
    }

    function saveTasks() {
        var tasks = [];
        $('#task-list li').each(function() {
            var task = {
                text: $(this).clone().children().remove().end().text().trim(),
                completed: $(this).hasClass('completed')
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(task) {
                var newTask = $('<li></li>').text(task.text);
                var checkbox = $('<input type="checkbox">');
                var customCheckbox = $('<div class="custom-checkbox"></div>');
                var deleteBtn = $('<button class="delete-btn"><i class="fas fa-trash"></i></button>');

                if (task.completed) {
                    newTask.addClass('completed');
                    checkbox.prop('checked', true);
                }

                deleteBtn.click(function() {
                    $(this).parent().addClass('remove');
                    setTimeout(() => {
                        $(this).parent().remove();
                        saveTasks();
                    }, 300);
                });

                customCheckbox.click(function() {
                    $(this).parent().toggleClass('completed');
                    $(this).prev('input[type="checkbox"]').prop('checked', function(_, checked) {
                        return !checked;
                    });
                    saveTasks();
                });

                newTask.prepend(checkbox).prepend(customCheckbox);
                newTask.append(deleteBtn);
                $('#task-list').append(newTask);
            });
        }
    }
});
