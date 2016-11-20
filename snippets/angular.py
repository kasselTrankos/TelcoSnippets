import sublime, sys, os
from ..rspec.rspec_print import rspec_print
from .lib.append import Append
from .lib.asserts import Asserts

sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'sublimetext-codeformatter', 'codeformatter'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'sublimetext-codeformatter', 'codeformatter', 'lib'))
from jsformatter import JsFormatter
import jsbeautifier
import pyesprima
class Angular():
	tabs = []
	str = []
	asserts = Asserts()
	append = Append()
	settings= {
		"codeformatter_js_options":
	    {
	        "syntaxes": "javascript,json", # Syntax names which must process JS formatter
	        "format_on_save": False, # Format on save
	        "indent_size": 4, # indentation size
	        "indent_char": " ", # Indent character
	        "indent_with_tabs": False, # Indent with one tab (overrides indent_size and indent_char options)
	        "eol": "\n", # EOL symbol
	        "preserve_newlines": False, # whether existing line breaks should be preserved,
	        "max_preserve_newlines": 10, # maximum number of line breaks to be preserved in one chunk
	        "space_in_paren": False, # Add padding spaces within paren, ie. f( a, b )
	        "space_in_empty_paren": False, # Add padding spaces within paren if parent empty, ie. f(  )
	        "e4x": False, # Pass E4X xml literals through untouched
	        "jslint_happy": False, # if true, then jslint-stricter mode is enforced. Example function () vs function()
	        "brace_style": "collapse", # "collapse" | "expand" | "end-expand". put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.
	        "keep_array_indentation": False, # keep array indentation.
	        "keep_function_indentation": False, # keep function indentation.
	        "eval_code": False, # eval code
	        "unescape_strings": False, # Decode printable characters encoded in xNN notation
	        "wrap_line_length": 0, # Wrap lines at next opportunity after N characters
	        "break_chained_methods": False, # Break chained method calls across subsequent lines
	        "end_with_newline": False, # Add new line at end of file
	        "comma_first": False # Add comma first
	    }
	}
	def create(self, path, json):
		file = []
		file.append(path)
		file.append('test.js')
		f = open(''.join(file),"w") #opens file with name of "test.txt"
		f.write(self.doStr(json))
		f.close()
	def doStr(self, json):
		self.read(json['body'])
		rspec_print('STR:: is : '+str(self.append.getStr()))
		js =  ''.join(self.append.getStr())
		return jsbeautifier.beautify(text, options)
	def read(self, content):
		for el in content:
			if self.asserts.ExpressionStatement(el):
				self.append.add(el['expression'])