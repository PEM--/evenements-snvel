let reactKey = 0;

const Table = ({header, items, footer}) => (
  <table>
    {
      header ? (
        <thead>
          <tr>
            {header.map(h => <th key={reactKey++}>{h}</th>)}
          </tr>
        </thead>
      ) : ''
    }
    <tbody>
      {
        items.map((line) => (
          <tr key={reactKey++}>
            {
              line.map(col => (
                <td key={reactKey++}>
                  <div>{col}</div>
                </td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
    {
      footer ? (
        <tfoot>
          <tr>
            {footer.map(f => <td key={reactKey++}>{f}</td>)}
          </tr>
        </tfoot>
      ) : ''
    }
  </table>
);

MainApp.Views.Table = Table;
