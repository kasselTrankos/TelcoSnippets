script = {
	          'type': 'ExpressionStatement',
	          'expression': {
	            'left': {
	              'property': {
	                'name': 'closeSpinner',
	                'type': 'Identifier'
	              },
	              'computed': "False",
	              'object': {
	                'name': '$scope',
	                'type': 'Identifier'
	              },
	              'type': 'MemberExpression'
	            },
	            'right': {
	              'id': "None",
	              'defaults': [

	              ],
	              'params': [

	              ],
	              'expression': "False",
	              'type': 'FunctionExpression',
	              'generator': "False",
	              'body': {
	                'type': 'BlockStatement',
	                'body': [
	                  {
	                    'type': 'ExpressionStatement',
	                    'expression': {
	                      'arguments': [
	                        {
	                          'prefix': "True",
	                          'argument': {
	                            'raw': "None",
	                            'value': 1.0,
	                            'type': 'Literal'
	                          },
	                          'operator': '-',
	                          'type': 'UnaryExpression'
	                        },
	                        {
	                          'raw': "None",
	                          'value': 1.0,
	                          'type': 'Literal'
	                        }
	                      ],
	                      'callee': {
	                        'property': {
	                          'name': 'splice',
	                          'type': 'Identifier'
	                        },
	                        'computed': "False",
	                        'object': {
	                          'property': {
	                            'name': 'spinners',
	                            'type': 'Identifier'
	                          },
	                          'computed': "False",
	                          'object': {
	                            'name': '$scope',
	                            'type': 'Identifier'
	                          },
	                          'type': 'MemberExpression'
	                        },
	                        'type': 'MemberExpression'
	                      },
	                      'type': 'CallExpression'
	                    }
	                  },
	                  {
	                    'test': {
	                      'left': {
	                        'property': {
	                          'name': 'length',
	                          'type': 'Identifier'
	                        },
	                        'computed': "False",
	                        'object': {
	                          'property': {
	                            'name': 'spinners',
	                            'type': 'Identifier'
	                          },
	                          'computed': "False",
	                          'object': {
	                            'name': '$scope',
	                            'type': 'Identifier'
	                          },
	                          'type': 'MemberExpression'
	                        },
	                        'type': 'MemberExpression'
	                      },
	                      'right': {
	                        'raw': "None",
	                        'value': 0.0,
	                        'type': 'Literal'
	                      },
	                      'operator': '===',
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
	                              'property': {
	                                'name': 'CloseSpinner',
	                                'type': 'Identifier'
	                              },
	                              'computed': "False",
	                              'object': {
	                                'name': 'PopupService',
	                                'type': 'Identifier'
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
	                              'property': {
	                                'name': 'isOpenSpinner',
	                                'type': 'Identifier'
	                              },
	                              'computed': "False",
	                              'object': {
	                                'name': '$scope',
	                                'type': 'Identifier'
	                              },
	                              'type': 'MemberExpression'
	                            },
	                            'right': {
	                              'raw': "None",
	                              'value': "False",
	                              'type': 'Literal'
	                            },
	                            'operator': '=',
	                            'type': 'AssignmentExpression'
	                          }
	                        }
	                      ]
	                    },
	                    'alternate': "None",
	                    'type': 'IfStatement'
	                  }
	                ]
	              }
	            },
	            'operator': '=',
	            'type': 'AssignmentExpression'
	          }
	        }