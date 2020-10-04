
	# 
from flask import Flask, render_template, request, make_response
import pandas as pd
import sqlite3
import json

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/loadEmployee",methods=['GET', 'POST'])
def loadEmployee():
	conn = sqlite3.connect('employee.db')
	##create a cursor
	c = conn.cursor()
	#c.execute("INSERT INTO employees VALUES ('John Whelan', '40'),('Mo Agharahimi','61.22'),('Sean Niktabe','25.52'),('Hossein Pezeshkian-Arjomand','11'),('Cathy Howell','55.16'),('Shahin Shahbazi','25.51'),('Anlea Cutlip','13.75'),('Chris Cutlip','30.41'),('Katie Haynes','12.48'),('Jerry Haynes','31.89'),('Steve McClendon','42.35'),('Mike Noori','50'),('Mark Mabry','23.47'),('Mickey Webb','24.74')")
	c.execute("SELECT * FROM employees")
	database = c.fetchall()
	conn.commit()
	conn.close()
	#return the data
	resp = make_response('{"database": '+json.dumps(database)+'}')
	resp.headers['Content-Type'] = "application/json"
	return resp

@app.route("/SaveData",methods=['GET', 'POST'])
def SaveData():
	data = request.form['mydata']
	data = json.loads(data)
	print(data)
	
	conn = sqlite3.connect('employee.db')
	##create a cursor
	c = conn.cursor()
	c.execute("DELETE FROM employees")
	conn.commit()

	for i in data:
		c.execute("INSERT INTO employees VALUES (?,?)",(i[0],i[1]))
	conn.commit()

	c.execute("SELECT * FROM employees")
	database = c.fetchall()
	conn.close()


	resp = make_response('{"response": hello}')
	resp.headers['Content-Type'] = "application/json"
	return resp
	return render_template('index.html', message='')



@app.route("/computation", methods=['GET', 'POST'])
def computation():
	data = request.form['mydata']
	data = data.replace('\r', '')
	data = data.replace(', Inc', 'Inc')
	df = pd.DataFrame([x.split(',') for x in data.split('\n')])
	new_header = df.iloc[0] #grab the first row for the header
	df = df[1:] #take the data less the header row
	df.columns = new_header #set the header row as the df header
	df = df[df.Hours.notnull()]
	df['Hours'] = df['Hours'].astype(float)
	df['Date'] = pd.to_datetime(df['Date']);
	df= df.sort_values(by=['Date']).groupby([df['Date'].dt.strftime('%B'), 'Project','Employee'], sort=False)['Hours'].sum()
	print(df)
	result = df.to_json()
	resp = make_response('{"response": '+result+'}')
	resp.headers['Content-Type'] = "application/json"
	
	return resp
	return render_template('index.html', message='')

if __name__ == '__main__':
    app.run(threaded=True, port=5000)
