const { Utils, Schema, Col } = MainApp;

if (Meteor.isServer) {
  const pricesUpdate = () => {
    console.log('Importing prices...');
    const pricesSheetName = 'Evènements SNVEL - Tarifs et droits';
    let sheetId = 1;
    let pricesSheet = true;
    const userTypes = Col.UserTypes.find({}, {fields: {title: 1}}).fetch();
    do {
      pricesSheet = Utils.importSpreadSheet(pricesSheetName, sheetId++);
      if (pricesSheet) {
        console.log('Processing prices for', pricesSheet.info.worksheetTitle);
        let program = Col.Programs.findOne(
          {reference: pricesSheet.info.worksheetTitle}
        );
        if (!program) {
          console.warn('Unknown program');
          continue;
        }
        const prices = Object.keys(pricesSheet.rows)
          .filter((rKey, rIdx) => rIdx !== 0)
          .reduce((acc, rKey) => {
            const rPrice = pricesSheet.rows[rKey];
            const price = {
              description: s(rPrice[1]).trim().value(),
              code: s(rPrice[2]).trim().value(),
              inEvents: rPrice[3] && rPrice[3].trim().toLowerCase() === 'x',
              triggerAttendant: rPrice[4] && rPrice[4].trim().toLowerCase() === 'x',
              byType: []
            };
            userTypes.forEach((type, idx) => {
              price.byType.push({
                category: type.title,
                amount: Number(s(rPrice[5 + idx]).trim().value())
              });
            });
            acc.push(price);
            return acc;
          }, []);
        program.priceRights = prices;
        const programId = String(program._id);
        delete program._id;
        Col.Programs.update(programId, program, {bypassCollection2: true});
      }
    } while (pricesSheet);
  };

  const discountsUpdate = () => {
    console.log('Importing dicounts...');
    const discountSheetName = 'Evènements SNVEL - Remises';
    let sheetId = 1;
    let discountSheet = true;
    const userTypes = Col.UserTypes.find({}, {fields: {title: 1}}).fetch();
    do {
      discountSheet = Utils.importSpreadSheet(discountSheetName, sheetId++);
      if (discountSheet) {
        console.log('Processing discount for', discountSheet.info.worksheetTitle);
        let program = Col.Programs.findOne(
          {reference: discountSheet.info.worksheetTitle}
        );
        if (!program) {
          console.warn('Unknown program');
          continue;
        }
        const discounts = Object.keys(discountSheet.rows)
          .filter((rKey, rIdx) => rIdx !== 0)
          .reduce((acc, rKey) => {
            const rDiscount = discountSheet.rows[rKey];
            const discount = {
              code: s(rDiscount[1]).trim().value(),
              byType: []
            };
            userTypes.forEach((type, idx) => {
              discount.byType.push({
                category: type.title,
                amount: numeral().unformat(s(rDiscount[2 + idx]).trim().value())
              });
            });
            acc.push(discount);
            return acc;
          }, []);
        program.discounts = discounts;
        const programId = String(program._id);
        delete program._id;
        Col.Programs.update(programId, program, {bypassCollection2: true});
      }
    } while (discountSheet);
  };

  const specialRulesUpdate = () => {
    console.log('Importing special rules...');
    const ruleSheetName = 'Evènements SNVEL - Règles spéciales';
    let sheetId = 1;
    let ruleSheet = true;
    const userTypes = Col.UserTypes.find({}, {fields: {title: 1}}).fetch();
    do {
      ruleSheet = Utils.importSpreadSheet(ruleSheetName, sheetId++);
      if (ruleSheet) {
        console.log('Processing discount for', ruleSheet.info.worksheetTitle);
        let program = Col.Programs.findOne(
          {reference: ruleSheet.info.worksheetTitle}
        );
        if (!program) {
          console.warn('Unknown program');
          continue;
        }
        const availablePrices = program.priceRights.map(p => p.code);
        const rules = Object.keys(ruleSheet.rows)
          .filter((rKey, rIdx) => rIdx !== 0)
          .reduce((acc, rKey) => {
            const rRule = ruleSheet.rows[rKey];
            const rule = {
              name: s(rRule[1]).trim().value(),
              description: s(rRule[2]).trim().value(),
              categories: [],
              applicationDate: null,
              amount: numeral().unformat(s(rRule[5]).trim().value()),
              requiredSales: [],
              onPrices: []
            };
            const categoriesSheet = s(rRule[3]).trim().value();
            const categories = categoriesSheet === '*' ?
              userTypes.map(u => u.title) :
              categoriesSheet.split(';');
            rule.categories = categories;
            const applicationDateSheet = s(rRule[4]).trim().value();
            const applicationDate = applicationDateSheet === '*' ?
              new Date(0, 0, 0) :
              moment(applicationDateSheet, 'DD/MM/YYYY').toDate();
            rule.applicationDate = applicationDateSheet;
            const requiredSalesSheet = s(rRule[6]).trim().value();
            const requiredSales = requiredSalesSheet === '*' ?
              availablePrices :
              requiredSalesSheet === 'null' ?
                [] :
                requiredSalesSheet.split(';');
            rule.requiredSales = requiredSales;
            const onPricesSheet = s(rRule[7]).trim().value();
            const onPrices = onPricesSheet === '*' ?
              availablePrices :
              onPricesSheet.split(';');
            rule.onPrices = onPrices;
            acc.push(rule);
            return acc;
          }, []);
        program.specialRules = rules;
        const programId = String(program._id);
        delete program._id;
        Col.Programs.update(programId, program, {bypassCollection2: true});
      }
    } while (ruleSheet);
  };

  programsUpdate = () => {
    console.log('Importing programs...');
    const programsSheetName = 'Evènements SNVEL - Programmes';
    const programsSheet = Utils.importSpreadSheet(programsSheetName);
    const programs = Object.keys(programsSheet.rows)
      .filter((pKey, pIdx) => pIdx !== 0)
      .map((pKey, pIdx) => {
        const eventsSheet = Utils.importSpreadSheet(programsSheetName, 2 + pIdx);
        const events = Object.keys(eventsSheet.rows)
          .filter((rKey, rIdx) => rIdx !== 0)
          .reduce((acc, rKey, rIdx) => {
            const rEvent = eventsSheet.rows[rKey];
            const eventTitle = s(rEvent[1]).trim().value();
            let foundEvent = acc.find(c => c.title === eventTitle);
            if (!foundEvent) {
              acc.push({ title: eventTitle, sessions: [] });
              foundEvent = acc[acc.length - 1];
            }
            const sessionTitle = rEvent[2] ? s(rEvent[2]).trim().value() : '';
            let foundSession = foundEvent.sessions.find(s => s.title === sessionTitle);
            if (!foundSession) {
              foundEvent.sessions.push({ title: sessionTitle, conferences: [] });
              foundSession = foundEvent.sessions[foundEvent.sessions.length - 1];
            }
            foundSession.conferences.push({
              title: rEvent[3] ? s(rEvent[3]).trim().value() : '',
              begin: s(rEvent[4]).trim().value(),
              end: s(rEvent[5]).trim().value(),
              moderator: rEvent[6] ? s(rEvent[6]).trim().value() : '',
              speaker: rEvent[7] ? s(rEvent[7]).trim().value() : '',
              description: rEvent[8] ? s(rEvent[8]).trim().value() : '',
              code: s(rEvent[9]).trim().value()
            });
            return acc;
          }, []);
        const rProgram = programsSheet.rows[pKey];
        const reference = s(rProgram[1]).toLowerCase().trim().value();
        const presentation = Utils.getDriveFile(`${reference}.md`);
        let program = {
          reference,
          title: s(rProgram[2]).trim().value(),
          location: s(rProgram[3]).trim().value(),
          period: s(rProgram[4]).trim().value(),
          description: s(rProgram[5]).trim().value(),
          begin: moment(s(rProgram[6]).trim().value(), 'DD/MM/YYYY').toDate(),
          end: moment(s(rProgram[7]).trim().value(), 'DD/MM/YYYY').toDate(),
          lattitude: String(rProgram[8]),
          longitude: String(rProgram[9]),
          zoom: String(rProgram[10]),
          tva: numeral().unformat(rProgram[11].trim()),
          events,
          presentation
        };
        console.log('Insert program from line', pIdx, 'and reference', program.reference);
        Col.Programs.insert(program, {bypassCollection2: true});
      });
    pricesUpdate();
    discountsUpdate();
    specialRulesUpdate();
  };
}

initPrograms = () => {
  const Programs = new Mongo.Collection('programs');
  const ConferencesSchema = new SimpleSchema({
    title: {type: String, label: 'Conférences', min: 0, max: 64},
    begin: {type: String, label: 'Début'},
    end: {type: String, label: 'Fin'},
    moderator: {type: String, label: 'Modérateur(s)', min: 0, max: 512},
    speaker: {type: String, label: 'Intervenants(s)', min: 0, max: 512},
    description: {type: String, label: 'Description', min: 0, max: 512},
    code: {type: String, label: 'Codification', min: 1, max: 64}
  });
  const SessionsSchema = new SimpleSchema({
    title: {type: String, label: 'Session', min: 2, max: 64},
    conference: {type: [ConferencesSchema], label: 'Conférences', minCount: 1, max: 512}
  });
  const EventsSchema = new SimpleSchema({
    title: {type: String, label: 'Type programme', min: 2, max: 64},
    session: {type: [SessionsSchema], label: 'Sessions', optional: true, minCount: 0, max: 512}
  });
  const ValueForType = new SimpleSchema({
    category: {type: String, label: 'Catégorie', min: 2, max: 64},
    amount: {type: Number, label: 'Montant'}
  });
  const PriceRightSchema = new SimpleSchema({
    description: {type: String, label: 'Description', min: 0, max: 512},
    inEvents: {type: Boolean, label: 'Contenu dans événements', defaultValue: false},
    triggerAttendant: {type: Boolean, label: 'Propose accompagnant', defaultValue: false},
    code: {type: String, label: 'Codification', min: 1, max: 64},
    byType: {type: [ValueForType], label: 'Montant par population', defaultValue: [], min: 0, max: 64},
  });
  const DiscountSchema = new SimpleSchema({
    code: {type: String, label: 'Codification', min: 0, max: 64},
    byType: {type: [ValueForType], label: 'Montant par population', defaultValue: [], min: 0, max: 64}
  });
  const SpecialRuleSchema = new SimpleSchema({
    name: { type: String, label: 'Nom', allowedValues: ['increaseAfter', 'specialOffer']},
    description: { type: String, label: 'Description', min: 0, max: 512},
    categories: { type: [String], label: 'Catégories', minCount: 0, maxCount: 64},
    applicationDate: { type: Date, label: 'Date d\'application'},
    amount: {type: Number, label: 'Montant', min: 0},
    requiredSales: {type: [String], label: 'Achats requis', minCount: 0, maxCount: 128},
    onPrices: {type: [String], label: 'Prix modifiés', minCount: 0, maxCount: 128}
  });
  const ProgramsSchema = new SimpleSchema({
    reference: {type: String, label: 'Référence', index: true, unique: true, min: 2, max: 16},
    title: {type: String, label: 'Titre', min: 2, max: 32},
    location: {type: String, label: 'Lieu', min: 2, max: 32},
    period: {type: String, label: 'Période (date)', min: 2, max: 32},
    description: {type: String, label: 'Description', optional: true, min: 0, max: 2048},
    begin: {type: Date, index: true, label: 'Début'},
    end: {type: Date, index: true, label: 'Fin'},
    lattitude: {type: String, label: 'Lattitude', min: 2, max: 16},
    longitude: {type: String, label: 'Longitude', min: 2, max: 16},
    zoom: {type: String, label: 'Zoom', min: 1, max: 2, allowedValues: (() => {
      let count = 2, res = [];
      while (count++ < 21) {
        res.push(String(count));
      }
      return res;
    })()},
    tva: {type: Number, label: 'TVA', decimal: true, defaultValue: 20.6},
    presentation: {type: String, label: 'Présentation', min: 0, max: 16384},
    events: {type: [EventsSchema], label: 'Evènements', minCount: 1, maxCount: 512},
    priceRights: {type: [PriceRightSchema], label: 'Table des prix', min: 0, max: 128, defaultValue: []},
    discounts: {type: [DiscountSchema], label: 'Table des remises', min: 0, max: 128, defaultValue: []},
    specialRules: {type: [SpecialRuleSchema], label: 'Table des règles speciales', min: 0, max: 128, defaultValue: []}
  });
  Programs.attachSchema(ProgramsSchema);
  Schema.ProgramsSchema = ProgramsSchema;
  Schema.EventsSchema = EventsSchema;
  Schema.ConferencesSchema = ConferencesSchema;
  Schema.SessionsSchema = SessionsSchema;
  Schema.EventsSchema = EventsSchema;
  Schema.ValueForType = ValueForType;
  Schema.DiscountSchema = DiscountSchema;
  Schema.PriceRightSchema = PriceRightSchema;
  Schema.SpecialRuleSchema = SpecialRuleSchema;
  Col.Programs = Programs;
  // Fill collection with default if necessary
  if (Meteor.isServer) {
    if (Programs.find().count() === 0) {
      programsUpdate();
    }
    // Publish
    Meteor.publish('programs.all', function() {
      return Programs.find();
    });
  }
  Object.assign(Programs, {
    priceForCode(prg, userType, code) {
      const price = prg.priceRights.find(p => p.code === code);
      if (!price) { return 0; }
      const priceForType = price.byType.find(t => t.category === userType);
      if (!priceForType) { return 0; }
      return priceForType.amount;
    },
    vatPriceForCode(prg, userType, code) {
      return Programs.priceForCode(prg, userType, code) * (1 + prg.tva);
    },
    discountForCode(prg, userType, code) {
      const discount = prg.discounts.find(p => p.code === code);
      if (!discount) { return 0; }
      const discountForType = discount.byType.find(t => t.category === userType);
      if (!discountForType) { return 0; }
      return discountForType.amount;
    },
    discountedPriceForCode(prg, userType, code) {
      return Programs.priceForCode(prg, userType, code) *
        (1 - Programs.discountForCode(prg, userType, code));
    },
    discountedVatPriceForCode(prg, userType, code) {
      return Programs.vatPriceForCode(prg, userType, code) *
        (1 - Programs.discountForCode(prg, userType, code));
    },
    finalPrice(prg, userType, codes, now, vatIncluded = true) {
      let total = 0;
      const applicableRules = prg.specialRules.filter(r => {
        if (r.categories.indexOf(userType) === -1) { return false; }
        if (r.applicationDate !== '*') {
          const start = moment(r.applicationDate, 'DD/MM/YYYY');
          if (now.isBefore(start)) { return false; }
        }
        if (r.requiredSales.length > 0) {
          const allSalesFound = r.requiredSales.reduce((acc, s) => {
            if (!acc) {
              acc = codes.indexOf(s) !== -1;
            }
            return acc;
          }, true);
          if (!allSalesFound) { return false; }
        }
        return true;
      });
      return codes.reduce((acc, c) => {
        const totalFct = vatIncluded ? Col.Programs.discountedVatPriceForCode : discountedPriceForCode;
        let amount = totalFct(prg, userType, c);
        applicableRules.forEach(r => {
          if (r.onPrices.indexOf(c) !== -1) {
            switch (r.name) {
            case 'increaseAfter':
              amount = amount * (1 + r.amount);
              break;
            case 'specialOffer':
              amount = amount * (1 - r.amount);
              break;
            default: break;
            }
          }
        });
        acc += amount;
        return acc;
      }, 0);
    },
    proposeAttendant(prg, codes) {
      let propose = false;
      codes.forEach(c => {
        const price = prg.priceRights.find(p => p.code === c);
        if (price.triggerAttendant) {
          propose = true;
        }
      });
      return propose;
    }
  });
  // Methods
  Meteor.methods({
    'programs.update': function() {
      if (!this.userId) { throw new Meteor.Error('unauthorized'); }
      const user = Meteor.users.findOne(this.userId);
      if (!user || !user.isAdmin()) { throw new Meteor.Error('unauthorized'); }
      if (Meteor.isServer) {
        Col.adminJobs.processJobs('programs.update', function(job) {
          Col.Programs.remove({});
          programsUpdate();
          job.done();
        });
        const j = new Job(Col.adminJobs, 'programs.update', {});
        return j.save();
      }
    }
  });
  console.log('Programs filled and exposed');
};
