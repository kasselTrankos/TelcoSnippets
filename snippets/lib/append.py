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
		rspec_print('ATG'+str(self.asserts.Arguments(obj)))
		if self.asserts.Arguments(obj):
			self.Arguments(obj)
	def append(self, elm, addDotPoint=False, addNewLine=False, addTabs=True ):
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
	def CallExpression(self, obj, _append=[]):
		modes = False
		first, nodes = self.obtainTree(obj, [])
		for i in range(len(nodes)):
			self.append(nodes[i], i>0, False, False)


	def ObjectExpression(self, obj):
		self.KeyBrackets(True, True)
		self.NewLine();
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
			o=obj
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
	def Literal(self, elm, addDotPoint=True, addNewLine=True):
		self.str.append(elm['raw'])
		if addDotPoint:
			self.str.append(';')
		if addNewLine:
			self.str.append('\n')
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
	def Comma(self):
		self.str.append(',')

	def NewLine(self):
		self.str.append('\n')


	def Function(self, obj, tabs=False):
		self.str.append('function')
		self.Parentesis()
		if 'params' in obj:
			self.Arguments(obj, 'params')
		self.Parentesis(False, True)
		self.KeyBrackets()
		self.tabs.append('\t')
		if 'body' in obj:
			if tabs==True:
				self.tabs.append('\t')
			self.Body(obj)
			if tabs==True:
				if len(self.tabs)>0:
					self.tabs.pop()
		if len(self.tabs)>0:
			self.tabs.pop()
		self.KeyBrackets(False, True)

	def Body(self, obj):
		_body = []
		for body in obj['body']['body']:
			if self.asserts.ExpressionStatement(body):
				if body['expression']['type']=='AssignmentExpression':
					self.AssignmentExpression(body['expression'])
	def AssignmentExpression(self, obj):
		if obj['left']['type']=='MemberExpression':
			self.MemberExpression(obj['left'])
		self.str.append(obj['operator'])
		if obj['right']['type']=='FunctionExpression':
			self.append(obj['right'], False, False, False)


	def Arguments(self, args, nodeName='arguments'):
		i=1
		if len(args[nodeName])>4:
			self.NewLine()
			self.tabs.append('\t')
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
		if len(self.tabs)>0:
			self.tabs.pop()


	def MemberExpression(self, obj):
		self.NewLine()
		self.tabs.append('\t')
		self.str.append(''.join(self.tabs))
		self.CallExpression(obj, [])
		if len(self.tabs)>0:
			self.tabs.pop()