if Meteor.isClient
  TAPi18n.setLanguage 'fr'

SimpleSchema.extendOptions
  view: Match.Optional Object
  require: Match.Optional String

MainApp.Schema.MESSAGES =
  csoNumberError: 'Votre n° ordinal n\'est pas valide'
  csoNumberNoMatch: 'Ce n° ordinal nous est inconnu'
  csoNumberNameMismatch: 'Ce n° ordinal ne correspond pas à votre nom'
  csoNumberExpired: 'Votre cotisation n\'est plus valide'
  passwordNotConfirmMatch: 'Votre confirmation ne correspond pas'

addSimpleSchemaMessages = ->
  SimpleSchema.messages MainApp.Schema.MESSAGES
# Add new message when translations are loaded
Meteor.startup ->
  addSimpleSchemaMessages()
