script = {
          'type': 'ExpressionStatement',
          'expression': {
            'left': {
              'computed': "False",
              'object': {
                'name': '$scope',
                'type': 'Identifier'
              },
              'type': 'MemberExpression',
              'property': {
                'name': 'openSpinner',
                'type': 'Identifier'
              }
            },
            'operator': '=',
            'type': 'AssignmentExpression',
            'right': {
              'defaults': [

              ],
              'generator': "False",
              'type': 'FunctionExpression',
              'body': {
                'type': 'BlockStatement',
                'body': [
                  {
                    'type': 'ExpressionStatement',
                    'expression': {
                      'arguments': [
                        {
                          'value': 1.0,
                          'raw': '1',
                          'type': 'Literal'
                        }
                      ],
                      'callee': {
                        'computed': "False",
                        'object': {
                          'computed': "False",
                          'object': {
                            'name': '$scope',
                            'type': 'Identifier'
                          },
                          'type': 'MemberExpression',
                          'property': {
                            'name': 'spinners',
                            'type': 'Identifier'
                          }
                        },
                        'type': 'MemberExpression',
                        'property': {
                          'name': 'push',
                          'type': 'Identifier'
                        }
                      },
                      'type': 'CallExpression'
                    }
                  },
                  {
                    'consequent': {
                      'type': 'BlockStatement',
                      'body': [
                        {
                          'type': 'ExpressionStatement',
                          'expression': {
                            'left': {
                              'computed': "False",
                              'object': {
                                'name': '$scope',
                                'type': 'Identifier'
                              },
                              'type': 'MemberExpression',
                              'property': {
                                'name': 'isOpenSpinner',
                                'type': 'Identifier'
                              }
                            },
                            'operator': '=',
                            'type': 'AssignmentExpression',
                            'right': {
                              'name': '"True"',
                              'type': 'Identifier'
                            }
                          }
                        },
                        {
                          'type': 'ExpressionStatement',
                          'expression': {
                            'arguments': [
                              {
                                'name': '$scope',
                                'type': 'Identifier'
                              }
                            ],
                            'callee': {
                              'computed': "False",
                              'object': {
                                'name': 'PopupService',
                                'type': 'Identifier'
                              },
                              'type': 'MemberExpression',
                              'property': {
                                'name': 'getSpinner',
                                'type': 'Identifier'
                              }
                            },
                            'type': 'CallExpression'
                          }
                        }
                      ]
                    },
                    'alternate': "None",
                    'type': 'IfStatement',
                    'test': {
                      'prefix': "True",
                      'operator': '!',
                      'type': 'UnaryExpression',
                      'argument': {
                        'computed': "False",
                        'object': {
                          'name': '$scope',
                          'type': 'Identifier'
                        },
                        'type': 'MemberExpression',
                        'property': {
                          'name': 'isOpenSpinner',
                          'type': 'Identifier'
                        }
                      }
                    }
                  }
                ]
              },
              'id': "None",
              'params': [

              ],
              'expression': "False"
            }
          }
        }