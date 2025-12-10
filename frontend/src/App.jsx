import { useState } from 'react'
import './App.css'

function App() {
  const [activityName, setActivityName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!', activityName)
    console.log('Start:', startTime)
    console.log('End:', endTime)

    try {
      const resp = await fetch(`${backendApiUrl}/api/v1/activities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: activityName,
          start_time: new Date(startTime).toISOString(),
          end_time: endTime ? new Date(endTime).toISOString() : null,
        }),
      })
      if (resp.ok) {
        console.log('Activity added successfully!')
        // Clear form
        setActivityName('')
        setStartTime('')
        setEndTime('')
      } else {
        console.log('Failed to add activity:', await resp.text())
      }
    } catch (error) {
      console.log('Failed to add activity: ', error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-700 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">Habit Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Activity name
          </label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
