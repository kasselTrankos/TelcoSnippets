import sublime
from ..rspec.rspec_print import rspec_print
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
							self.appendCallExpression(el['expression']['callee']['object'])
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

	def append(self, elm, addDotPoint=False, addNewLine=False ):
		self.str.append(''.join(self.tabs))
		if self.isLiteral(elm):
			self.appendLiteral(elm, addDotPoint, addNewLine)
		if self.isIdentifier(elm):
			self.appendIdentifier(elm, addDotPoint)

		#if self.isFunctionExpression(elm):
			#self.

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
	def appendParentesis(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('(')
		if addClose:
			self.str.append(')')
	def appendBrackets(self, addStart=True, addClose=False):
		if addStart:
			self.str.append('[')
		if addClose:
			self.str.append(']')
	def appendComma(self):
		self.str.append(',')
	def appendNewLine(self):
		self.str.append('\n')

	def appendArguments(self, args):
		i=1
		self.appendNewLine()
		self.tabs.append('\t')
		for arg in args['arguments']:
			if self.isLiteral(arg):
				self.append(arg, False)
				if i<len(args['arguments']):
					self.appendComma()
					self.appendNewLine()
				i+=1
			if self.isArrayExpression(arg):
				t=1
				self.appendBrackets()
				for item in arg['elements']:
					self.append(item, False)
					if t<len(arg['elements']):
						self.appendComma()
						self.appendNewLine()

					t+=1
				self.appendBrackets(False, True)
		self.tabs.pop()

	def gotCallee(self, obj):
		return obj['callee']
	def gotObject(self, obj):
		return obj['object']
	def gotProperty(self, obj):
		return obj['property']
	def gotArguments(self, obj):
		return obj['arguments']
	def appendCallExpression(self, obj):
		_append = []
		for k, v in obj.__dict__.items():
			if isinstance(v, dict):
				if v['object']:
					self.appendCallExpression(v)
			if k=='object':
				_init = v
			if k=='property':
				_append.append(v)

		_append.insert(0, _init)
		i = 0

		for item in _append:
			self.append(item, i>0)
			i+=1
