import React, { useState, useEffect } from 'react';
import { userService } from './services/api';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке пользователей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setFormError('');
    setModalOpen(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormError('');
    setModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      try {
        await userService.delete(id);
        await fetchUsers();
      } catch (err) {
        setError('Ошибка при удалении');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setFormError('');
      if (editingUser) {
        await userService.update(editingUser.id, formData);
      } else {
        await userService.create(formData);
      }
      setModalOpen(false);
      await fetchUsers();
    } catch (err) {
      // Извлекаем сообщение об ошибке из ответа сервера
      const errorMessage = err.response?.data?.error || 'Ошибка при сохранении';
      setFormError(errorMessage);
    }
  };

  if (loading && users.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>📋 Управление пользователями</h1>
        <p>Создавайте, редактируйте и удаляйте записи</p>
      </div>

      <div className="content">
        {error && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        <button onClick={handleAddClick} className="add-button">
          <span className="icon">➕</span> Добавить запись
        </button>

        <div className="table-container">
          <UserTable
            users={users}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingUser ? '✏️ Редактировать запись' : '➕ Создать запись'}
        >
          {formError && (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
              border: '1px solid #ef9a9a'
            }}>
              ❌ {formError}
            </div>
          )}
          <UserForm
            user={editingUser}
            onSubmit={handleSubmit}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;