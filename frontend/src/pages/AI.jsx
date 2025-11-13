import { useState } from 'react';
import api from '../api/axiosConfig';

const AI = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setError('');
    setLoading(true);
    setResponse('');

    try {
      const result = await api.post('/api/ai', { prompt });
      setResponse(result.data.response);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to get AI response. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Assistant</h1>
      <p className="text-gray-600 mb-6">
        Ask questions about hostel facilities, rules, or get general help.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Question
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask your question here..."
            />
          </div>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">AI is thinking...</p>
          </div>
        </div>
      )}

      {response && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">AI Response</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
          <button
            onClick={() => {
              setResponse('');
              setPrompt('');
            }}
            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default AI;

