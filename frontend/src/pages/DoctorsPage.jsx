import { useEffect, useState } from 'react'

function DoctorsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/v1/doctors').then((response) => { if (!response.ok) throw new Error('Could not load doctors'); return response.json() }).then((result) => setData(result.data)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false))
  }, [])

  return <div className="page"><div className="section-heading"><div className="eyebrow">Our specialists</div><h2>Meet the doctors</h2><p className="lead">Experienced people, available to help you take the next step.</p></div>{loading && <p className="message">Loading doctors...</p>}{error && <p className="message error">{error}</p>}<div className="doctor-grid">{data.map((doctor) => <article className="doctor-card" key={doctor.id}><h3>{doctor.name}</h3><p>{doctor.specialisation}</p><p className={`availability ${doctor.available ? '' : 'unavailable'}`}>{doctor.available ? 'Available' : 'Currently unavailable'}</p></article>)}</div></div>
}

export default DoctorsPage
