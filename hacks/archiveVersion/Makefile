ignore-version-prod: venv/bin/activate check-env
	./venv/bin/python3 1-ignore-version-prod.py	

preprocess: venv/bin/activate check-env
	./venv/bin/python3 2-preprocess.py	

isolate-version: check-env
	cd ../..; ./hacks/isolateVersion/allSteps.sh

venv/bin/activate: requirements.txt
	rm -rf __pycache__
	rm -rf venv
	python3 -m venv venv
	./venv/bin/pip install -r requirements.txt

clean:
	rm -rf __pycache__
	rm -rf venv

check-env:
ifndef ARCHIVED_VERSION
	$(error You must run `export ARCHIVED_VERSION=8.x` with the version you're archiving.))
endif
