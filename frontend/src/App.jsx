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
    <div>
      <h1>Habit Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Activity name</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
