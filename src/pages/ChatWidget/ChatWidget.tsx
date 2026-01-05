import type { ChatWidgetProps } from '../../interfaces'

export default function ChatWidget ({ settings }: ChatWidgetProps) {
  return (
    <>
      <div>{settings.headerTitle}</div>
      <div>ChatWidget Content</div>
    </>
  )
}
