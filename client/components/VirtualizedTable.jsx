import React from "react"
import { AutoSizer, Table, Column } from "react-virtualized"

const rowRenderer = ({ id, image, name, level, classname, race }) => {
  return (
    <tr key={id}>
      <td>
        <img src={image} title={"Super accurate portrait of " + name} />
      </td>
      <td>{name}</td>
      <td>{race}</td>
      <td>{classname}</td>
      <td className={"number"}>{level}</td>
    </tr>
  )
}

const VirtualizedCharacterTable = ({ characters }) => (
  <AutoSizer disableHeight>
    {({ width }) => (
      <Table
        ref="List"
        className={"virtualized"}
        height={550}
        headerClassName={"header"}
        rowClassName={"row"}
        headerHeight={52}
        overscanRowCount={0}
        noRowsRenderer={() => <div />}
        rowCount={characters.length}
        rowHeight={50}
        rowGetter={props => {
          return characters[props.index]
        }}
        width={width}
      >
        <Column
          cellClassName={"cell"}
          dataKey="name"
          label="Name"
          width={width * 0.4}
          cellRenderer={({ rowData }) => {
            return (
              <React.Fragment>
                <img src={rowData.image} title={"Image of " + rowData.name} />
                {rowData.name}
              </React.Fragment>
            )
          }}
        />
        <Column
          cellClassName={"cell"}
          dataKey="classname"
          label={"Class"}
          width={width * 0.2}
        />
        <Column
          cellClassName={"cell"}
          dataKey="race"
          label={"Race"}
          width={width * 0.2}
        />
        <Column
          cellClassName={"cell"}
          dataKey="level"
          label={"Level"}
          width={width * 0.2}
        />
      </Table>
    )}
  </AutoSizer>
)

export default VirtualizedCharacterTable
