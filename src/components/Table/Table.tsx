import { ReactNode } from 'react'
import style from '../Workflow/styles.module.scss'
import TableColumn from './TableColumn'

interface TableProps {
  columnOrder: string[]
  children: ReactNode
}

export default function Table({ columnOrder, children }: TableProps) {
  return (
    <table className={style.table} id='tableWorkflow'>
      <thead className={style.titleTable}>
        <tr>
          <th className={style.titleTableCell}></th>

          <TableColumn columnOrder={columnOrder} />
        </tr>
      </thead>
      <tbody className={style.tableBody}>{children}</tbody>
    </table>
  )
}
