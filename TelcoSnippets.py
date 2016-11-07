import sublime, sublime_plugin, os, locale, sys, re

class TelcoSnippetsCommand():
	def init(self):
		sublime.message_dialog('jhla')
	def load_content(self, path_):
		sublime.message_dialog(path_)
		return open(path_, 'r+')

class TelcoSpinnerCommand(sublime_plugin.WindowCommand, TelcoSnippetsCommand):

	def run(self, paths=[], parameters=None):
		content = self.load_content(paths[0])
		sublime.message_dialog(paths[0])
