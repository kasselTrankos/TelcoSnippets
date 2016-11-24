import sublime,imp, sublime_plugin, os, locale, sys, re
from .snippets.spinner import Spinner
from .snippets.angular import Angular
from .pyjsparser.pyjsparser import PyJsParser
#from .slimit.src.slimit.parser import Parser
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), 'pyesprima', 'pyesprima'))
import pyesprima

BASE_PATH = os.path.abspath(os.path.dirname(__file__))
CODE_DIRS = [
  'plugin_helpers',
  'rspec',
]
sys.path += [BASE_PATH] + [os.path.join(BASE_PATH, f) for f in CODE_DIRS]
# =======
# reload plugin files on change
if 'plugin_helpers.reloader' in sys.modules:
  imp.reload(sys.modules['plugin_helpers.reloader'])
import plugin_helpers.reloader


class TelcoSnippetsCommand():
	def init(self):
		sublime.message_dialog('jhla')
	def load_content(self, path_):
		sublime.message_dialog(path_)
		return open(path_, 'r+').read()

class TelcoSpinnerCommand(sublime_plugin.WindowCommand, TelcoSnippetsCommand):

	def run(self, paths=[], parameters=None):
		spinner = Spinner()
		p = PyJsParser()
		a = Angular()
		content = self.load_content(paths[0])
		#lexer = JsLexer()
		#spinner.parse(lexer.lex(content))
		json = spinner.parse(pyesprima.parse(content))
		a.create(paths[0], json)
