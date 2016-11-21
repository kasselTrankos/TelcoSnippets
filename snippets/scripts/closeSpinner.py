script= {
                                'type': 'ExpressionStatement',
                                'expression': {
                                  'left': {
                                    'computed': "false",
                                    'property': {
                                      'type': 'Identifier',
                                      'name': 'closeSpinner'
                                    },
                                    'object': {
                                      'type': 'Identifier',
                                      'name': '$scope'
                                    },
                                    'type': 'MemberExpression'
                                  },
                                  'operator': '=',
                                  'right': {
                                    'generator': "false",
                                    'type': 'FunctionExpression',
                                    'id': "none",
                                    'defaults': [

                                    ],
                                    'rest': "none",
                                    'expression': "false",
                                    'params': [

                                    ],
                                    'body': {
                                      'type': 'BlockStatement',
                                      'body': [
                                        {
                                          'type': 'ExpressionStatement',
                                          'expression': {
                                            'arguments': [
                                              {
                                                'prefix': "true",
                                                'operator': '-',
                                                'argument': {
                                                  'raw': '1',
                                                  'type': 'Literal',
                                                  'value': 1.0
                                                },
                                                'type': 'UnaryExpression'
                                              },
                                              {
                                                'raw': '1',
                                                'type': 'Literal',
                                                'value': 1.0
                                              }
                                            ],
                                            'callee': {
                                              'computed': "false",
                                              'property': {
                                                'type': 'Identifier',
                                                'name': 'splice'
                                              },
                                              'object': {
                                                'computed': "false",
                                                'property': {
                                                  'type': 'Identifier',
                                                  'name': 'spinners'
                                                },
                                                'object': {
                                                  'type': 'Identifier',
                                                  'name': '$scope'
                                                },
                                                'type': 'MemberExpression'
                                              },
                                              'type': 'MemberExpression'
                                            },
                                            'type': 'CallExpression'
                                          }
                                        },
                                        {
                                          'alternate': "none",
                                          'test': {
                                            'left': {
                                              'computed': "false",
                                              'property': {
                                                'type': 'Identifier',
                                                'name': 'length'
                                              },
                                              'object': {
                                                'computed': "false",
                                                'property': {
                                                  'type': 'Identifier',
                                                  'name': 'spinners'
                                                },
                                                'object': {
                                                  'type': 'Identifier',
                                                  'name': '$scope'
                                                },
                                                'type': 'MemberExpression'
                                              },
                                              'type': 'MemberExpression'
                                            },
                                            'operator': '===',
                                            'right': {
                                              'raw': '0',
                                              'type': 'Literal',
                                              'value': 0.0
                                            },
                                            'type': 'BinaryExpression'
                                          },
                                          'consequent': {
                                            'type': 'BlockStatement',
                                            'body': [
                                              {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                  'arguments': [

                                                  ],
                                                  'callee': {
                                                    'computed': "false",
                                                    'property': {
                                                      'type': 'Identifier',
                                                      'name': 'CloseSpinner'
                                                    },
                                                    'object': {
                                                      'type': 'Identifier',
                                                      'name': 'PopupService'
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  'type': 'CallExpression'
                                                }
                                              },
                                              {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                  'left': {
                                                    'computed': "false",
                                                    'property': {
                                                      'type': 'Identifier',
                                                      'name': 'isOpenSpinner'
                                                    },
                                                    'object': {
                                                      'type': 'Identifier',
                                                      'name': '$scope'
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  'operator': '=',
                                                  'right': {
                                                    'raw': '"false"',
                                                    'type': 'Literal',
                                                    'value': "false"
                                                  },
                                                  'type': 'AssignmentExpression'
                                                }
                                              }
                                            ]
                                          },
                                          'type': 'IfStatement'
                                        }
                                      ]
                                    }
                                  },
                                  'type': 'AssignmentExpression'
                                }
                              }