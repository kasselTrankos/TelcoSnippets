class Asserts():

	def ExpressionStatement(self, obj):
		return obj['type']=='ExpressionStatement'
	def Literal(self, obj):
		return obj['type']=='Literal'
	def Arguments(self, obj):
		return 'arguments' in obj
	def CallExpression(self, obj):
		return obj['type']=='CallExpression'
	def ArrayExpression(self, obj):
		return obj['type']=='ArrayExpression'
	def MemberExpression(self, obj):
		return obj['type']=='MemberExpression'
	def Identifier(self, obj):
		return obj['type']=='Identifier'
	def FunctionExpression(self, obj):
		return obj['type']=='FunctionExpression'
	def ObjectExpression(self, obj):
		return obj['type']=='ObjectExpression'
	def gotCallee(self, obj):
		return obj['callee']
	def gotObject(self, obj):
		return obj['object']
	def gotProperty(self, obj):
		return obj['property']
	def gotArguments(self, obj):
		return obj['arguments']