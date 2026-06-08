import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [materials, setMaterials] = useState([])
  const [uploading, setUploading] = useState(false)

  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/materials')
      const data = await response.json()
      if (Array.isArray(data)) {
        setMaterials(data)
      }
    } catch (error) {
      console.error('Error fetching materials:', error)
    }
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        setFile(null)
        fetchMaterials()
        alert('File uploaded successfully!')
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="App">
      <h1>Study Buddy AI</h1>
      
      <div className="upload-section">
        <h2>Upload Study Material</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={uploading || !file}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      <div className="materials-section">
        <h2>Your Materials</h2>
        {materials.length === 0 ? (
          <p>No materials uploaded yet.</p>
        ) : (
          <ul>
            {materials.map((m) => (
              <li key={m.id}>
                {m.filename} ({m.status}) - {new Date(m.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
