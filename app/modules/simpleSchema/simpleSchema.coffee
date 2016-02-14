addSimpleSchemaMessages = ->
  SimpleSchema.messages {
    csoNumberError: 'Votre n° ordinal n\'est pas valide'
    passwordNotConfirmMatch: 'Votre confirmation ne correspond pas'
  }
# Add new message when translations are loaded
Meteor.startup ->
  addSimpleSchemaMessages()
