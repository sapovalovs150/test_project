-- Устанавливаем правильную кодировку
ALTER DATABASE user_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Создаем таблицу с расширенными полями
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birth_date DATE,
    phone VARCHAR(20),
    position VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Добавляем тестовые данные с нормальными русскими буквами
INSERT INTO users (name, email, birth_date, phone, position, description) VALUES
('Иван Петров', 'ivan.petrov@example.com', '1990-05-15', '+7 (999) 123-45-67', 'Администратор', 'Отвечает за общую координацию'),
('Мария Иванова', 'maria.ivanova@example.com', '1988-11-23', '+7 (999) 234-56-78', 'Менеджер проектов', 'Управляет командой разработки'),
('Сергей Сидоров', 'sergey.sidorov@example.com', '1995-03-07', '+7 (999) 345-67-89', 'Разработчик', 'Full-stack разработчик'),
('Елена Козлова', 'elena.kozlova@example.com', '1992-08-19', '+7 (999) 456-78-90', 'Дизайнер', 'UI/UX дизайнер'),
('Алексей Смирнов', 'alexey.smirnov@example.com', '1987-12-03', '+7 (999) 567-89-01', 'Тестировщик', 'QA инженер');