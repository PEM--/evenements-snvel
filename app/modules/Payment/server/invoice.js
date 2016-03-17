const SIZE = 30;
const LEFT = 20;
const RIGHT = SIZE - LEFT;
const dashLine = s.repeat('-', SIZE) + '\n';
const doubleDashLine = s.repeat('=', SIZE) + '\n';

const truncateSmart = (text) => text.length <= LEFT ? text : s.truncate(text, LEFT - 3);

const renderLine = (designation, value) => {
  return s.rpad(truncateSmart(designation), LEFT, ' ') +
    s.lpad(numeralAmountFormat(value), RIGHT, ' ') + '\n';
};

const renderInvoice = (prices, discounts, totalHT, totalTTC) => {
  let lines = '';
  prices.forEach((line) => lines += renderLine(line.designation, line.value));
  if (discounts.length !== 0) {
    lines += dashLine +
      s.lrpad('Remises', SIZE, ' ') + '\n';
    discounts.forEach((line) => lines += renderLine(line.designation, -line.value));
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
