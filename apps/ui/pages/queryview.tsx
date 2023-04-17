// QueryView.tsx
import React, { useState } from 'react'

interface QueryViewProps {
  onSubmit: (fromDoaId: string, toDoaId: string) => void
  result: string
}

const QueryView: React.FC<QueryViewProps> = ({ onSubmit, result }) => {
  const [fromDoaId, setFromDoaId] = useState('')
  const [toDoaId, setToDoaId] = useState('')

  const handleSubmit = () => {
    onSubmit(fromDoaId, toDoaId)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        value={fromDoaId}
        onChange={(e) => setFromDoaId(e.target.value)}
        placeholder="起始DOA ID"
      />
      <input
        type="text"
        value={toDoaId}
        onChange={(e) => setToDoaId(e.target.value)}
        placeholder="目标DOA ID"
      />
      <button onClick={handleSubmit}>查询</button>
      {result && <div>查询结果: {result}</div>}
    </div>
  )
}

export default QueryView
