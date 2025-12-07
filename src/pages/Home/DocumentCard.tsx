import { useNavigate } from 'react-router-dom'
import { CodeIcon } from 'lucide-react'

import DocumentIcon from '@/components/ui/icons/Document'

interface DocumentCardProps {
  title: string
  documentType: 'text' | 'code'
  description: string
  roomId?: string
}

function DocumentCard(props: DocumentCardProps) {
  const { title, documentType, description, roomId } = props
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (roomId) {
      navigate(`/room/${roomId}`)
    }
  }

  return (
    <li
      className="rounded-xl bg-white px-6 py-8 shadow-lg"
      onClick={roomId ? handleNavigate : undefined}
      role={roomId ? 'button' : undefined}
      tabIndex={0}
    >
      <div className="flex items-center justify-start gap-2">
        {documentType === 'text' ? <DocumentIcon /> : <CodeIcon />}
        <h3 className="my-3 font-display font-medium">{title}</h3>
      </div>
      <p className="mt-1.5 text-sm leading-6 text-secondary-500 text-left">
        {description}
      </p>
    </li>
  )
}
export default DocumentCard
