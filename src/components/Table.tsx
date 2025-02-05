import { UserT } from "@/lib/types"

type SubjectT = { id: number, subject: string }

const Table = ({ renderRow, data, schedule }:
  {
    renderRow: (item: UserT) => React.ReactNode,
    data: SubjectT[] | UserT[],
    schedule?: string
  }
) => {
  
  const columns = [
    schedule !== '1' ? { header: 'Info', accessor: 'info' } : {header: 'Day', accessor: 'day'} ,
    { header: 'Teacher ID', accessor: 'teacherid', className: 'hidden md:table-cell' },
    { header: 'Sabjects', accessor: 'sabjects', className: 'hidden md:table-cell' },
    { header: 'Classes', accessor: 'classes', className: 'hidden md:table-cell' },
    schedule !== '1' ? { header: 'Fhone', accessor: 'phone', className: 'hidden md:table-cell'} : {header: 'Start time', accessor: 'start time', className: 'hidden md:table-cell'},
    schedule !== '1' ? { header: 'Address', accessor: 'address', className: 'hidden md:table-cell' } : {header: 'End time', accessor: 'end time', className: 'hidden md:table-cell'},
    { header: 'Actions', accessor: 'actions', },
  ]

  return (
    <table className='w-full' >
      <thead>
        <tr className='bg-slate-100 h-10 text-left text-gray-500 text-sm '>
          {columns.map(col =>
            <th key={col.header} className={col.className}>
              {col.header}
            </th>)}
        </tr>
      </thead>
      <tbody>
        {data?.map((item: any) => renderRow(item))}
      </tbody>
    </table>
  )
}

export default Table;