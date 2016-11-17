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
		rspec_print(' EL STRING ES'+str(self.append.getStr()))
		return ''.join(self.append.getStr())
	def read(self, content):
		for el in content:
			if self.asserts.ExpressionStatement(el):
				self.append.add(el['expression'])