import sublime, sublime_plugin, os, locale, sys, re
sublime.message_dialog(os.path.join(os.path.abspath(os.path.dirname(__file__)),'slimit', 'src', 'slimit'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'jslex'))
from jslex import JsLexer, js_to_c_for_gettext

class TelcoSnippetsCommand():
	def init(self):
		sublime.message_dialog('jhla')
	def load_content(self, path_):
		sublime.message_dialog(path_)
		return open(path_, 'r+')

class TelcoSpinnerCommand(sublime_plugin.WindowCommand, TelcoSnippetsCommand):

	def run(self, paths=[], parameters=None):
		content = 'var i =0'
		
		#self.load_content(paths[0])
		lexer = JsLexer()
		for name, tok in lexer.lex(content):
			sublime.message_dialog("Tuple: {}"+name+' yo '+tok)
