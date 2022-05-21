# -*- encoding: utf-8 -*-

from apps.home import blueprint
from flask import render_template, request
from flask_login import login_required
from jinja2 import TemplateNotFound
import requests
from apps.home.function import *
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

@blueprint.route('/index')
@login_required
def index():
    return render_template('home/index.html', segment='index')

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

@blueprint.route('/home')
def home():
    return render_template('home.html')

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

@blueprint.route('/project', methods=["POST", "GET"])
def project():
    projects = projectall()
    keyvalue = keyvalueall()
    return render_template('project.html',pas = projects,pas2 = keyvalue )

@blueprint.route('/upload_bucket', methods=["POST", "GET"])
def upload_bucket():
    return render_template('project.html')

@blueprint.route('/create_key_value', methods=["POST", "GET"])
def key_value():
    projects = projectall()
    keyvalue = keyvalueall()
    key = request.form.get('key')
    value = request.form.get('value')
    print(key,value)
    return render_template('project.html',pas = projects,pas2 = keyvalue)

@blueprint.route('/logstore', methods=["POST", "GET"])
def logstore():
    return render_template('project.html')
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #



# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #

@blueprint.route('/<template>')
@login_required
def route_template(template):
    pas = "hi"

    try:

        if not template.endswith('.html'):
            pass

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None


