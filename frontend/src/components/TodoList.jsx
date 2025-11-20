import { useState, useEffect } from 'react';
import { todos as todosApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function TodoList() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todosApi.getAll();
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setLoading(true);
    try {
      await todosApi.create(newTodo);
      setNewTodo({ title: '', description: '' });
      await fetchTodos();
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await todosApi.update(id, { completed: !completed });
      await fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todosApi.delete(id);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleCreate} className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Todo</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows="3"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No todos yet. Create your first one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p
                      className={`mt-1 text-sm ${
                        todo.completed ? 'line-through text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm shrink-0"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
