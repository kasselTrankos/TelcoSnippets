import sys, os
from ...rspec.rspec_print import rspec_print
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..','..', 'pyesprima', 'pyesprima'))
import pyesprima
from .asserts import Asserts


class Append():
	str = []
	tabs = []
	asserts = Asserts()
	def getStr(self):
		return self.str
	def add(self, obj):
		if self.asserts.Literal(obj):
			self.Literal(obj)
		if self.asserts.CallExpression(obj):
			self.CallExpression(obj)
		if self.asserts.Arguments(obj):
			self.Arguments(obj)

	def append(self, elm, addDotPoint=False, addNewLine=False, addTabs=True):
		if addTabs:
			self.str.append(''.join(self.tabs))
		if self.asserts.Literal(elm):
			self.Literal(elm, addDotPoint, addNewLine)
		if self.asserts.Identifier(elm):
			self.Identifier(elm, addDotPoint)
		if self.asserts.FunctionExpression(elm):
			self.Function(elm, addTabs)
		if self.asserts.ObjectExpression(elm):
			self.ObjectExpression(elm)
		if self.asserts.AssignmentExpression(elm):
			self.AssignmentExpression(elm)
		if self.asserts.ExpressionStatement(elm):
			self.ExpressionStatement(elm)
		if self.asserts.MemberExpression(elm):
			self.MemberExpression(elm)
		if self.asserts.CallExpression(elm):
			self.CallExpression(elm)

	def ExpressionStatement(self, obj):
		self.append(obj['expression'])

	def obtainTree(self, obj, _append=[]):
		nodes = []
		_init = False
		_first = False
		_addCallee= False
		_arguments = []
		o = self.getItems(obj)
		for k, v in o:
			if k=='object' and 'name' in v:
				_init = v
			if k=='property':
				_append.append(v)
			if k=='callee':
				_append.append(v)
			if k=='a1rguments':
				b =0
				for a in v:
					_arguments.append(a)
					b+=1
			if isinstance(v, pyesprima.jsdict) or isinstance(v, dict):
				self.obtainTree(v, _append)
		if _init!=False:
			_first = _init
			_append.insert(0, _init)
		#if _addCallee==True:
		#	_append.append('(')
		#	if len(_arguments)>0:
		#		for _a in _arguments:
		#			_append.append(_a)
		#			_append.append(',')
		#	_append.append(')')
		return [_first, _append]

	def CallExpression(self, obj, _append=[]):
		modes = False
		#first, nodes = self.obtainTree (obj, [])
		self.NewLine()
		if isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__
		elif isinstance(obj, dict):
			o = obj

		#t = 0
		#for i in range(len(nodes)):
		#	self.append(nodes[i], i>0, False, i==0)
		#	t+=1
		if 'callee' in obj:
			self.append(obj['callee'])
			self.Parentesis()
			if 'arguments' in obj:
				self.append(obj['arguments'])
			self.Parentesis(False, True)

	def ObjectExpression(self, obj):
		self.KeyBrackets(True, True)

	def Identifier(self, elm, addDotPoint=True):
		if addDotPoint:
			self.str.append('.')
		self.str.append(elm['name'])

	def getItems(self, obj):
		if isinstance(obj, dict):
			o =  obj.items()
		elif isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__.items()
		else:
			o = obj
		return o



	def Literal(self, elm, addDotPoint=True, addNewLine=True):

		raw = elm['raw']
		if raw == None:
			raw = 'false'
		self.str.append(raw)
		if addDotPoint:
			self.str.append(';')
		if addNewLine:
			self.NewLine()




	def Function(self, obj, tabs=False):

		self.str.append('function')
		self.Parentesis()
		if 'params' in obj:
			self.Arguments(obj, 'params')
		self.Parentesis(False, True)
		self.KeyBrackets()
		if 'body' in obj:
			self.Body(obj)
		self.KeyBrackets(False, True)


	def Body(self, obj):
		_body = []
		self.Tab()
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
			self.DotComma()
		if 'callee' in obj:
			self.append(obj['callee'], False, False, False)


	def Arguments(self, args, nodeName='arguments'):
		i=1
		if len(args[nodeName])>4:
			self.NewLine()
			self.Tab()
		for arg in args[nodeName]:
			if self.asserts.ArrayExpression(arg):
				t=1
				self.Brackets()
				for item in arg['elements']:
					self.append(item, False)
					if t<len(arg['elements']):
						self.Comma()
						if len(arg['elements'])>4:
							self.NewLine()
					t+=1
				self.Brackets(False, True)
			else:
				self.append(arg, False)
				if i<len(args[nodeName]):
					self.Comma()
					if len(args[nodeName])>4:
						self.NewLine()
			i+=1


	def MemberExpression(self, obj, newLine=False):
		if newLine:
			self.NewLine()

		if isinstance(obj, pyesprima.jsdict):
			o = obj.__dict__
		elif isinstance(obj, dict):
			o = obj
		_arr = []
		for k,v in o.items():
			if k=='object':
				self.append(v)
		for k,v in o.items():
			if k== 'property':
				self.Identifier(v, True)

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
