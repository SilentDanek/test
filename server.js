import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Для обработки POST, PUT и PATCH необходимо использовать body-parser
server.use(jsonServer.bodyParser)

server.use(middlewares);

// Middleware для поддержки /tasks/:projectId
server.get("/projects", (req, res) => {
    const db = router.db;
    const projects = db.get(`projects`).value();

    if (projects) {
        const projectsWithNumberOfTasks = projects.map((project) => {
            const tasks = db.get(`tasks[${project.id}]`).value();
            let projectWithNumberOfTasks = 0;
            if (tasks) {
                projectWithNumberOfTasks = tasks.length;
            }

            return {
                ...project,
                taskCount: projectWithNumberOfTasks
            }
        })
        res.json(projectsWithNumberOfTasks);
    } else {
        res.status(404).json({ error: "Projects not found" })
    }
});

// Middleware для поддержки /tasks/:projectId
server.get("/tasks/:projectId", (req, res) => {
    const { projectId } = req.params;

    const db = router.db;
    const tasks = db.get(`tasks[${projectId}]`).value();

    if (tasks) {
        res.json(tasks);
    } else {
        const projects = db.get(`projects`).value();

        if (projects.find((project) => project.id === projectId)) {
            res.json([]);
        } else {
            res.status(404).json({ error: "Tasks not found for the given projectId"})
        }
    }
});

// PUT для обновления задачи
server.put("/tasks/:projectId", (req, res) => {
    const { projectId } = req.params;
    const taskData = req.body;
    const db = router.db;
    const tasks = db.get(`tasks[${projectId}]`).value();

    if (tasks) {
        const taskIndex = tasks.findIndex((task) => task.id === taskData.id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
            db.set(`tasks[${projectId}]`, tasks).write();
            res.json(tasks[taskIndex]);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } else {
        res.status(404).json({ error: "Tasks not found for the given projectId"});
    }
});

// DELETE для удаления задачи
server.delete("/tasks/:projectId/:taskId", (req, res) => {
    const { projectId, taskId } = req.params;

    const db = router.db; // Доступ к базе данных JSON Server
    const tasks = db.get(`tasks[${projectId}]`).value();
    console.log(taskId)
    if (tasks) {
        const filteredTasks = tasks.filter((task) => task.id !== +taskId);
        db.set(`tasks[${projectId}]`, filteredTasks).write(); // Сохраняем изменения
        res.status(200).json({ message: "Task deleted successfully" });
    } else {
        res.status(404).json({ error: "Tasks not found for the given projectId" });
    }
});

// POST для добавления новой задачи
server.post("/tasks/:projectId", (req, res) => {
    const { projectId } = req.params;
    const newTask = req.body;

    const db = router.db; // Доступ к базе данных JSON Server
    const tasks = db.get(`tasks[${projectId}]`).value() || [];

    const newId = tasks.length ? `${parseInt(tasks[tasks.length - 1].id, 10) + 1}` : "1";
    const taskWithId = { ...newTask, id: newId };
    tasks.push(taskWithId);
    db.set(`tasks[${projectId}]`, tasks).write(); // Сохраняем изменения
    res.status(201).json(taskWithId);
});

// POST для добавления новой задачи
server.get("/dashboard", (req, res) => {
    const db = router.db; // Доступ к базе данных
    const projects = db.get("projects").value(); // Получение всех проектов
    const countOfTasks = new Map(); // Инициализация Map для подсчета задач по статусам
    const a = []
    if (projects) {
        projects.forEach((project) => {
            const tasks = db.get(`tasks[${project.id}]`).value(); // Получение задач проекта
            if (tasks) {
                tasks.forEach((task) => {
                    // Проверяем, есть ли уже статус в Map
                    console.log(tasks)
                    if (countOfTasks.has(task.status)) {
                        // Увеличиваем количество задач этого статуса
                        countOfTasks.set(task.status, countOfTasks.get(task.status) + 1);
                    } else {
                        // Устанавливаем начальное значение 1 (вместо 0)
                        countOfTasks.set(task.status, 1);
                    }
                });
            }
        });

        // Возвращаем результат в формате массива
        res.json(Array.from(countOfTasks.entries())); // Преобразование Map в массив пар [ключ, значение]
    } else {
        res.status(404).json({ error: "Projects not found" }); // Ошибка, если проектов нет
    }
});


server.use(router);

server.listen(5000, () => {
    console.log("JSON Server is running on http://localhost:5000");
});

