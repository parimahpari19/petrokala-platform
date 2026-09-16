import React from 'react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: any) {
    // Log the error to the console (or send to a logging service)
    // eslint-disable-next-line no-console
    console.error('Uncaught error in UI:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-12">
          <h2 className="text-xl font-bold">خطا در نمایش صفحه</h2>
          <p className="text-gray-400">مشکلی داخلی رخ داد — لطفاً صفحه را دوباره بارگذاری کنید.</p>
        </div>
      )
    }

    return this.props.children as React.ReactElement
  }
}
