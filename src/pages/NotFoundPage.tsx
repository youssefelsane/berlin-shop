import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 my-4">Seite nicht gefunden</p>
      <Link to="/" className="text-primary-500">Zur Startseite</Link>
    </div>
  )
}