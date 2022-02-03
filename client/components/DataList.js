import { useTable, useSortBy, usePagination } from 'react-table'
import styled from 'styled-components'
import { IoCaretDown, IoCaretUp, IoChevronBack, IoChevronForward } from 'react-icons/io5'
import ReactPaginate from 'react-paginate'

const PaginationWrapper = styled('div')`
  & > ul > li > a {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* color: ${({ theme }) => theme.colors['grey']}; */
  }
  & > ul > li.selected > a {
    font-weight: 800;
    /* color: ${({ theme }) => theme.colors['crimson']}; */
  }
`

const PaginationArrowButton = styled('button')`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  :disabled {
    opacity: 50%;
  }
`

const Table = styled('table')`
  border: solid 1px #eaeaea;
`

const StyledTableHeaderRow = styled('tr')`
  box-sizing: border-box;
  border: solid 1px #eaeaea;
`

const TableRow = styled('tr')`
  cursor: pointer;
  border-bottom: solid 1px #eaeaea;
`

const SortIndicator = (props) => {
  const { isSorted, isSortedDesc } = props.column

  const isAsc = isSorted && !isSortedDesc
  const isDesc = isSorted && isSortedDesc

  return (
    <div className="p-1">
      <IoCaretUp
        style={{
          fontSize: 12,
          color: 'black',
          marginTop: 2,
          opacity: isAsc ? 1 : 0.2,
        }}
      />
      <IoCaretDown
        style={{
          fontSize: 12,
          color: 'black',
          marginTop: -5,
          opacity: isDesc ? 1 : 0.2,
        }}
      />
    </div>
  )
}

const DataList = (props) => {
  const {
    columns = [],
    data = [],
    onRowClick = null,
    pageSize = 10,
    emptyMessage = undefined,
  } = props

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    useSortBy,
    usePagination
  )
  const {
    state: { pageIndex },
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
  } = tableInstance

  return (
    <div>
      <Table cellSpacing="0" cellPadding="8px" width="100%" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <StyledTableHeaderRow
              key={`header-${headerIndex}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, colIndex) => (
                <th
                  key={`header-column-${colIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex items-center">
                    <div className="select-none whitespace-nowrap">{column.render('Header')}</div>
                    <SortIndicator column={column} />
                  </div>
                </th>
              ))}
            </StyledTableHeaderRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 && (
            <TableRow className="h-96">
              <td colSpan={columns.length} align="center">
                <span className="font-bold block">No Result Found</span>
                {!!emptyMessage && emptyMessage}
              </td>
            </TableRow>
          )}
          {page.map((row, rowIndex) => {
            prepareRow(row)
            return (
              <TableRow
                key={`row-index-${rowIndex}`}
                {...row.getRowProps()}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td key={`cell-${cellIndex}`} valign="top" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </TableRow>
            )
          })}
        </tbody>
      </Table>
      <div className="flex justify-center mt-6">
        <PaginationWrapper>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <PaginationArrowButton disabled={!canNextPage} onClick={() => nextPage()}>
                <IoChevronForward />
              </PaginationArrowButton>
            }
            onPageChange={({ selected }) => {
              gotoPage(selected)
            }}
            pageRangeDisplayed={3}
            pageCount={pageOptions.length}
            previousLabel={
              <PaginationArrowButton disabled={!canPreviousPage} onClick={() => previousPage()}>
                <IoChevronBack />
              </PaginationArrowButton>
            }
            renderOnZeroPageCount={null}
            className="flex gap-2"
          />
        </PaginationWrapper>
      </div>
    </div>
  )
}

export default DataList
