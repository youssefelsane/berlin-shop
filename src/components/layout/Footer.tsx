export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t dark:border-gray-700 py-8 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p>&copy; {year} Berlin Shop. Alle Rechte vorbehalten VON(Youssef_Elsne).</p>
      </div>
    </footer>
  )
}