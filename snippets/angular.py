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
				elif isCallExpression(el['expression']):
					self.appendArguments(el['arguments'])



	def isExpression(self, obj):
		return obj['type']=='ExpressionStatement'
	def isLiteral(self, obj):
		return obj['type']=='Literal'
	def isCallExpression(self, obj):
		return obj['type']=='CallExpression'
	def appendLiteral(self, elm, addDotPoint=True):
		self.str.append(elm['raw'])
		if(addDotPoint):
			self.str.append(';')
		self.str.append('\n')
	def appendArguments(self, args):
		for arg in args:
			if self.isLiteral(arg):
				self.appendLiteral(arg, False)
