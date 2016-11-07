import sublime, sublime_plugin, os, locale, sys, re
from xml.dom import minidom
from xml.etree import ElementTree
import ntpath
import subprocess
from subprocess import Popen, PIPE, STDOUT
from sys import version_info
import datetime


class TelcoSnippetsCommand():

class TelcoCommand(sublime_plugin.WindowCommand, FiddlerInjectorCommand):
	def run(self, paths=[], parameters=None):
		sublime.message_dialog('<::::::jol::::>'+paths[0]+'----')
		isCGT, name = self.getCnt_cgt_info(paths[0])
		fname = self.window.active_view().file_name()
		if fname == None:
			fname = ""
		if isCGT:
			sublime.message_dialog('<::::::jol::::>CGT----')
		else:
			sublime.message_dialog('<::::::jol::::>CNT----')
		def done(cntName):
				self.create_fiddler(paths[0], parameters, cntName, isCGT, name)
		if parameters is None:
			parameters = get_setting('parameters', [])

		if(isCGT):
			self.window.show_input_panel(
            "Name of CNT is: ", fname, done, None, None)
		else:
			self.create_fiddler(paths[0], parameters, name, isCGT, name)
