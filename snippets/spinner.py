import os, re, sublime, os, json
import logging
from .scripts import openSpinner
from .scripts import closeSpinner
from .scripts import initVarsSpinner

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
		self.logger.info('Terminado el BODY STR ::: '+str(content))
		return content
	def localize(self, body):
		i = 0;
		for elm in body:
			ControllerName, arguments, bodyFuncs, bodyParams, serviceFuncs, serviceName = self.getController(elm['expression'])

			if ControllerName!=False and  serviceName!=False:
				#self.logger.info('ControllerName es: '+str(ControllerName))
				#self.logger.info('Body Function es'+str(bodyFuncs))
				#self.logger.info('Body SerrviceName es: '+str(serviceName))
				#self.logger.info('Body Service function es: '+str(serviceFuncs))
				self.setSpinnerInBody(bodyFuncs['body']['body'])
				self.setSpinnerVarsInInit(bodyFuncs['body']['body'])
				#self.logger.info('Body Function es despues de añadir popup: '+str(bodyFuncs))
			i+=1
	def setSpinnerVarsInInit(self, bodyFuncs):
		init = self.findMethodByName('init', bodyFuncs)
		if self.isDeclaredScopeSpinners(init['right']['body']['body'], 'spinners')==False:
			init['right']['body']['body'].append(initVarsSpinner.spinners)
		if self.isDeclaredScopeSpinners(init['right']['body']['body'], 'isOpenSpinner')==False:
			init['right']['body']['body'].append(initVarsSpinner.isOpenSpinner)
	def isDeclaredScopeSpinners(self, initBody, property):
		for assigment in initBody:
			if assigment['expression']['type']=="AssignmentExpression":
				if assigment['expression']['left']['property']['name']==property:
					return True
		return False

	def findMethodByName(self, name, bodyFuncs):
		for func in bodyFuncs:
			if func['expression']['left']['property']['name']==name:
				return func['expression']
		return False
	def setSpinnerInBody(self, bodyFuncs):
		gotCloseSpinner = False
		gotOpenSpinner = False
		for item in bodyFuncs:
			gotOpenSpinner = self.functionForService(item, 'isOpenSpinner')
			gotCloseSpinner = self.functionForService(item, 'closeSpinner')
		if gotCloseSpinner==False:
			closeSpinner = closeSpinner.script
			bodyFuncs.append(closeSpinner)
		if gotOpenSpinner==False:
			openSpinner = openSpinner.script
			bodyFuncs.append(openSpinner)

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
		for k,v in d.__dict__.items():
			if isinstance(v, dict):
				self.functionForService(function, serviceName, arr, d[k])
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


