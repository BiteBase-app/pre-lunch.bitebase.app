'use client'

import { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'

export function ErrorFallback() {
  const error = useRouteError()
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-semibold text-red-800">Oops! Something went wrong</h2>
      <p className="mt-2 text-red-700">
        {(error as Error)?.message || 'Failed to load customer data'}
      </p>
    </div>
  )
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return children
}