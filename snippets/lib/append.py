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
	def add(self, obj):
		if self.asserts.Literal(obj):
			self.Literal(obj)
		if self.asserts.CallExpression(obj):
			self.CallExpression(obj)
		if self.asserts.Arguments(obj):
			self.Arguments(obj)

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
	def UnaryExpression(self, obj):
		self.str.append(obj['operator'])
		self.str.append(obj['argument']['raw'])
	def ExpressionStatement(self, obj):
		self.append(obj['expression'])

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
					self.calleeArguments=True
					self.CallExpression_arguments(obj['arguments'])
					self.calleeArguments=False
			self.Parentesis(False, True)
			self.DotComma()
	def CallExpression_arguments(self, obj):
		l = len(obj)
		for i in range(l):
			self.append(obj[i], False, False, False, i<l-1)
	def ObjectExpression(self, obj):
		self.KeyBrackets(True, True)

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
		if addDotPoint:
			self.DotComma()
		if addComma:
			self.Comma()
		if addNewLine:
			self.NewLine()




	def FunctionExpression(self, obj, tabs=False):
		self.str.append('function')
		self.Parentesis()
		if 'params' in obj:
			if len(obj['params'])>0:
				self.Tab()
				self.params(obj['params'])
				self.Tab(False, False, True)
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
		self.Tab()
		for body in obj['body']['body']:
			self.append(body)

	def AssignmentExpression(self, obj):
		if 'left' in obj:
			self.NewLine()
			self.append(obj['left'], False, False, self.calleeArguments==False)
		if 'operator' in obj:
			self.str.append(obj['operator'])
		if 'right' in obj:
			self.append(obj['right'], False, False, False)
			self.DotComma()
		if 'callee' in obj:
			self.append(obj['callee'], False, False, False)

	def ArrayExpression(self, obj):

		self.Brackets()
		l = len(obj['elements'])
		if(l>4):
			self.Tab()
		for  i in range(l):
			self.append(obj['elements'][i], False, True, l>4, i<l-1)
		if(l>4):
			self.Tab(False, False, True)
		self.Brackets(False, True)
	def Arguments(self, args, nodeName='arguments'):

		l =len(args[nodeName])

		if l>4:
			self.Tab()

		for i in range(l):
			self.append(args[nodeName][i], False, l>4, l>4, i>0)
		if l>4:
			self.Tab(False, False, True)
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
				self.append(v, True, False, False)

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

	def Brackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('[')
		if addClose:
			self.str.append(']')
