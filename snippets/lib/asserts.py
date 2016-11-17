
class Assert():

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
	def isObjectExpression(self, obj):
		return obj['type']=='ObjectExpression'
	def gotCallee(self, obj):
		return obj['callee']
	def gotObject(self, obj):
		return obj['object']
	def gotProperty(self, obj):
		return obj['property']
	def gotArguments(self, obj):
		return obj['arguments']