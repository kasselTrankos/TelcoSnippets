import sublime, sublime_plugin, os, locale, sys, re
from .jslex.jslex import JsLexer, js_to_c_for_gettext, Tok
from .snippets.spinner import Spinner
from .pyjsparser.pyjsparser import PyJsParser

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
		content = self.load_content(paths[0])
		#lexer = JsLexer()
		#spinner.parse(lexer.lex(content))
		spinner.parse(p.parse(content))
