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
					self.str.append(el['expression']['value'])


	def isExpression(self, obj):
		return obj['type']=='ExpressionStatement'
	def isLiteral(self, obj):
		return obj['type']=='Literal'
