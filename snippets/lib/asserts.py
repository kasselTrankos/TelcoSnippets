from ...rspec.rspec_print import rspec_print
class Asserts():

	def Literal(self, obj):
		if 'type' in obj:
			return obj['type']=='Literal'
		return False

	def ExpressionStatement(self, obj):
		return obj['type']=='ExpressionStatement'
	def AssignmentExpression(self, obj):
		return obj['type']=='AssignmentExpression'

	def Arguments(self, obj):
		return 'arguments' in obj
	def CallExpression(self, obj):
		return obj['type']=='CallExpression'
	def ArrayExpression(self, obj):
		return obj['type']=='ArrayExpression'
	def MemberExpression(self, obj):
		return obj['type']=='MemberExpression'
	def Identifier(self, obj):
		if 'type' in obj:
			return obj['type']=='Identifier'
		return False
	def UnaryExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='UnaryExpression'
		return False
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