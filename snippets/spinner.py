import os, re, sublime, os, json
import logging

class Spinner:
	controllers = []
	logger = logging.getLogger('myapp')
	def parse(self, content):
		self.logger.setLevel(logging.DEBUG)
		hdlr = logging.FileHandler(os.path.join(os.path.abspath(os.path.dirname(__file__)),'mylogs.log'))
		formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
		hdlr.setFormatter(formatter)
		self.logger.addHandler(hdlr)
		self.localize(content['body'])

	def localize(self, body):
		i = 0;
		for elm in body:
			ControllerName, arguments, bodyFuncs, bodyParams, serviceFuncs, serviceName = self.getController(elm['expression'])
			if ControllerName!=False and  serviceName!=False:
				self.logger.info('ControllerName es: '+str(ControllerName))
				self.logger.info('Body Function es'+str(bodyFuncs))
				self.logger.info('Body SerrviceName es: '+str(serviceName))
				self.logger.info('Body Service function es: '+str(serviceFuncs))
				self.setPopup(serviceFuncs, bodyFuncs['body']['body'])
				self.logger.info('Body Function es despues de añadir popup: '+str(bodyFuncs))
			i+=1
	def setPopup(self, serviceFuncs, bodyFuncs):
		for item in serviceFuncs:
			gotOpenSpinner = self.functionForService(item, 'isOpenSpinner')
      gotCloseSpinner = self.functionForService(item, 'closeSpinner')
      if gotCloseSpinner==False:
        closeSpinner = {
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
        bodyFuncs.append(closeSpinner)
			if gotOpenSpinner==False:
				isOpenSpinner = {
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
                          'raw': "None",
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
				bodyFuncs.append(isOpenSpinner)

	def getController(self, bodyElm):
		if bodyElm['type']=='CallExpression' and bodyElm['callee']['property']['name']=='controller':
			arguments, bodyFuncs, serviceName = self.getArguments(bodyElm['arguments'][1]['elements'])
			serviceFuncs = []
			for func in bodyFuncs['body']['body']:
				self.functionForService(func['expression'], serviceName, serviceFuncs)
			return [bodyElm['arguments'][0]['value'], arguments, bodyFuncs, bodyFuncs['params'], serviceFuncs, serviceName]
		return  [False, False, False, False, False, False]

	def getArguments(self, args):
		arguments = []
		serviceName = False
		for arg in args:
			if arg['type']=='Literal':
				if re.match(r"^.*service", arg['value'], flags=re.IGNORECASE) and arg['value'][0:2]!='T3' and arg['value']!='PopupService':
					serviceName = arg['value']
				arguments.append(arg['value'])
			elif arg['type']=='FunctionExpression':
				init = arg
		return [arguments, init, serviceName]

	def functionForService(self, function, serviceName, arr=[], d=False):
		if d==False:
			d = function
		for k, v in d.items():
			if isinstance(v, dict):
				self.functionForService(function, serviceName, arr, v)
			elif isinstance(v, list):
				for item in v:
					if isinstance(item, dict):
						self.functionForService(function, serviceName, arr, item)
					else:
						if item==serviceName:
							arr.append(function)
			else:
				if v==serviceName:
					arr.append(function)
		return len(arr)>0


