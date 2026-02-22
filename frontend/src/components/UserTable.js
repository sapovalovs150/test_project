import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBirthDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Нет записей</p>
        <p>Нажмите "Добавить запись" чтобы создать первую</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Дата рождения</th>
          <th>Телефон</th>
          <th>Должность</th>
          <th>Дата создания</th>
          <th>Описание</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>#{user.id}</td>
            <td><strong>{user.name}</strong></td>
            <td>
              <a href={`mailto:${user.email}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                {user.email}
              </a>
            </td>
            <td>{formatBirthDate(user.birth_date)}</td>
            <td>{user.phone || '—'}</td>
            <td>{user.position || '—'}</td>
            <td>{formatDate(user.created_at)}</td>
            <td style={{ maxWidth: '200px' }}>{user.description || '—'}</td>
            <td>
              <div className="action-buttons">
                <button
                  onClick={() => onEdit(user)}
                  className="edit-btn"
                  title="Редактировать"
                >
                  <span>✏️</span>
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="delete-btn"
                  title="Удалить"
                >
                  <span>🗑️</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;