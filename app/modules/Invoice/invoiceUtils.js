const SIZE = 30;
const LEFT = 20;
const RIGHT = SIZE - LEFT;
const dashLine = s.repeat('-', SIZE) + '\n';
const doubleDashLine = s.repeat('=', SIZE) + '\n';

const truncateSmart = (text) => text.length <= SIZE ? text : s.truncate(text, SIZE - 3);

const renderLine = (designation) => {
  return s.rpad(truncateSmart(designation), SIZE, ' ') + '\n';
};

const renderInvoice = (userCodes, attendantCodes, totalHT, totalTTC) => {
  let lines = '';
  userCodes.forEach((line) => lines += renderLine(line));
  if (attendantCodes && attendantCodes.length !== 0) {
    lines += dashLine + renderLine('Accompagnant :');
    attendantCodes.forEach((line) => lines += renderLine(line));
  }
  return (
    s.lrpad('FACTURE', SIZE, ' ') + '\n' +
    dashLine +
    lines +
    dashLine +
    s.rpad('TOTAL (HT)', LEFT, ' ') + s.lpad(numeralAmountFormat(totalHT), RIGHT, ' ') + '\n' +
    doubleDashLine +
    s.rpad('TOTAL (TTC)', LEFT, ' ') + s.lpad(numeralAmountFormat(totalTTC), RIGHT, ' ')
  );
};

MainApp.Utils.renderInvoice = renderInvoice;
