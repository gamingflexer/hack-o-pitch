# -*- encoding: utf-8 -*-

from apps.home import blueprint
from flask import render_template, request
from flask_login import login_required
from jinja2 import TemplateNotFound
import requests

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

@blueprint.route('/project')
def project():
    try:
        response = requests.get("http://139.59.87.149:3000/api/projects/")
        projects = response.json()
    except:
        projects = [{'id': "",'name':"",'description':""}]
    return render_template('project.html',pas = projects)

@blueprint.route('/upload_bucket')
def upload_bucket():
    return render_template('project.html')

@blueprint.route('/create_key_value')
def key_value():
    return render_template('project.html')

@blueprint.route('/logstore')
def logstore():
    return render_template('project.html')
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


