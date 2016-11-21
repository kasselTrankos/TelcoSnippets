import sys, os
from ...rspec.rspec_print import rspec_print
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..','..', 'pyesprima', 'pyesprima'))
import pyesprima
from .asserts import Asserts


class Append():
	str = []
	tabs = []
	asserts = Asserts()
	tabActual = True
	calleeArguments = False
	def getStr(self):
		return self.str

	def append(self, elm, addDotPoint=False, addNewLine=False, addTabs=True, addComma=False):
		if addTabs:
			self.str.append(''.join(self.tabs))
		if self.asserts.Literal(elm):
			self.Literal(elm, addDotPoint, addNewLine, addComma)
		if self.asserts.Identifier(elm):
			self.Identifier(elm, addDotPoint, addComma, addNewLine)
		if self.asserts.FunctionExpression(elm):
			self.FunctionExpression(elm, addTabs)
		if self.asserts.ObjectExpression(elm):
			self.ObjectExpression(elm)
		if self.asserts.AssignmentExpression(elm):
			self.AssignmentExpression(elm)
		if self.asserts.ExpressionStatement(elm):
			self.ExpressionStatement(elm)
		if self.asserts.MemberExpression(elm):
			self.MemberExpression(elm, addDotPoint, addNewLine, addTabs)
		if self.asserts.CallExpression(elm):
			self.CallExpression(elm)
		if self.asserts.ArrayExpression(elm):
			self.ArrayExpression(elm)
		if self.asserts.UnaryExpression(elm):
			self.UnaryExpression(elm)
		if self.asserts.Property(elm):
			self.Property(elm)
		if self.asserts.LogicalExpression(elm):
			self.LogicalExpression(elm)
		if self.asserts.VariableDeclaration(elm):
			self.VariableDeclaration(elm)
		if self.asserts.IfStatement(elm):
			self.IfStatement(elm)
		if self.asserts.BlockStatement(elm):
			self.BlockStatement(elm)
		if self.asserts.BinaryExpression(elm):
			self.BinaryExpression(elm)

	def BinaryExpression(self, obj):
		if 'left' in obj:
			self.append(obj['left'])
		if 'operator' in obj:
			self.str.append(obj['operator'])
		if 'right' in obj:
			self.append(obj['right'])
	def BlockStatement(self, obj):
		l = len(obj['body'])
		for i in range(l):
			self.append(obj['body'][i])

	def IfStatement(self, obj):
		self.str.append('if')
		self.Parentesis()
		self.append(obj['test'])
		self.Parentesis(False, True)
		self.KeyBrackets()
		if 'consequent' in obj:
			for consequent in obj['consequent']['body']:
				self.append(consequent)
		self.KeyBrackets(False, True)
		if 'alternate' in obj and obj['alternate'] != None:
			self.str.append('else')
		#	if self.asserts.BlockStatement(obj['alternate']):
		#		self.KeyBrackets()
		#	self.WhiteSpace()
		#	#self.KeyBrackets()
			self.append(obj['alternate'])
		#	self.KeyBrackets(False, True)
		self.str.append('/* cierre de if stament end*/')

	def VariableDeclaration(self, obj):
		for d in obj['declarations']:
			self.str.append(obj['kind'])
			self.WhiteSpace()
			self.append(d['id'])
			self.str.append('=')
			self.append(d['init'])

	def UnaryExpression(self, obj):
		self.str.append(obj['operator'])
		if 'argument' in obj:
			if 'raw' in obj['argument']:
				self.str.append(obj['argument']['raw'])
	def ExpressionStatement(self, obj):
		self.append(obj['expression'])
		self.DotComma()

	def LogicalExpression(self, obj):
		if 'left' in obj:
			self.append(obj['left'], False, False, False)
		if 'operator' in obj:
			self.str.append(obj['operator'])
		if 'right' in obj:
			self.append(obj['right'], False, False, False)
	def CallExpression(self, obj):
		self.NewLine()
		if isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__
		elif isinstance(obj, dict):
			o = obj
		if 'callee' in obj:
			self.append(obj['callee'])
			self.Parentesis()
			if 'arguments' in obj:
				if len(obj['arguments'])>0:
					self.CallExpression_arguments(obj['arguments'])
			self.Parentesis(False, True)

	def CallExpression_arguments(self, obj):
		l = len(obj)
		for i in range(l):
			self.append(obj[i], False, False, False)
			if i<l-1:
				self.Comma()
	def ObjectExpression(self, obj):
		self.KeyBrackets()
		if 'properties' in obj:
			l = len(obj['properties'])
			for i in range(l):
				self.append(obj['properties'][i])
				if i<l-1:
					self.Comma()
		self.KeyBrackets(False, True)
	def Property(self, obj):

		self.NewLine()
		self.append(obj['key'])
		self.DoublePoint()
		self.append(obj['value'], False, False, False)

	def Identifier(self, elm, addDotPoint=True, addComma=False, addNewLine=False):
		if addNewLine:
			self.NewLine()
		if addDotPoint:
			self.Point()
		self.str.append(elm['name'])
		if addComma:
			self.Comma()

	def getItems(self, obj):
		if isinstance(obj, dict):
			o =  obj.items()
		elif isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__.items()
		else:
			o = obj
		return o



	def Literal(self, elm, addDotPoint=True, addNewLine=True, addComma=False):

		raw = elm['raw']
		if raw == None:
			raw = 'false'
		self.str.append(raw)
		if addComma:
			self.Comma()
		if addNewLine:
			self.NewLine()




	def FunctionExpression(self, obj, tabs=False):
		self.str.append('function')
		self.Parentesis()
		if 'params' in obj:
			if len(obj['params'])>0:
				self.params(obj['params'])
		self.Parentesis(False, True)
		self.KeyBrackets()
		if 'body' in obj:
			self.Body(obj)
		self.NewLine()
		self.KeyBrackets(False, True)

	def params(self, arr):
		l = len(arr)
		for i in range(l):
			self.NewLine()
			self.append(arr[i], False, False, True, i<l-1)
	def Body(self, obj):
		_body = []
		for body in obj['body']['body']:
			self.append(body)

	def AssignmentExpression(self, obj):
		if 'left' in obj:
			self.NewLine()
			self.append(obj['left'], False, False)
		if 'operator' in obj:
			self.str.append(obj['operator'])
		if 'right' in obj:
			self.append(obj['right'], False, False, False)
		if 'callee' in obj:
			self.append(obj['callee'], False, False, False)

	def ArrayExpression(self, obj):

		self.Brackets()
		l = len(obj['elements'])
		for  i in range(l):
			self.append(obj['elements'][i], False, True, l>4, i<l-1)
			if i<l-1:
				self.Comma()
		self.Brackets(False, True)
	def Arguments(self, args, nodeName='arguments'):

		l =len(args[nodeName])


		for i in range(l):
			self.append(args[nodeName][i], False, l>4, l>4, i>0)
	def MemberExpression(self, obj, addDotPoint=True, addNewLine=False, addTabs=True):
		if addNewLine:
			self.NewLine()

		if isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__
		elif isinstance(obj, dict):
			o = obj

		for k,v in o.items():
			if k=='object':
				self.append(v, addDotPoint, addNewLine, addTabs )
		for k,v in o.items():
			if k== 'property':
				if self.asserts.Literal(v):
					self.Brackets()
				self.append(v, True, False, False)
				if self.asserts.Literal(v):
					self.Brackets(False, True)

	def Tab(self, append=True, join=False, quit=False):
		if append:
			self.tabs.append('\t')
		if join:
			self.str.append(''.join(self.tabs))
		if quit:
			if len(self.tabs)>0:
				self.tabs.pop()

	def Comma(self):
		self.str.append(',')

	def Point(self):
		self.str.append('.')

	def DoublePoint(self):
		self.str.append(':')

	def DotComma(self):
		self.str.append(';')

	def NewLine(self):
		self.str.append('\n')

	def Parentesis(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('(')
		if addClose:
			self.str.append(')')
	def KeyBrackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('{')
		if addClose:
			self.str.append('}')

	def WhiteSpace(self):
		self.str.append(' ')
	def Brackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('[')
		if addClose:
			self.str.append(']')
