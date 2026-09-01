const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://statsai-back-end.onrender.com/api'

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `API request failed (${response.status}): ${errorText}`
    )
  }

  return response.json()
}
