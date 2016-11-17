import sublime, sys, os
from ..rspec.rspec_print import rspec_print
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
import pyesprima
class Angular():
	tabs = []
	str = []
	def create(self, path, json):
		file = []
		file.append(path)
		file.append('test.js')
		f = open(''.join(file),"w") #opens file with name of "test.txt"
		f.write(self.doStr(json))
		f.close()
	def doStr(self, json):
		self.read(json['body'])
		return ''.join(self.str)
	def read(self, content):
		for el in content:
			if self.isExpression(el):
				if self.isLiteral(el['expression']):
					self.appendLiteral(el['expression'])
				elif self.gotCallee(el['expression']):
					if self.isMemberExpression(el['expression']['callee']):
						if self.gotObject(el['expression']['callee']):
							self.appendCallExpression(el['expression']['callee']['object'], [])
						if self.gotProperty(el['expression']['callee']):
							self.append(el['expression']['callee']['property'], True)
							self.appendParentesis()
							if 'arguments' in el['expression']:
								self.appendArguments(el['expression'])
							self.appendParentesis(False, True)
							self.str.append(';')
							self.str.append('\n')
				#elif self.isCallExpression(el['expression']):
				#	self.appendArguments(el['expression']['arguments'])

	def append(self, elm, addDotPoint=False, addNewLine=False, addTabs=True ):
		if addTabs:
			self.str.append(''.join(self.tabs))
		if self.isLiteral(elm):
			self.appendLiteral(elm, addDotPoint, addNewLine)
		if self.isIdentifier(elm):
			self.appendIdentifier(elm, addDotPoint)
		if self.isFunctionExpression(elm):
			self.appendFunction(elm)

	def isExpression(self, obj):
		return obj['type']=='ExpressionStatement'
	def isLiteral(self, obj):
		return obj['type']=='Literal'
	def isCallExpression(self, obj):
		return obj['type']=='CallExpression'
	def isArrayExpression(self, obj):
		return obj['type']=='ArrayExpression'
	def isMemberExpression(self, obj):
		return obj['type']=='MemberExpression'
	def isIdentifier(self, obj):
		return obj['type']=='Identifier'
	def isFunctionExpression(self, obj):
		return obj['type']=='FunctionExpression'
	def appendIdentifier(self, elm, addDotPoint=True):
		if addDotPoint:
			self.str.append('.')
		self.str.append(elm['name'])
	def appendLiteral(self, elm, addDotPoint=True, addNewLine=True):
		self.str.append(elm['raw'])
		if addDotPoint:
			self.str.append(';')
		if addNewLine:
			self.str.append('\n')
	def addNewLine(self):
		self.str.append('\n')
	def appendParentesis(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('(')
		if addClose:
			self.str.append(')')
	def appendKeyBrackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('{')
		if addClose:
			self.str.append('}')
	def appendBrackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('[')
		if addClose:
			self.str.append(']')
	def appendComma(self):
		self.str.append(',')
	def appendNewLine(self):
		self.str.append('\n')
	def appendFunction(self, obj, tabs=False):
		self.str.append('function')
		self.appendParentesis()

		if 'params' in obj:
			self.appendArguments(obj, 'params')
		self.appendParentesis(False, True)
		self.appendKeyBrackets()
		self.tabs.append('\t')
		if 'body' in obj:
			if tabs==True:
				self.tabs.append('\t')
			self.appendBody(obj)
			if tabs==True:
				if len(self.tabs)>0:
					self.tabs.pop()
		if len(self.tabs)>0:
			self.tabs.pop()
		self.appendKeyBrackets(False, True)
	def appendBody(self, obj):
		_body = []
		for body in obj['body']['body']:
			if self.isExpression(body):
				if body['expression']['type']=='AssignmentExpression':
					self.appendAssignmentExpression(body['expression'])
	def appendAssignmentExpression(self, obj):
		if obj['left']['type']=='MemberExpression':
			self.appendMemberExpression(obj['left'])
		self.str.append(obj['operator'])
		if obj['right']['type']=='FunctionExpression':
			self.appendFunction(obj['right'], True)

	def appendArguments(self, args, nodeName='arguments'):
		i=1
		if len(args[nodeName])>4:
			self.appendNewLine()
			self.tabs.append('\t')
		for arg in args[nodeName]:
			if self.isArrayExpression(arg):
				t=1
				self.appendBrackets()
				for item in arg['elements']:
					self.append(item, False)
					if t<len(arg['elements']):
						self.appendComma()
						if len(arg['elements'])>4:
							self.appendNewLine()

					t+=1
				self.appendBrackets(False, True)
			else:
				self.append(arg, False)
				if i<len(args[nodeName]):
					self.appendComma()
					if len(args[nodeName])>4:
						self.appendNewLine()
			i+=1
		if len(self.tabs)>0:
			self.tabs.pop()

	def gotCallee(self, obj):
		return obj['callee']
	def gotObject(self, obj):
		return obj['object']
	def gotProperty(self, obj):
		return obj['property']
	def gotArguments(self, obj):
		return obj['arguments']
	def appendMemberExpression(self, obj):
		self.addNewLine()
		self.tabs.append('\t')
		self.str.append(''.join(self.tabs))
		self.appendCallExpression(obj, [])
		if len(self.tabs)>0:
			self.tabs.pop()
	def getItems(self, obj):
		if isinstance(obj, dict):
			o =  obj.items()
		else:
			o=obj.__dict__.items()
		return o
	def getItem(self, obj):
		if isinstance(obj, dict):
			o =  obj
		else:
			o=obj.__dict__
		return o
	def obtainTree(self, obj, _append=[]):
		nodes = []
		_init = False
		_first = False
		o = self.getItems(obj)
		for k, v in o:

			if k=='object':
				_init = v
			if k=='property':
				_append.append(v)
			if isinstance(v, pyesprima.jsdict) or isinstance(v, dict):
				self.obtainTree(v, _append)


		if _init!=False and _init['name']:
			_first = _init
			_append.insert(0, _init)
		return [_first, _append]
	def appendCallExpression(self, obj, _append=[]):
		modes = False
		first, nodes = self.obtainTree(obj, [])
		for i in range(len(nodes)):
			self.append(nodes[i], i>0, False, False)
