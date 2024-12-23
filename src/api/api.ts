import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 5000,
});

instance.interceptors.response.use(
    (response) => response, // Успешный ответ
    (error) => {
        if (error.response) {
            // Ошибки с сервера (4xx, 5xx)
            console.error("Ошибка HTTP:", error.response.status, error.response.data);
            alert(`Ошибка: ${error.response.status}. ${error.response.data?.message || "Что-то пошло не так."}`);
        } else if (error.request) {
            // Сервер не ответил
            console.error("Ошибка сети:", error.message);
            alert("Сервер не отвечает. Проверьте подключение к сети.");
        } else {
            // Проблема с запросом
            console.error("Ошибка запроса:", error.message);
            alert("Ошибка при отправке запроса.");
        }
        return Promise.reject(error); // Пробрасываем ошибку дальше
    }
);


