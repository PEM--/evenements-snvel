const {Utils, Col} = MainApp;

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

const getLabels = (codes, program) => {
  return codes.map(c => {
    const right = program.priceRights.find(r => c === r.code);
    return right.description;
  });
};

const calcInvoice = (user, program) => {
  const { title, location, period } = program;
  const userType = user.profile.category;
  const found = user.profile.programs.find(p => p.reference === program.reference);
  const labels = getLabels(found.prices, program);
  const boughtDate = moment(found.date, 'DD/MM/YYYY');
  const labelsAttendant = found.attendant ?
    this.getLabels(found.attendant.prices, program) : [];
  let total = Col.Programs.finalPrice(
    program, userType, found.prices, boughtDate, false
  );
  if (found.attendant) {
    total += Col.Programs.finalPrice(
      program, 'Accompagnant', found.attendant.prices, boughtDate, false
    );
  }
  return Utils.renderInvoice(
    labels, labelsAttendant, total, total * (1 + program.tva)
  );
};

Utils.calcInvoice = calcInvoice;
