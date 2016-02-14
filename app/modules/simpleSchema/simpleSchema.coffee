addSimpleSchemaMessages = ->
  SimpleSchema.messages {
    csoNumberError: 'Votre n° ordinal n\'est pas valide'
  }
# Add new message when translations are loaded
Meteor.startup ->
  addSimpleSchemaMessages()
