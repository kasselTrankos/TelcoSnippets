import os, re, sublime, os, json, sys
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'pyesprima', 'pyesprima'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'python-jsonpath-rw'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'six'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'ply'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'ObjectPath'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)),'..', 'jmespath.py'))

import jmespath
#from jsonpath_rw import jsonpath, parse
#from objectpath import *
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
		self.localize(content)
		return content
	def localize(self, body):
		#rspec_print('instance of'+{'foo': {'bar': 'baz'})
		js = json.loads(json.dumps(body, default=lambda o: o.__dict__,
            sort_keys=True, indent=1))
		#body[?type=='ExpressionStatement'].expression.arguments[-1].elements[-1].body.body[]
		#.arguments[-1].elements[-1].body.body[][?expression.left.property.name=='init'].expression.right[?type=='FunctionExpression'].body[?type=='BlockStatement'].body
		results = jmespath.search("body[?type=='ExpressionStatement'].expression.arguments[-1][?type=='ArrayExpression'].elements[-1][?type=='FunctionExpression'].body[?type=='BlockStatement']", js)
		r =  jmespath.search("[].body[?expression.left.property.name=='init']", results)
		#results = [match.value for match in parse("$[*].`this`('ExpressionStatement')").find(body)]
		rspec_print('FOND JSON '+str(results))
		rspec_print('FOND JSON '+str(r))
		#self.logger.info(js);
		#funcInit = findFunction('init', body)
		#tree=Tree(str(body))
		#r = tree.execute("$..type")
		#rspec_print('RESULTADO ES '+str(r))


