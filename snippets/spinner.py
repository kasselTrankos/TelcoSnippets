import os, re, sublime, os, json, sys
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
from ..rspec.rspec_print import rspec_print
import logging
from .scripts import openSpinner
from .scripts import closeSpinner
from .scripts import initVarsSpinner
import pyesprima
from .lib.utils import findFunction

class Spinner:
	controllers = []
	logger = logging.getLogger('myapp')
	def parse(self, content):
		self.logger.setLevel(logging.DEBUG)
		hdlr = logging.FileHandler(os.path.join(os.path.abspath(os.path.dirname(__file__)),'mylogs.log'))
		formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
		hdlr.setFormatter(formatter)
		self.logger.addHandler(hdlr)
		self.localize(content['body'])
		return content
	def localize(self, body):
		funcInit = findFunction('init', body)


