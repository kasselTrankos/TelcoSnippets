import sublime, sys, os
from ..rspec.rspec_print import rspec_print
from .lib.append import Append
from .lib.asserts import Asserts
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
import pyesprima
class Angular():
	tabs = []
	str = []
	asserts = Asserts()
	append = Append()
	def create(self, path, json):
		file = []
		file.append(path)
		file.append('test.js')
		f = open(''.join(file),"w") #opens file with name of "test.txt"
		f.write(self.doStr(json))
		f.close()
	def doStr(self, json):
		self.read(json['body'])
		return ''.join(self.append.getStr())
	def read(self, content):
		for el in content:
			if self.asserts.ExpressionStatement(el):
				self.append.add(el['expression'])
			#if self.isExpression(el):
			#	if self.isLiteral(el['expression']):
			#		self.appendLiteral(el['expression'])
			#	elif self.gotCallee(el['expression']):
			#		if self.isMemberExpression(el['expression']['callee']):
			#			if self.gotObject(el['expression']['callee']):
			#				self.appendCallExpression(el['expression']['callee']['object'], [])
			#			if self.gotProperty(el['expression']['callee']):
			#				self.append(el['expression']['callee']['property'], True)
			#				self.appendParentesis()
			#				if 'arguments' in el['expression']:
			#					self.appendArguments(el['expression'])
			#				self.appendParentesis(False, True)
			#				self.str.append(';')
			#				self.str.append('\n')
				#elif self.isCallExpression(el['expression']):
				#	self.appendArguments(el['expression']['arguments'])








