import os, re, sublime, os, json, sys
from ...rspec.rspec_print import rspec_print
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', '..', 'pyesprima', 'pyesprima'))
sys.path.append(os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', '..', 'toolz'))

from toolz import dicttoolz
import pyesprima
def _get_factory(f, kwargs):
    factory = kwargs.pop('factory', dict)
    if kwargs:
        raise TypeError("{0}() got an unexpected keyword argument "
                        "'{1}'".format(f.__name__, kwargs.popitem()[0]))
    return factory

def findFunction(funcName, body):
	def valid(item):
		k, v = item
		return v == 'init'
	b = deep(valid, body)
	rspec_print('FOOO'+str(b))

def deep(predicate, obj, factory=dict):
	rv = factory
	if isinstance(obj, pyesprima.jsdict):
		o = obj.__dict__.items()
	elif isinstance(obj, dict):
		o = obj.items()
	else:
		o = enumerate(obj)

	for k, v in o:
		if isinstance(v, pyesprima.jsdict) or isinstance(v, dict):
			deep(predicate, obj, rv)
		if predicate(v[k]):
			kk, vv = v
			rv = vv[kk]
	return rv
def search(self, function, serviceName, arr=[], d=False):
	if function==None:
		return 0
	if d==False:
		d = function
	if isinstance(d, pyesprima.jsdict):
		o = d.__dict__
	elif isinstance(d, dict):
		o = d
	for k,v in o.items():
		if isinstance(v, dict) or isinstance(v, pyesprima.jsdict):
			self.functionForService(function, serviceName, arr, d[k])
			for item in v:
				if isinstance(item, dict) or isinstance(v, pyesprima.jsdict):
					self.functionForService(function, serviceName, arr, item)
				else:
					if item==serviceName:
						arr.append(function)
		else:
			if v==serviceName:
				arr.append(function)
	return len(arr)>0

