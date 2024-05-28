import style from '../Workflow/styles.module.scss'

interface TableColumnProps {
  columnOrder: string[]
}

export default function TableColumn({ columnOrder }: TableColumnProps) {
  return columnOrder.map((key, index) => (
    <th key={index} className={style.titleTableCell}>
      {key}
    </th>
  ))
}
