# from crypt import methods
from flask import Flask,request, render_template
import pickle
import numpy as np

model = pickle.load(open('model.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    # model = pickle.load(open(''))
    return render_template('home.html')


@app.route('/student')
def student():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict_placement():
#1st model -- student prediction
    cgpa = request.form.get('cgpa')
    iq = request.form.get('iq')
    profile_score = request.form.get('profile_score')
    if cgpa == '' or iq == '' or profile_score == '':
        return render_template('index.html')

    cgpa = float(cgpa)
    iq=float(iq)
    profile_score = float(profile_score)
    
    output = model.predict(np.array([cgpa,iq,profile_score]).reshape(1,3))
    if output[0] == 1:
        output='You will be placed!'
    else:
        output='not placed'
    return render_template('prediction.html', output=output)

if __name__ == '__main__':
    app.run(debug = True)