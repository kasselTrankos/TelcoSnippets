from ...rspec.rspec_print import rspec_print
class Asserts():

	def Literal(self, obj):
		if 'type' in obj:
			return obj['type']=='Literal'
		return False

	def ExpressionStatement(self, obj):
		if 'type' in obj:
			return obj['type']=='ExpressionStatement'
		return False
	def AssignmentExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='AssignmentExpression'
		return False
	def Arguments(self, obj):
		if 'type' in obj:
			return 'arguments' in obj
		return False
	def CallExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='CallExpression'
		return False
	def ArrayExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='ArrayExpression'
		return False
	def Property(self, obj):
		if 'type' in obj:
			return obj['type']=='Property'
		return False
	def LogicalExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='LogicalExpression'
		return False
	def MemberExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='MemberExpression'
		return False
	def Identifier(self, obj):
		if 'type' in obj:
			return obj['type']=='Identifier'
		return False
	def UnaryExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='UnaryExpression'
		return False
	def FunctionExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='FunctionExpression'
		return False
	def ObjectExpression(self, obj):
		if 'type' in obj:
			return obj['type']=='ObjectExpression'
		return False
	def gotCallee(self, obj):
		return obj['callee']
	def gotObject(self, obj):
		return obj['object']
	def gotProperty(self, obj):
		return obj['property']
	def gotArguments(self, obj):
		return obj['arguments']