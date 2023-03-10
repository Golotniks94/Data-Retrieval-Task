import React, { useCallback, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import Chart from './Chart.js'

const App = () => {
  const filterParams = useMemo(() => {
    return {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        let dateAsString = cellValue
        if (dateAsString == null) return -1
        let dateParts = dateAsString.split('/')
        let cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        )

        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1
        } else {
          return 0
        }
      },
    }
  }, [])

  const [visibleTable, setVisibleTable] = useState(true)
  const [visibleChart, setVisibleChart] = useState(false)
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()
  const [columnDefs] = useState([
    {
      field: 'countriesAndTerritories',
      rowGroup: true,
      hide: false,
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Date',
      field: 'dateRep',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    { field: 'cases', aggFunc: 'sum', headerName: 'Cases' },
    { field: 'deaths', aggFunc: 'sum', headerName: 'Deaths' },
  ])

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
      sortable: true,
    }
  }, [])
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    }
  }, [])

  const onGridReady = useCallback((params) => {
    fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json')
      .then((resp) => resp.json())
      .then((data) => params.api.setRowData(data.records))
  }, [])

  const tableHandler = () => {
    setVisibleTable(true)
    setVisibleChart(false)
  }

  const chartHandler = () => {
    setVisibleTable(false)
    setVisibleChart(true)
  }

  return (
    <>
      <div>
        <button onClick={tableHandler}>Table</button>
        <button onClick={chartHandler}>Chart</button>
      </div>
      {visibleTable && (
        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              animateRows={true}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={20}
            ></AgGridReact>
          </div>
        </div>
      )}
      {visibleChart && <Chart />}
    </>
  )
}

export default App
