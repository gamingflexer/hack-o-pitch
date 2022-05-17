# -*- encoding: utf-8 -*-

from flask_migrate import Migrate
from sys import exit
from decouple import config

import os
from flask import Flask, render_template, request, flash, redirect
from sre_constants import SUCCESS
import pymysql
pymysql.install_as_MySQLdb()
from flask_mysqldb import MySQL, MySQLdb
import mysql
import json
import subprocess
import urllib.request
import MySQLdb.cursors
import sys

from flask_mysqldb import MySQL
import mysql.connector
from flask_cors import CORS, cross_origin

from apps.config import config_dict
from apps import create_app, db

# WARNING: Don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

# The configuration
get_config_mode = 'Debug' if DEBUG else 'Production'

try:

    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production] ')

app = create_app(app_config)


app.config['MYSQL_HOST'] = 'dpomserver.mysql.database.azure.com'
app.config['MYSQL_USER'] = 'dpomserver@dpomserver'
app.config['MYSQL_PASSWORD'] = '#Freelance#123'
app.config['MYSQL_DB'] = 'iitm'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


Migrate(app, db)

if DEBUG:
    app.logger.info('DEBUG       = ' + str(DEBUG))
    app.logger.info('Environment = ' + get_config_mode)
    app.logger.info('MYSQL       = ' + "AZURE")
    app.logger.info('DBMS        = ' + app_config.SQLALCHEMY_DATABASE_URI)

if __name__ == "__main__":
    app.run()
