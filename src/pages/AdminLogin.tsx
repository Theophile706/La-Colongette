import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { adminApi } from '@/utils/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSending(true)
    setError('')
    const response = await adminApi.login(email, password)
    setSending(false)
    if (response.error || !response.data) {
      setError(response.error || 'Unable to sign in')
      return
    }
    localStorage.setItem('royal-admin-token', response.data.token)
    navigate('/admin', { replace: true })
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-5 py-12">
      <form onSubmit={submit} className="w-full max-w-md bg-white border border-gray-200 shadow-card p-8 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest2 text-gold-600 mb-2">La Colongette Antsirabe</p>
          <h1 className="font-serif text-3xl text-charcoal">Administration</h1>
        </div>
        <label className="block text-sm text-gray-700">
          E-mail
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-gray-300 px-3 py-2.5 outline-none focus:border-gold-500"
          />
        </label>
        <label className="block text-sm text-gray-700">
          Mot de passe
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-gray-300 px-3 py-2.5 pr-10 outline-none focus:border-gold-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-charcoal"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={sending} className="btn-gold w-full disabled:opacity-60">
          {sending ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </main>
  )
}
