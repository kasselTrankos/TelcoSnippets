import sublime, sys, os
from ..rspec.rspec_print import rspec_print
from ..astParser.append import Append
from ..astParser.asserts import Asserts

sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'js-beautify', 'python'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'six'))
import jsbeautifier
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
		self.append.init()
		self.read(json['body'])
		js =  ''.join(str(x) for x in self.append.getStr())
		opts = jsbeautifier.default_options()
		opts.space_in_paren = True
		opts.indent_size = 4
		return jsbeautifier.beautify(js, opts)
	def read(self, content):
		for el in content:
			self.append.append(el)
