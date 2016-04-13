import React from 'react';

let reactKey = 0;

const TableHeader = ({header}) => (
  <thead>
    <tr>
      {header.map(h => <th key={reactKey++}>{h}</th>)}
    </tr>
  </thead>
);

const TableFooter = ({footer}) => (
  <tfoot>
    <tr>
      {footer.map(f => <td key={reactKey++}>{f}</td>)}
    </tr>
  </tfoot>
);

const TableLine = ({col}) => (<td key={reactKey++}>{col}</td>);

const Table = ({header, items, footer}) => (
  <table>
    { header ? <TableHeader header={header} /> : '' }
    <tbody>
      {
        items.map((line) => (
          <tr key={reactKey++}>
            {
              line.map(col => <TableLine key={reactKey++} col={col} />)
            }
          </tr>
        ))
      }
    </tbody>
    { footer ? <TableFooter footer={footer} /> : '' }
  </table>
);

MainApp.Views.Table = Table;
